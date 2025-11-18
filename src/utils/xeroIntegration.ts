// Xero API Integration for BiohackMe CRM
// Handles OAuth 2.0 flow and API calls to Xero

interface XeroTokens {
  access_token: string
  refresh_token: string
  expires_at: number
  tenant_id: string
}

interface XeroContact {
  ContactID: string
  Name: string
  EmailAddress?: string
  Phones?: Array<{
    PhoneType: string
    PhoneNumber: string
  }>
}

interface XeroInvoice {
  InvoiceID: string
  InvoiceNumber: string
  Date: string
  DueDate: string
  AmountPaid: number
  AmountDue: number
  Total: number
  Status: string
  LineItems: Array<{
    Description: string
    Quantity: number
    UnitAmount: number
    LineAmount: number
  }>
}

export class XeroIntegration {
  private clientId: string
  private clientSecret: string
  private redirectUri: string
  private scopes: string
  private baseUrl = 'https://api.xero.com'
  private demoMode: boolean

  constructor() {
    this.clientId = import.meta.env.VITE_XERO_CLIENT_ID || ''
    this.clientSecret = import.meta.env.VITE_XERO_CLIENT_SECRET || ''
    this.redirectUri = import.meta.env.VITE_XERO_REDIRECT_URI || ''
    this.scopes = import.meta.env.VITE_XERO_SCOPES || 'accounting.transactions accounting.contacts accounting.settings'
    this.demoMode = import.meta.env.VITE_XERO_DEMO_MODE === 'true' || !this.clientId || this.clientId === 'demo-client-id'
  }

  // Step 1: Get authorization URL for OAuth flow
  getAuthorizationUrl(): string {
    if (this.demoMode) {
      // In demo mode, simulate successful connection
      setTimeout(() => {
        localStorage.setItem('xero_demo_connected', 'true')
        console.log('✅ Xero Demo: Simulated successful connection')
        // Trigger page refresh to update UI
        window.location.reload()
      }, 1000)
      return '#demo-connection'
    }

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: this.scopes,
      state: Math.random().toString(36).substring(7) // CSRF protection
    })

    return `https://login.xero.com/identity/connect/authorize?${params.toString()}`
  }

  // Step 2: Exchange authorization code for access token
  async exchangeCodeForToken(code: string): Promise<XeroTokens> {
    try {
      const response = await fetch('https://identity.xero.com/connect/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: this.redirectUri
        })
      })

      if (!response.ok) {
        throw new Error(`Token exchange failed: ${response.statusText}`)
      }

      const data = await response.json()
      
      const tokens: XeroTokens = {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_at: Date.now() + (data.expires_in * 1000),
        tenant_id: '' // Will be set after getting connections
      }

      // Get tenant ID
      const connections = await this.getConnections(tokens.access_token)
      if (connections.length > 0) {
        tokens.tenant_id = connections[0].tenantId
      }

      // Store tokens securely
      localStorage.setItem('xero_tokens', JSON.stringify(tokens))
      
      return tokens
    } catch (error) {
      console.error('Error exchanging code for token:', error)
      throw error
    }
  }

  // Get Xero connections (tenant info)
  async getConnections(accessToken: string) {
    const response = await fetch('https://api.xero.com/connections', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to get connections: ${response.statusText}`)
    }

    return await response.json()
  }

  // Get stored tokens
  getStoredTokens(): XeroTokens | null {
    const stored = localStorage.getItem('xero_tokens')
    if (!stored) return null

    try {
      const tokens: XeroTokens = JSON.parse(stored)
      
      // Check if token is expired
      if (Date.now() > tokens.expires_at) {
        console.log('Xero token expired, need to refresh')
        // TODO: Implement token refresh
        return null
      }

      return tokens
    } catch (error) {
      console.error('Error parsing stored tokens:', error)
      return null
    }
  }

  // Check if connected to Xero
  isConnected(): boolean {
    if (this.demoMode) {
      // In demo mode, simulate connection after first "connect" attempt
      return localStorage.getItem('xero_demo_connected') === 'true'
    }
    const tokens = this.getStoredTokens()
    return tokens !== null && tokens.access_token !== ''
  }

  // Get contacts from Xero
  async getContacts(): Promise<XeroContact[]> {
    const tokens = this.getStoredTokens()
    if (!tokens) {
      throw new Error('Not connected to Xero')
    }

    try {
      const response = await fetch(`${this.baseUrl}/api.xro/2.0/Contacts`, {
        headers: {
          'Authorization': `Bearer ${tokens.access_token}`,
          'xero-tenant-id': tokens.tenant_id,
          'Accept': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to get contacts: ${response.statusText}`)
      }

      const data = await response.json()
      return data.Contacts || []
    } catch (error) {
      console.error('Error fetching contacts:', error)
      throw error
    }
  }

  // Get invoices for a specific contact
  async getInvoicesForContact(contactId: string): Promise<XeroInvoice[]> {
    const tokens = this.getStoredTokens()
    if (!tokens) {
      throw new Error('Not connected to Xero')
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/api.xro/2.0/Invoices?where=Contact.ContactID=Guid("${contactId}")`,
        {
          headers: {
            'Authorization': `Bearer ${tokens.access_token}`,
            'xero-tenant-id': tokens.tenant_id,
            'Accept': 'application/json'
          }
        }
      )

      if (!response.ok) {
        throw new Error(`Failed to get invoices: ${response.statusText}`)
      }

      const data = await response.json()
      return data.Invoices || []
    } catch (error) {
      console.error('Error fetching invoices:', error)
      throw error
    }
  }

  // Create a contact in Xero
  async createContact(name: string, email?: string, phone?: string): Promise<string> {
    const tokens = this.getStoredTokens()
    if (!tokens) {
      throw new Error('Not connected to Xero')
    }

    const contact = {
      Name: name,
      ...(email && { EmailAddress: email }),
      ...(phone && {
        Phones: [
          {
            PhoneType: 'MOBILE',
            PhoneNumber: phone
          }
        ]
      })
    }

    try {
      const response = await fetch(`${this.baseUrl}/api.xro/2.0/Contacts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokens.access_token}`,
          'xero-tenant-id': tokens.tenant_id,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ Contacts: [contact] })
      })

      if (!response.ok) {
        throw new Error(`Failed to create contact: ${response.statusText}`)
      }

      const data = await response.json()
      return data.Contacts[0].ContactID
    } catch (error) {
      console.error('Error creating contact:', error)
      throw error
    }
  }

  // Create an invoice in Xero
  async createInvoice(
    contactId: string,
    description: string,
    amount: number,
    dueDate?: Date
  ): Promise<string> {
    const tokens = this.getStoredTokens()
    if (!tokens) {
      throw new Error('Not connected to Xero')
    }

    const invoice = {
      Type: 'ACCREC', // Accounts Receivable
      Contact: {
        ContactID: contactId
      },
      Date: new Date().toISOString().split('T')[0],
      DueDate: dueDate?.toISOString().split('T')[0] || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      Status: 'AUTHORISED',
      LineItems: [
        {
          Description: description,
          Quantity: 1,
          UnitAmount: amount,
          AccountCode: '200' // Default sales account
        }
      ]
    }

    try {
      const response = await fetch(`${this.baseUrl}/api.xro/2.0/Invoices`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokens.access_token}`,
          'xero-tenant-id': tokens.tenant_id,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ Invoices: [invoice] })
      })

      if (!response.ok) {
        throw new Error(`Failed to create invoice: ${response.statusText}`)
      }

      const data = await response.json()
      return data.Invoices[0].InvoiceID
    } catch (error) {
      console.error('Error creating invoice:', error)
      throw error
    }
  }

  // Disconnect from Xero
  disconnect(): void {
    localStorage.removeItem('xero_tokens')
    if (this.demoMode) {
      localStorage.removeItem('xero_demo_connected')
      console.log('✅ Xero Demo: Disconnected')
    }
  }
}

// Export singleton instance
export const xeroIntegration = new XeroIntegration()

// Utility function to sync client with Xero
export async function syncClientWithXero(client: any) {
  try {
    if (!xeroIntegration.isConnected()) {
      console.log('Not connected to Xero')
      return null
    }

    // Demo mode - return mock billing data
    if (xeroIntegration['demoMode']) {
      console.log('🎭 Xero Demo: Generating mock billing data for', client.name)
      
      const mockBilling = {
        totalCharged: 4500,
        totalPaid: 3000,
        outstandingAmount: 1500,
        xeroContactId: `demo-contact-${client.id}`,
        invoices: [
          {
            id: `inv-${Date.now()}-1`,
            invoiceNumber: 'INV-001',
            date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            amount: 1500,
            status: 'paid' as const,
            description: '3-Month Biohacking Program',
            xeroInvoiceId: `xero-inv-${Date.now()}-1`
          },
          {
            id: `inv-${Date.now()}-2`,
            invoiceNumber: 'INV-002',
            date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            amount: 1500,
            status: 'paid' as const,
            description: 'Follow-up Coaching Sessions',
            xeroInvoiceId: `xero-inv-${Date.now()}-2`
          },
          {
            id: `inv-${Date.now()}-3`,
            invoiceNumber: 'INV-003',
            date: new Date().toLocaleDateString(),
            amount: 1500,
            status: 'pending' as const,
            description: 'Advanced Testing Package',
            xeroInvoiceId: `xero-inv-${Date.now()}-3`
          }
        ]
      }
      
      return mockBilling
    }

    // Check if contact already exists
    const contacts = await xeroIntegration.getContacts()
    let xeroContact = contacts.find(c => 
      c.EmailAddress?.toLowerCase() === client.email.toLowerCase() ||
      c.Name.toLowerCase() === client.name.toLowerCase()
    )

    // Create contact if doesn't exist
    if (!xeroContact) {
      const contactId = await xeroIntegration.createContact(
        client.name,
        client.email,
        client.phone
      )
      xeroContact = { ContactID: contactId, Name: client.name, EmailAddress: client.email }
    }

    // Get invoices for this contact
    const invoices = await xeroIntegration.getInvoicesForContact(xeroContact.ContactID)

    // Convert to our billing format
    const billing = {
      totalCharged: invoices.reduce((sum, inv) => sum + inv.Total, 0),
      totalPaid: invoices.reduce((sum, inv) => sum + inv.AmountPaid, 0),
      outstandingAmount: invoices.reduce((sum, inv) => sum + inv.AmountDue, 0),
      xeroContactId: xeroContact.ContactID,
      invoices: invoices.map(inv => ({
        id: inv.InvoiceID,
        invoiceNumber: inv.InvoiceNumber,
        date: inv.Date,
        amount: inv.Total,
        status: inv.Status.toLowerCase() === 'paid' ? 'paid' as const : 
               inv.AmountDue > 0 ? 'pending' as const : 'paid' as const,
        description: inv.LineItems[0]?.Description || 'Coaching Services',
        xeroInvoiceId: inv.InvoiceID
      }))
    }

    return billing
  } catch (error) {
    console.error('Error syncing with Xero:', error)
    
    // In demo mode, still return mock data even if there's an error
    if (xeroIntegration['demoMode']) {
      console.log('🎭 Xero Demo: Returning fallback mock data due to error')
      return {
        totalCharged: 3000,
        totalPaid: 2000,
        outstandingAmount: 1000,
        xeroContactId: `demo-contact-${client.id}`,
        invoices: [
          {
            id: `fallback-inv-${Date.now()}`,
            invoiceNumber: 'INV-DEMO',
            date: new Date().toLocaleDateString(),
            amount: 1000,
            status: 'pending' as const,
            description: 'Demo Invoice',
            xeroInvoiceId: `demo-xero-inv-${Date.now()}`
          }
        ]
      }
    }
    
    return null
  }
}
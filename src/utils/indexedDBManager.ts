// IndexedDB File Management System for Large Files
// Handles large reports (7MB+) that exceed localStorage limits

interface ClientFile {
  id: string
  clientId: string
  fileName: string
  fileType: 'pdf' | 'image' | 'document'
  fileSize: number
  uploadDate: string
  description?: string
  category: 'test-results' | 'session-notes' | 'contracts' | 'other' | 'general'
  testId?: string
  fileData: Blob // Store as Blob instead of base64 for efficiency
}

class IndexedDBFileManager {
  private dbName = 'BiohackMeFiles'
  private version = 1
  private storeName = 'client_files'

  // Initialize IndexedDB
  private async openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id' })
          store.createIndex('clientId', 'clientId', { unique: false })
          store.createIndex('category', 'category', { unique: false })
        }
      }
    })
  }

  // Upload a file to IndexedDB
  async uploadFile(
    clientId: string,
    file: File,
    description?: string,
    category: ClientFile['category'] = 'test-results',
    testId?: string
  ): Promise<ClientFile> {
    console.log(`📎 IndexedDB: Uploading ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)}MB)`)
    
    const clientFile: ClientFile = {
      id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      clientId,
      fileName: file.name,
      fileType: this.getFileType(file.type),
      fileSize: file.size,
      uploadDate: new Date().toLocaleDateString(),
      description,
      category,
      testId,
      fileData: file // Store the actual file blob
    }

    const db = await this.openDB()
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      const request = store.add(clientFile)
      
      request.onsuccess = () => {
        console.log(`✅ IndexedDB: File stored successfully: ${file.name}`)
        resolve(clientFile)
      }
      
      request.onerror = () => {
        console.error('❌ IndexedDB: Failed to store file:', request.error)
        reject(request.error)
      }
    })
  }

  // Get all files for a client
  async getClientFiles(clientId: string): Promise<ClientFile[]> {
    const db = await this.openDB()
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readonly')
      const store = transaction.objectStore(this.storeName)
      const index = store.index('clientId')
      const request = index.getAll(clientId)
      
      request.onsuccess = () => resolve(request.result || [])
      request.onerror = () => reject(request.error)
    })
  }

  // Get files by category
  async getFilesByCategory(clientId: string, category: string): Promise<ClientFile[]> {
    const files = await this.getClientFiles(clientId)
    return files.filter(file => file.category === category)
  }

  // Delete a file
  async deleteFile(fileId: string): Promise<boolean> {
    const db = await this.openDB()
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      const request = store.delete(fileId)
      
      request.onsuccess = () => {
        console.log(`✅ IndexedDB: File deleted: ${fileId}`)
        resolve(true)
      }
      
      request.onerror = () => {
        console.error('❌ IndexedDB: Failed to delete file:', request.error)
        resolve(false)
      }
    })
  }

  // Download/view file
  async downloadFile(fileId: string): Promise<void> {
    const db = await this.openDB()
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readonly')
      const store = transaction.objectStore(this.storeName)
      const request = store.get(fileId)
      
      request.onsuccess = () => {
        const file = request.result
        if (file && file.fileData) {
          const url = URL.createObjectURL(file.fileData)
          const link = document.createElement('a')
          link.href = url
          link.download = file.fileName
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)
          resolve()
        } else {
          reject(new Error('File not found'))
        }
      }
      
      request.onerror = () => reject(request.error)
    })
  }

  // View file in new tab
  async viewFile(fileId: string): Promise<void> {
    const db = await this.openDB()
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readonly')
      const store = transaction.objectStore(this.storeName)
      const request = store.get(fileId)
      
      request.onsuccess = () => {
        const file = request.result
        if (file && file.fileData) {
          const url = URL.createObjectURL(file.fileData)
          window.open(url, '_blank')
          resolve()
        } else {
          reject(new Error('File not found'))
        }
      }
      
      request.onerror = () => reject(request.error)
    })
  }

  // Get storage usage info
  async getStorageInfo(): Promise<{
    totalFiles: number
    totalSizeMB: string
    categories: { [key: string]: number }
  }> {
    const db = await this.openDB()
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readonly')
      const store = transaction.objectStore(this.storeName)
      const request = store.getAll()
      
      request.onsuccess = () => {
        const files = request.result || []
        const totalSize = files.reduce((sum, file) => sum + file.fileSize, 0)
        const categories = files.reduce((acc, file) => {
          acc[file.category] = (acc[file.category] || 0) + 1
          return acc
        }, {} as { [key: string]: number })
        
        resolve({
          totalFiles: files.length,
          totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
          categories
        })
      }
      
      request.onerror = () => reject(request.error)
    })
  }

  // Helper method to determine file type
  private getFileType(mimeType: string): ClientFile['fileType'] {
    if (mimeType.includes('pdf')) return 'pdf'
    if (mimeType.includes('image')) return 'image'
    return 'document'
  }
}

// Export singleton instance
export const indexedDBFileManager = new IndexedDBFileManager()

// Helper function to format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
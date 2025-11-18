// Client File Management System
// Handles uploading, storing, and organizing test results and client documents
// Uses IndexedDB for large files (>5MB) and localStorage for smaller files

import { indexedDBFileManager } from './indexedDBManager'

interface ClientFile {
  id: string
  clientId: string
  fileName: string
  fileType: 'pdf' | 'image' | 'document'
  fileSize: number
  uploadDate: string
  description?: string
  category: 'test-results' | 'session-notes' | 'contracts' | 'other' | 'general'
  testId?: string // Link to specific test if applicable
  fileData?: string // Base64 encoded file data for local storage
}

export class ClientFileManager {
  private storageKey = 'biohackme_client_files'

  // Get all files for a client (combines localStorage and IndexedDB)
  async getClientFiles(clientId: string): Promise<ClientFile[]> {
    try {
      // Get files from localStorage (small files)
      const localStorageFiles = this.getAllFiles().filter(file => file.clientId === clientId)
      
      // Get files from IndexedDB (large files)
      const indexedDBFiles = await indexedDBFileManager.getClientFiles(clientId)
      
      // Combine and return all files
      const allFiles = [...localStorageFiles, ...indexedDBFiles]
      console.log(`📁 Found ${allFiles.length} files for client ${clientId} (${localStorageFiles.length} small + ${indexedDBFiles.length} large)`)
      
      return allFiles
    } catch (error) {
      console.error('Error getting client files:', error)
      // Fallback to localStorage only
      return this.getAllFiles().filter(file => file.clientId === clientId)
    }
  }

  // Get all files for a client (synchronous version for backward compatibility)
  getClientFilesSync(clientId: string): ClientFile[] {
    const allFiles = this.getAllFiles()
    return allFiles.filter(file => file.clientId === clientId)
  }

  // Get files for a specific test
  async getTestFiles(clientId: string, testId: string): Promise<ClientFile[]> {
    const clientFiles = await this.getClientFiles(clientId)
    return clientFiles.filter(file => file.testId === testId)
  }

  // Upload a file - uses IndexedDB for large files (>5MB), localStorage for smaller ones
  async uploadFile(
    clientId: string,
    file: File,
    description?: string,
    category: ClientFile['category'] = 'test-results',
    testId?: string
  ): Promise<ClientFile> {
    const fileSizeMB = file.size / (1024 * 1024)
    const largeSizeLimit = 1 // 1MB threshold for IndexedDB (was 5MB)
    const maxSizeLimit = 10 // 10MB maximum file size
    
    console.log(`📎 Uploading ${file.name} (${fileSizeMB.toFixed(2)}MB)`)
    
    // Check maximum file size
    if (fileSizeMB > maxSizeLimit) {
      throw new Error(`File too large! Maximum size is ${maxSizeLimit}MB. Your file is ${fileSizeMB.toFixed(2)}MB.`)
    }
    
    // Use IndexedDB for files > 1MB to avoid localStorage quota issues
    if (file.size > largeSizeLimit * 1024 * 1024) {
      console.log('📚 Using IndexedDB for large file')
      return await indexedDBFileManager.uploadFile(clientId, file, description, category, testId)
    }
    
    // Use localStorage for smaller files (legacy support)
    console.log('💾 Using localStorage for small file')

    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = () => {
        try {
          const fileData = reader.result as string
          
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
            fileData
          }

          // Try to save the file - this might fail if localStorage is full
          try {
            this.saveFile(clientFile)
            console.log(`✅ File uploaded successfully: ${file.name} (${formatFileSize(file.size)})`)
            resolve(clientFile)
          } catch (storageError) {
            console.error('❌ Storage error:', storageError)
            reject(new Error('Storage full! Please delete some files first or use smaller files.'))
          }
        } catch (error) {
          console.error('❌ File processing error:', error)
          reject(new Error('Failed to process file'))
        }
      }

      reader.onerror = () => {
        console.error('❌ File read error for:', file.name)
        reject(new Error(`Failed to read file: ${file.name}`))
      }

      reader.readAsDataURL(file)
    })
  }

  // Save file to localStorage
  private saveFile(file: ClientFile): void {
    const allFiles = this.getAllFiles()
    allFiles.push(file)
    
    try {
      const dataToStore = JSON.stringify(allFiles)
      const sizeInMB = (new Blob([dataToStore]).size / (1024 * 1024)).toFixed(2)
      console.log(`💾 Attempting to store ${allFiles.length} files (${sizeInMB}MB total)`)
      
      localStorage.setItem(this.storageKey, dataToStore)
    } catch (error) {
      // Handle quota exceeded error
      if (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
        console.error('❌ localStorage quota exceeded!')
        throw new Error('Storage quota exceeded! Please delete some files first.')
      } else {
        console.error('❌ Storage error:', error)
        throw error
      }
    }
  }

  // Get all files from localStorage
  private getAllFiles(): ClientFile[] {
    const stored = localStorage.getItem(this.storageKey)
    if (!stored) return []
    
    try {
      return JSON.parse(stored)
    } catch (error) {
      console.error('Error parsing stored files:', error)
      return []
    }
  }

  // Delete a file from both storage systems
  async deleteFile(fileId: string): Promise<boolean> {
    try {
      // Try to delete from IndexedDB first
      const indexedDBDeleted = await indexedDBFileManager.deleteFile(fileId)
      if (indexedDBDeleted) {
        console.log('✅ File deleted from IndexedDB')
        return true
      }
      
      // If not found in IndexedDB, try localStorage
      const allFiles = this.getAllFiles()
      const updatedFiles = allFiles.filter(file => file.id !== fileId)
      
      if (updatedFiles.length < allFiles.length) {
        localStorage.setItem(this.storageKey, JSON.stringify(updatedFiles))
        console.log('✅ File deleted from localStorage')
        return true
      }
      
      console.log('⚠️ File not found in either storage system')
      return false
    } catch (error) {
      console.error('❌ Error deleting file:', error)
      return false
    }
  }

  // Download file from either storage system
  async downloadFile(fileId: string): Promise<void> {
    try {
      // Try IndexedDB first
      await indexedDBFileManager.downloadFile(fileId)
      return
    } catch (indexedDBError) {
      // Fallback to localStorage
      const allFiles = this.getAllFiles()
      const file = allFiles.find(f => f.id === fileId)
      
      if (file && file.fileData) {
        const link = document.createElement('a')
        link.href = file.fileData
        link.download = file.fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        throw new Error('File not found in either storage system')
      }
    }
  }

  // View file from either storage system
  async viewFile(fileId: string): Promise<void> {
    try {
      // Try IndexedDB first
      await indexedDBFileManager.viewFile(fileId)
      return
    } catch (indexedDBError) {
      // Fallback to localStorage
      const allFiles = this.getAllFiles()
      const file = allFiles.find(f => f.id === fileId)
      
      if (file && file.fileData) {
        window.open(file.fileData, '_blank')
      } else {
        throw new Error('File not found in either storage system')
      }
    }
  }

  // Get file type from MIME type
  private getFileType(mimeType: string): ClientFile['fileType'] {
    if (mimeType.includes('pdf')) return 'pdf'
    if (mimeType.includes('image')) return 'image'
    return 'document'
  }

  // Create organized folder structure for client
  async getClientFolderStructure(clientId: string) {
    const files = await this.getClientFiles(clientId)
    
    return {
      testResults: files.filter(f => f.category === 'test-results'),
      sessionNotes: files.filter(f => f.category === 'session-notes'),
      contracts: files.filter(f => f.category === 'contracts'),
      other: files.filter(f => f.category === 'other')
    }
  }

  // Clear localStorage files to free up space
  clearLocalStorageFiles(): void {
    try {
      localStorage.removeItem(this.storageKey)
      console.log('✅ Cleared all localStorage files')
    } catch (error) {
      console.error('❌ Error clearing localStorage files:', error)
    }
  }

  // Get combined storage usage from both systems
  async getStorageInfo() {
    try {
      // Get localStorage data
      const localFiles = this.getAllFiles()
      const localTotalSize = localFiles.reduce((sum, file) => sum + file.fileSize, 0)
      
      // Get IndexedDB data
      const indexedDBInfo = await indexedDBFileManager.getStorageInfo()
      
      const combinedTotalSize = localTotalSize + (parseFloat(indexedDBInfo.totalSizeMB) * 1024 * 1024)
      const combinedTotalFiles = localFiles.length + indexedDBInfo.totalFiles
      
      // Estimate localStorage usage (JSON overhead ~30%)
      const jsonData = JSON.stringify(localFiles)
      const localStorageSize = new Blob([jsonData]).size
      const maxLocalStorageSize = 5 * 1024 * 1024 // ~5MB localStorage limit
      
      return {
        totalFiles: combinedTotalFiles,
        localStorageFiles: localFiles.length,
        indexedDBFiles: indexedDBInfo.totalFiles,
        totalSize: combinedTotalSize,
        totalSizeMB: (combinedTotalSize / (1024 * 1024)).toFixed(2),
        localStorageMB: (localStorageSize / (1024 * 1024)).toFixed(2),
        indexedDBMB: indexedDBInfo.totalSizeMB,
        localStoragePercent: Math.round((localStorageSize / maxLocalStorageSize) * 100),
        isLocalStorageNearLimit: localStorageSize > (maxLocalStorageSize * 0.8)
      }
    } catch (error) {
      console.error('Error getting storage info:', error)
      // Fallback to localStorage only
      const allFiles = this.getAllFiles()
      const totalSize = allFiles.reduce((sum, file) => sum + file.fileSize, 0)
      
      return {
        totalFiles: allFiles.length,
        localStorageFiles: allFiles.length,
        indexedDBFiles: 0,
        totalSize: totalSize,
        totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
        localStorageMB: (totalSize / (1024 * 1024)).toFixed(2),
        indexedDBMB: '0.00',
        localStoragePercent: 0,
        isLocalStorageNearLimit: false
      }
    }
  }
}

// Export singleton instance
export const fileManager = new ClientFileManager()

// Helper function to format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
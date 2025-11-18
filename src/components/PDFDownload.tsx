import React from 'react'
import { motion } from 'framer-motion'
import { Download, FileText } from 'lucide-react'

interface PDFDownloadProps {
  title: string
  description: string
  filename: string
  className?: string
}

export default function PDFDownload({
  title,
  description,
  filename,
  className = ''
}: PDFDownloadProps) {

  const handleDownload = () => {
    // Create a link to the PDF file in the public folder
    const link = document.createElement('a')
    link.href = `/pdfs/${filename}`
    link.download = filename
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Track download event (optional - for analytics)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'download', {
        event_category: 'PDF',
        event_label: filename
      })
    }
  }

  return (
    <div className={`bg-white rounded-xl p-6 shadow-lg border border-sky/20 ${className}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-ocean to-sky rounded-lg flex items-center justify-center">
          <FileText className="w-6 h-6 text-white" />
        </div>

        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-ocean mb-2">{title}</h3>
          <p className="text-charcoal/70 text-sm mb-4">{description}</p>

          <motion.button
            onClick={handleDownload}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-ocean to-sky text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </motion.button>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-sky/10">
        <p className="text-xs text-charcoal/50 flex items-center gap-2">
          <span>📄 PDF Format</span>
          <span>•</span>
          <span>Ready to print</span>
          <span>•</span>
          <span>Save for later</span>
        </p>
      </div>
    </div>
  )
}
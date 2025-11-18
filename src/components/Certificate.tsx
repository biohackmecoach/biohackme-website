import React from 'react'
import { motion } from 'framer-motion'

interface CertificateProps {
  studentName: string
  courseName: string
  courseSubtitle: string
  completionDate: string
  duration: string
  instructorName: string
  instructorCredentials: string[]
}

export default function Certificate({
  studentName,
  courseName,
  courseSubtitle,
  completionDate,
  duration,
  instructorName,
  instructorCredentials
}: CertificateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white border-8 border-ocean/20 rounded-lg shadow-2xl max-w-4xl mx-auto p-12 font-montserrat"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(14, 165, 233, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)
        `
      }}
    >
      {/* Header Decoration */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-ocean"></div>
          <div className="w-8 h-8 rounded-full border-2 border-ocean flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-ocean"></div>
          </div>
          <div className="w-16 h-0.5 bg-gradient-to-r from-ocean to-transparent"></div>
        </div>
        
        <h1 className="text-4xl font-light text-ocean mb-2">Certificate of Completion</h1>
        <div className="w-24 h-0.5 bg-ocean mx-auto"></div>
      </div>

      {/* Main Content */}
      <div className="text-center space-y-6">
        <p className="text-lg text-charcoal/80">
          This certifies that
        </p>
        
        <div className="py-4">
          <h2 className="text-5xl font-light text-ocean mb-2" style={{ fontFamily: 'serif' }}>
            {studentName}
          </h2>
          <div className="w-48 h-0.5 bg-ocean/30 mx-auto"></div>
        </div>
        
        <p className="text-lg text-charcoal/80">
          has successfully completed
        </p>
        
        <div className="py-6">
          <h3 className="text-3xl font-light text-charcoal mb-2">
            {courseName}
          </h3>
          <p className="text-xl text-charcoal/70 italic">
            {courseSubtitle}
          </p>
        </div>

        {/* Course Details */}
        <div className="bg-ice/20 rounded-xl p-6 my-8">
          <div className="grid md:grid-cols-2 gap-6 text-center">
            <div>
              <p className="text-sm text-charcoal/60 mb-1">Course Duration</p>
              <p className="text-lg font-medium text-ocean">{duration}</p>
            </div>
            <div>
              <p className="text-sm text-charcoal/60 mb-1">Completion Date</p>
              <p className="text-lg font-medium text-ocean">{completionDate}</p>
            </div>
          </div>
        </div>

        {/* Instructor Signature Section */}
        <div className="flex items-end justify-center space-x-16 mt-12">
          <div className="text-center">
            <div className="w-48 h-0.5 bg-charcoal/30 mb-2"></div>
            <p className="text-lg font-medium text-ocean">{instructorName}</p>
            <div className="text-sm text-charcoal/60 space-y-1">
              {instructorCredentials.map((credential, index) => (
                <p key={index}>{credential}</p>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-48 h-0.5 bg-charcoal/30 mb-2"></div>
            <p className="text-lg font-medium text-ocean">BiohackMe Academy</p>
            <p className="text-sm text-charcoal/60">Certificate Authority</p>
          </div>
        </div>

        {/* Certificate ID */}
        <div className="mt-12 pt-6 border-t border-charcoal/10">
          <p className="text-xs text-charcoal/50">
            Certificate ID: BMC-{studentName.replace(/\s+/g, '').toUpperCase()}-{Date.now()}
          </p>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="mt-8 pt-6 border-t border-charcoal/10 text-center">
        <p className="text-xs text-charcoal/50 leading-relaxed max-w-3xl mx-auto">
          This certificate of completion is awarded for educational purposes only and does not constitute 
          professional certification, medical advice, or formal qualification. The content provided is for 
          informational purposes and should not replace professional medical advice. Consult healthcare 
          professionals before implementing health strategies discussed in this course.
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-ocean/20"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-ocean/20"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-ocean/20"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-ocean/20"></div>
    </motion.div>
  )
}
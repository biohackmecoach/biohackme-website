import { motion } from 'framer-motion'

interface Pillar {
  icon: React.ReactNode
  title: string
  description: string
  href?: string
}

interface ServicePillarsProps {
  title: string
  subtitle?: string
  pillars: Pillar[]
}

export default function ServicePillars({ title, subtitle, pillars }: ServicePillarsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const pillarVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-ice to-cloud">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-montserrat font-light text-ocean mb-4"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-xl text-charcoal/80 max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              variants={pillarVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`group ${pillar.href ? 'cursor-pointer' : ''}`}
              onClick={() => pillar.href && window.open(pillar.href, '_self')}
            >
              <div className="bg-cloud rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-ice h-full">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-ice to-sky/20 rounded-full flex items-center justify-center group-hover:from-sky/20 group-hover:to-sky/30 transition-all duration-300">
                    <div className="text-ocean group-hover:text-sky transition-colors">
                      {pillar.icon}
                    </div>
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-montserrat font-light text-ocean mb-4 text-center group-hover:text-sky transition-colors">
                  {pillar.title}
                </h3>
                
                {/* Description */}
                <p className="text-charcoal/80 text-center leading-relaxed">
                  {pillar.description}
                </p>
                
                {/* Hover indicator */}
                {pillar.href && (
                  <div className="mt-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-sky text-sm font-medium flex items-center">
                      Learn more
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
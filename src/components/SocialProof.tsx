import { motion } from 'framer-motion'

interface Testimonial {
  quote: string
  author: string
  title: string
  image?: string
  logo?: string
}

interface SocialProofProps {
  title?: string
  testimonials: Testimonial[]
  showLogos?: boolean
}

export default function SocialProof({ title, testimonials, showLogos = true }: SocialProofProps) {
  return (
    <section className="py-20 bg-cloud">
      <div className="container mx-auto px-4">
        {title && (
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-montserrat font-light text-ocean"
            >
              {title}
            </motion.h2>
          </div>
        )}

        <div className="max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`mb-16 ${index % 2 === 0 ? '' : 'text-right'}`}
            >
              <div className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
                {/* Quote Section */}
                <div className="flex-1">
                  <div className="relative">
                    {/* Quote Icon */}
                    <div className={`absolute -top-4 ${index % 2 === 0 ? '-left-4' : '-right-4'} text-6xl text-ice font-script`}>
                      "
                    </div>
                    
                    <blockquote className="text-xl md:text-2xl text-charcoal font-light leading-relaxed mb-6 italic">
                      {testimonial.quote}
                    </blockquote>
                    
                    <div className={`flex items-center ${index % 2 === 0 ? '' : 'justify-end'} gap-4`}>
                      {testimonial.image && (
                        <img 
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      )}
                      
                      <div className={`${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                        <div className="font-montserrat font-light text-ocean text-lg">
                          {testimonial.author}
                        </div>
                        <div className="text-charcoal/70">
                          {testimonial.title}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Logo Section */}
                {showLogos && testimonial.logo && (
                  <div className="flex-shrink-0">
                    <div className="bg-ice rounded-2xl p-8 shadow-sm">
                      <img 
                        src={testimonial.logo}
                        alt={`${testimonial.author} logo`}
                        className="h-20 w-auto opacity-80 grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Separator line */}
              {index < testimonials.length - 1 && (
                <div className="mt-16 flex justify-center">
                  <div className="w-24 h-px bg-gradient-to-r from-transparent via-sky/40 to-transparent" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Additional credibility indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "1000+", label: "Clients Transformed" },
              { number: "5+", label: "Years Experience" },
              { number: "50+", label: "Health Talks" },
              { number: "10+", label: "Media Features" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-montserrat font-light text-ocean mb-2">
                  {stat.number}
                </div>
                <div className="text-charcoal/70 text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
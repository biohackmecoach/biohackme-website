import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ExternalLink, Star, Shield, Award, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ShopPage = () => {
  const products = [
    {
      id: 1,
      name: "BON CHARGE Red Light Therapy",
      category: "Light Therapy & Recovery",
      benefit: "Science-backed red light therapy devices for cellular rejuvenation, skin health, and muscle recovery",
      bullets: [
        "Clinically proven wavelengths (660nm red + 850nm NIR) for optimal cellular energy",
        "Flicker-free, low EMF technology with lab-grade irradiance for safe daily use", 
        "Complete range from handheld Mini ($299) to full-body Super Max ($1,599)"
      ],
      image: "/shop-images/BON CHARGE Red Light Therapy.webp",
      link: "https://boncharge.com/?rfsn=8415029.b45a04",
      discount: "BIOHACKME"
    },
    {
      id: 2,
      name: "GlycanAge Biological Age Test",
      category: "Biological Age Testing",
      benefit: "The only biological age test that accurately measures your unique response to life changes through advanced glycan analysis",
      bullets: [
        "Based on 30+ years of scientific research using advanced glycan biomarkers",
        "Simple 4-drop blood collection at home with expert consultation included",
        "Track biological age changes over time to optimize wellness interventions"
      ],
      image: "/shop-images/GlycanAge Biological Age Test.webp",
      link: "https://glycanage.com/price-and-plans?discount=1111",
      discount: "1111"
    },
    {
      id: 3,
      name: "BrainTap Brain Fitness Headset",
      category: "Neurotechnology & Brain Training",
      benefit: "Advanced light and sound therapy headset that trains your brain for enhanced focus and performance",
      bullets: [
        "LED visor and auricular therapy with synchronized binaural beats",
        "Access to 2,000+ guided sessions for stress reduction and cognitive enhancement",
        "Bluetooth 4.2 connectivity with 5-hour battery life and premium travel case"
      ],
      image: "/shop-images/BrainTap Brain Fitness Headset.webp",
      link: "https://braintap.com/membership-and-headset/?afmc=7rl&utm_campaign=7rl&utm_source=leaddyno&utm_medium=affiliate",
      discount: ""
    },
    {
      id: 4,
      name: "Found Space Saunas",
      category: "Infrared Sauna & Cold Plunge",
      benefit: "Australia's leaders in hormetic technologies with premium infrared saunas and cold plunge systems",
      bullets: [
        "Advanced infrared sauna collections (Nu-a, Marrkan S, Nyssa) with cutting-edge technology",
        "Professional cold plunge systems (Yirri Steel & Cedar) for complete contrast therapy",
        "FS-1 Operating System with 10-inch display and phone app control for total convenience",
        "Australia-wide delivery and installation with trained technicians and industry-leading warranties"
      ],
      image: "/shop-images/foundspace.png",
      link: "https://foundspace.com.au/",
      discount: "BIOHACKME"
    },
    {
      id: 5,
      name: "Pulsetto Vagus Nerve Stimulator",
      category: "Stress Management & Nervous System",
      benefit: "Revolutionary wearable device that reduces stress in just 4 minutes through vagus nerve stimulation",
      bullets: [
        "Dual-technology, hands-free design worn around the neck for convenience",
        "Lifetime Pulsetto App with 5 expert-designed programs for stress and anxiety",
        "Scientifically proven to activate parasympathetic nervous system for relaxation"
      ],
      image: "/shop-images/Pulsetto Vagus Nerve Stimulator.webp",
      link: "https://pulsetto.sjv.io/YR3Nmr",
      discount: ""
    },
    {
      id: 6,
      name: "Zone by Lydia",
      category: "Sustainable Activewear & Wellness",
      benefit: "High-vibe hemp clothing designed for comfort, performance, and low-tox living with mindful sustainability",
      bullets: [
        "100% pure hemp fabric that gets softer with every wear, not weaker",
        "Naturally breathable and durable materials perfect for active, mindful living",
        "Ethically crafted activewear and yoga gear supporting personal and planetary wellness",
        "Sustainable, eco-conscious design with intention in every thread"
      ],
      image: "/shop-images/zone.png",
      link: "https://www.zonebylydia.com/",
      discount: "BIOHACK15"
    },
    {
      id: 7,
      name: "MyBrainCo Cognitive Enhancement",
      category: "Nootropics & Cognitive Enhancement",
      benefit: "Evidence-backed nutritional supplements scientifically formulated for optimal brain performance",
      bullets: [
        "Holistic approach recognising nutrition and environmental impact on cognition",
        "Scientifically formulated to support both body and brain performance",
        "Comprehensive range targeting mental wellbeing and cognitive enhancement"
      ],
      image: "/shop-images/brainco newimages.png",
      link: "https://mybrainco.com/camilla6896123",
      discount: "BIOHACKME"
    },
    {
      id: 8,
      name: "HEALR Hydrogen Water",
      category: "Hydrogen Therapy & Cellular Hydration",
      benefit: "World's first sugar-free, naturally flavored hydrogen water tablets with 12 PPM concentration",
      bullets: [
        "Patented formula delivers 25x higher molecular hydrogen than drink bottles",
        "Clinically validated as powerful antioxidant and anti-inflammatory supplement",
        "Sugar-free, naturally flavored formula supports cellular performance and anti-aging"
      ],
      image: "/shop-images/HEALR Hydrogen Water.webp",
      link: "https://drinkhealr.com/?bg_ref=Y8H5HZhUmw",
      discount: "BIOHACKME"
    },
    {
      id: 9,
      name: "Genetic Labs Australia NMN Collection",
      category: "Longevity Supplements",
      benefit: "Australian-made, third-party tested longevity supplements for healthy aging and cellular vitality",
      bullets: [
        "Premium NMN, Trans-Resveratrol, and Berberine to restore NAD+ levels",
        "100% Australian made with GMP and TGA compliance for maximum purity",
        "Synergistic Longevity Pack combining essential compounds for anti-aging"
      ],
      image: "/shop-images/Genetic Labs Australia NMN Collection.webp",
      link: "https://geneticlabsaustralia.com/biohackme",
      discount: "CAMILLA20"
    },
    {
      id: 10,
      name: "OptimOZ Biohacking Collection",
      category: "Biohacking & Performance Enhancement",
      benefit: "Australia's premier biohacking store with cutting-edge supplements and performance products",
      bullets: [
        "Comprehensive range including Bulletproof Coffee, MCT oils, and premium nootropics",
        "Australian owned and operated since 2013 with Sydney-based quality assurance",
        "Curated selection following quantified-self and biohacking optimisation principles"
      ],
      image: "/shop-images/OptimOZ Biohacking Collection.webp",
      link: "https://optimoz.com.au/?rfsn=8400226.150d6e2&utm_source=refersion&utm_medium=affiliate&utm_campaign=8400226.150d6e2",
      discount: ""
    },
    {
      id: 11,
      name: "Jumpsport Fitness Rebounders",
      category: "Fitness & Movement",
      benefit: "Professional-grade rebounders and fitness trampolines for low-impact, high-results workouts",
      bullets: [
        "Patented No-Tip Arched Legs design for maximum stability and safety during workouts",
        "Premium bungee cord suspension system for smooth, joint-friendly bounce experience",
        "Australian-made quality construction with comprehensive warranties for peace of mind"
      ],
      image: "/shop-images/Jumpsport Fitness Rebounders.webp",
      link: "https://www.jumpsportfitness.com.au/",
      discount: "BIOHACKME"
    },
    {
      id: 12,
      name: "Sodii Electrolyte Salts",
      category: "Hydration & Electrolytes",
      benefit: "Australia's highest rated electrolyte product with premium Lake Deborah salt for superior cellular hydration",
      bullets: [
        "NASAA Certified Organic salt from pristine Lake Deborah, Western Australia - pollution-free ancient lake salt",
        "Optimal electrolyte ratios: 1000mg sodium, 210mg potassium, 70mg magnesium for superior cellular absorption",
        "Sugar-free, carb-friendly formulation that's fasting and gut-friendly with natural flavours",
        "HASTA™ certified and WADA compliant - trusted by athletes with 3500+ five-star reviews"
      ],
      image: "/shop-images/sodii.png",
      link: "https://sodii.com.au/xoskg9",
      discount: "15% OFF"
    },
    {
      id: 13,
      name: "DNA Methylation Test Kit",
      category: "Epigenetic Testing",
      benefit: "The most accurate DNA methylation test using Dr. Horvath's epigenetic clock for true biological age",
      bullets: [
        "Analyzes 2,000+ DNA methylation markers with 1,000x sequencing accuracy",
        "Requires only 2-3 drops of blood for precise age prediction",
        "Based on Nobel Prize-winning epigenetic research for scientific validity"
      ],
      image: "/shop-images/DNA Methylation Test Kit.webp",
      link: "https://nutripath.com.au/product/methylation-genetic-test-8009/",
      discount: "Contact me directly"
    },
    {
      id: 14,
      name: "Ultrahuman Ring AIR",
      category: "Health Tracking & Wearables",
      benefit: "World's lightest smart ring that tracks sleep, fitness, heart health and metabolic markers for enhanced longevity",
      bullets: [
        "Comprehensive health tracking: sleep stages, HRV, movement, heart rate and temperature monitoring",
        "Advanced metabolic insights when paired with Ultrahuman M1 CGM for real-time glucose tracking",
        "Sleek, lightweight titanium design with 6-day battery life and waterproof construction",
        "AI-powered insights and personalized recommendations to optimize your healthspan"
      ],
      image: "/shop-images/ultrahuman.png",
      link: "https://ultrahumanhealthcare.pxf.io/yqYrvN",
      discount: "BIOHACKME10"
    },
    {
      id: 15,
      name: "Creation Cacao Ceremonial Cacao",
      category: "Superfoods & Nutrition",
      benefit: "Pure ceremonial grade cacao that delivers sustained energy, mental clarity, and mood enhancement without the caffeine crash",
      bullets: [
        "Rich in theobromine for long-lasting energy without jitters, plus higher iron content than red meat",
        "Supports hormone balance, crushes sugar cravings, and enhances mood through natural bliss chemicals",
        "Improves circulation, blood flow, and cardiovascular health with potent flavanols and nitric oxide",
        "Affordable ceremonial grade cacao that supports education initiatives with every purchase"
      ],
      image: "/shop-images/CREATION CACAO DARK LOGO.png",
      link: "https://creationcacao.com.au/collections/powerful-ceremonial-cacao-at-a-reasonable-price?sca_ref=10163296.feI1nsbQqbyn5Geu",
      discount: "10% OFF"
    }
  ];



  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Biohacking Shop - Premium Wellness Products | BiohackMe</title>
        <meta name="description" content="Discover Camilla Thompson's curated collection of premium biohacking tools and supplements. From red light therapy to longevity supplements - only the products that work." />
        <meta name="keywords" content="biohacking products, red light therapy, biological age testing, nootropics, hydrogen water, vagus nerve stimulation, supplements Australia" />
      </Helmet>

      <Header />

      <div className="min-h-screen bg-gradient-to-br from-ice via-cloud to-sky/30 font-montserrat">
        {/* Floating Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-ocean/20 to-sky/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-sky/20 to-ice/30 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-ice/30 to-ocean/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative z-10">
          {/* Hero Section */}
          <section className="pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-montserrat font-bold text-transparent bg-clip-text bg-gradient-to-r from-ocean to-sky mb-8 leading-tight">
                  Biohacking Shop
                </h1>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-ocean mb-6 leading-tight">
                  The Biohacking Tools
                  <span className="block text-gray-700">
                    I Trust & Use Myself
                  </span>
                </h2>
                <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  From red light therapy to infrared saunas to longevity supplements to biological age testing —
                  I've curated the complete biohacking toolkit that actually works for optimising your health and performance.
                </p>
              </motion.div>
            </div>
          </section>

          {/* My Philosophy Section */}
          <section className="pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 md:p-10 border border-white/20 shadow-xl"
              >
                <div className="flex items-center mb-6">
                  <Award className="w-8 h-8 text-amber-500 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">My Philosophy</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  I'm not into quick fixes or gimmicks. Every item you'll see here is something I've personally tried 
                  and found worth keeping in my daily or weekly routine. These products have earned their place through 
                  real results, not marketing hype. If you're serious about optimising your health and performance, 
                  this collection is where I'd start.
                </p>
              </motion.div>
            </div>
          </section>


          {/* Products Grid */}
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.div
                variants={stagger}
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: product.id * 0.1 }}
                    className="group bg-white/70 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
                  >
                    <div className="flex-1 flex flex-col">
                      <div className="relative mb-6">
                        <div className="aspect-w-16 aspect-h-12 bg-white rounded-2xl overflow-hidden border border-gray-100">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className={`w-full object-contain object-center p-4 group-hover:scale-105 transition-transform duration-500 ${
                              ['BON CHARGE Red Light Therapy', 'BrainTap Brain Fitness Headset', 'Pulsetto Vagus Nerve Stimulator', 'HEALR Hydrogen Water', 'Genetic Labs Australia NMN Collection'].includes(product.name) 
                                ? 'h-8' 
                                : 'h-14'
                            }`}
                            loading="lazy"
                          />
                        </div>
                      </div>

                      <div className="mb-2">
                        <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                          {product.category}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>

                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {product.benefit}
                      </p>

                      <ul className="space-y-3 mb-8 flex-1">
                        {product.bullets.map((bullet, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto">
                      {product.discount && (
                        <div className="mb-4 text-center">
                          <span className="inline-block bg-gradient-to-r from-ice to-cloud text-ocean px-4 py-2 rounded-full text-sm font-medium border border-sky/20">
                            Use code: {product.discount}
                          </span>
                        </div>
                      )}

                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-premium w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-ocean to-sky text-white font-medium rounded-full hover:from-ocean/90 hover:to-sky/90 transition-all duration-300 group-hover:shadow-xl"
                      >
                        Shop {product.name.split(' ')[0]}
                        <ExternalLink className="w-5 h-5 ml-2" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Disclaimers Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-100 to-gray-100">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-gray-200 shadow-xl"
              >
                <div className="flex items-center mb-6">
                  <Shield className="w-8 h-8 text-blue-500 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Important Disclaimers</h2>
                </div>
                
                <div className="space-y-6 text-gray-700">
                  <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200">
                    <h3 className="font-bold text-amber-800 mb-2">Affiliate Disclosure</h3>
                    <p className="text-amber-700">
                      Some links are affiliate links, which means I may earn a commission if you buy through them—at no extra cost to you. 
                      I only recommend products I personally use and believe in.
                    </p>
                  </div>

                  <div className="p-6 bg-blue-50 rounded-2xl border border-blue-200">
                    <h3 className="font-bold text-blue-800 mb-2">Medical Disclaimer</h3>
                    <p className="text-blue-700">
                      The information provided on this site is for general informational purposes only and reflects my own personal experiences. 
                      It is not intended to diagnose, treat, cure, or prevent any disease, and should not be taken as medical advice. 
                      Always consult a qualified health professional before making any changes to your health, wellness, or supplement routine.
                    </p>
                  </div>

                  <div className="p-6 bg-green-50 rounded-2xl border border-green-200">
                    <h3 className="font-bold text-green-800 mb-2">TGA Compliance</h3>
                    <p className="text-green-700">
                      Products mentioned may be regulated by the Therapeutic Goods Administration (TGA) in Australia. 
                      Any therapeutic claims should be verified with the manufacturer or your healthcare provider.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-12 text-white"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Optimise Your Life?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Start with one product that resonates with you. Small, consistent changes create lasting transformation.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  Get Personalised Recommendations
                  <ExternalLink className="w-5 h-5 ml-2" />
                </a>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ShopPage;
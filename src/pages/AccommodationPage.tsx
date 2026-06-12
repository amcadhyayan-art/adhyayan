import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Bed, MapPin, Phone, Shield, Sparkles, CheckCircle, Info, Calendar } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';

const AccommodationPage: React.FC = () => {
  const accommodationOptions = [
    {
      type: 'Girls Hostel (Triple Sharing)',
      price: '₹500/head per day',
      occupancy: 'Triple Sharing Rooms',
      amenities: ['Ceiling Fan', 'Attached Bathroom', 'Common Study Room', 'Purified Drinking Water', '24/7 Security Desk'],
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  const bookingSteps = [
    {
      step: '01',
      title: 'Inquire Availability',
      description: 'Call or message the accommodation coordinators (Sravya, Prashanthi, or Vamsi) to check room availability.'
    },
    {
      step: '02',
      title: 'Share Credentials',
      description: 'Provide your details including full name, college name, gender, and registration IDs.'
    },
    {
      step: '03',
      title: 'Confirm Booking',
      description: 'Complete the transaction fee as guided by coordinators to confirm and lock in your hostel room allocation.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <>
      <Helmet>
        <title>Accommodation | ADHYAYAN 2026</title>
        <meta name="description" content="Find comfortable and affordable accommodation options for ADHYAYAN 2026 participants near Andhra Medical College, Visakhapatnam." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-gradient-to-b from-white to-slate-50 text-slate-800 border-b border-slate-100 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.05),transparent_60%)] pointer-events-none"></div>
        <div className="container animate-fade-in">
          <motion.div 
            className="max-w-3xl mx-auto text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-500/10 text-sky-600 text-xs font-semibold uppercase tracking-wider border border-sky-500/20">
                <Sparkles className="h-3.5 w-3.5 text-sky-600" />
                Accommodation Guide
              </span>
            </div>
            <h1 className="font-outfit font-extrabold text-5xl md:text-6xl text-slate-900">Guest Stay & Logistics</h1>
            <p className="text-lg text-slate-500 font-jakarta max-w-2xl mx-auto">
              Comfortable, secure, and affordable triple-sharing hostel rooms situated within convenient reach of major AMC function halls.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hostels & Info Directory */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left side details */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-8"
            >
              <div>
                <SectionTitle
                  subtitle="How to Reach"
                  title="Venue Location"
                />
                <div className="flex items-start gap-4 mt-6">
                  <div className="p-3 bg-sky-500/10 text-sky-600 rounded-2xl border border-sky-500/20 shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-outfit font-bold text-lg text-slate-900 mb-2">Hostel & Venue Address</h4>
                    <p className="text-slate-500 font-jakarta text-sm leading-relaxed">
                      Andhra Medical College campus, Maharanipeta, Visakhapatnam, Andhra Pradesh - 530002.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <SectionTitle
                  subtitle="Accommodation Contacts"
                  title="Get In Touch"
                />
                <div className="flex items-start gap-4 mt-6">
                  <div className="p-3 bg-sky-500/10 text-sky-600 rounded-2xl border border-sky-500/20 shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-outfit font-bold text-lg text-slate-900">Logistics Coordinators</h4>
                    <div className="space-y-2 font-jakarta text-sm">
                      <div className="flex justify-between items-center w-64 text-slate-600">
                        <span className="font-semibold">Sravya (Girls Hostel)</span>
                        <a href="tel:+919392062600" className="text-sky-600 hover:underline">+91 93920 62600</a>
                      </div>
                      <div className="flex justify-between items-center w-64 text-slate-600">
                        <span className="font-semibold">Prashanthi</span>
                        <a href="tel:+917032583272" className="text-sky-600 hover:underline">+91 70325 83272</a>
                      </div>
                      <div className="flex justify-between items-center w-64 text-slate-600">
                        <span className="font-semibold">Vamsi</span>
                        <a href="tel:+919381581180" className="text-sky-600 hover:underline">+91 93815 81180</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right side options display */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-8"
            >
              {accommodationOptions.map((opt, idx) => (
                <div key={idx} className="card bg-white border border-slate-200/60 shadow-sm overflow-hidden">
                  <div className="relative h-64">
                    <img src={opt.image} alt={opt.type} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-sky-600 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-xl">
                        {opt.occupancy}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-outfit font-extrabold text-slate-900">{opt.type}</h3>
                      <span className="text-2xl font-extrabold text-sky-600 font-outfit">{opt.price}</span>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 font-montserrat">Included Amenities</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {opt.amenities.map((amenity, i) => (
                          <div key={i} className="flex items-center text-sm text-slate-600 font-jakarta">
                            <CheckCircle className="h-4 w-4 text-sky-600 mr-2.5 shrink-0" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking Process Roadmap */}
      <section className="section bg-slate-50 border-t border-b border-slate-100">
        <div className="container">
          <SectionTitle
            subtitle="Secure Your Room"
            title="Accommodation Booking Process"
            alignment="center"
          />

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto"
          >
            {bookingSteps.map((step, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="card p-8 bg-white border border-slate-200/60 shadow-sm relative group"
              >
                <div className="absolute top-6 right-6 font-outfit font-extrabold text-4xl text-slate-800/40 group-hover:text-sky-600/20 transition-colors">
                  {step.step}
                </div>
                <h3 className="text-xl font-outfit font-bold text-slate-900 mb-4 pr-10">{step.title}</h3>
                <p className="text-slate-500 text-sm font-jakarta leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Booking Guidelines & Policies */}
      <section className="section bg-white">
        <div className="container max-w-4xl">
          <SectionTitle
            subtitle="Prerequisites"
            title="Important Guidelines"
            alignment="center"
          />

          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card p-8 bg-white border border-slate-200/60 shadow-sm space-y-6 mt-12"
          >
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <Info className="h-5.5 w-5.5 text-sky-600" />
              <h3 className="text-lg font-outfit font-bold text-slate-900">Please Note the Following Guidelines</h3>
            </div>
            
            <ul className="space-y-4 text-sm text-slate-500 font-jakarta leading-relaxed">
              <li className="flex items-start">
                <span className="h-1.5 w-1.5 bg-sky-400 rounded-full mr-3 mt-2 shrink-0"></span>
                <span>All hostel bookings are strictly restricted for <strong className="text-slate-800">female outstation participants</strong> due to safety and university regulations.</span>
              </li>
              <li className="flex items-start">
                <span className="h-1.5 w-1.5 bg-sky-400 rounded-full mr-3 mt-2 shrink-0"></span>
                <span>A valid college identity card and a passport-sized photograph must be presented physically during checking-in.</span>
              </li>
              <li className="flex items-start">
                <span className="h-1.5 w-1.5 bg-sky-400 rounded-full mr-3 mt-2 shrink-0"></span>
                <span>Room allocations are processed on a first-come, first-served basis. Early bookings are strongly advised.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-200/60 text-slate-800 text-center">
        <div className="container max-w-2xl space-y-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-outfit font-extrabold text-slate-900 leading-tight">
            Confirm Your Stay at Visakhapatnam
          </h2>
          <p className="text-slate-500 font-jakarta text-sm max-w-lg mx-auto">
            Get in touch with Sravya directly to check current availability levels and secure your slot confirmation.
          </p>
          <div className="pt-2">
            <a 
              href="tel:+919392062600" 
              className="btn-primary px-8 py-3.5 text-white"
            >
              Call Sravya Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default AccommodationPage;
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, Award, Clock, ArrowRight, Lightbulb, Map, BookOpen, History, Star, Trophy, Sparkles, Quote, MapPin } from 'lucide-react';
import HeroSection from '../components/home/HeroSection';
import { InteractiveTravelCard } from '../components/ui/3d-card';
import SectionTitle from '../components/ui/SectionTitle';


const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const legacyHighlights = [
    {
      icon: <History className="h-6 w-6 text-sky-600" />,
      title: 'A Century of Excellence',
      description: 'Founded in 1923, pioneering medical education in South India for over 100 years.',
    },
    {
      icon: <Star className="h-6 w-6 text-sky-600" />,
      title: 'Premier Institution',
      description: 'The largest and most prestigious medical college in Andhra Pradesh.',
    },
    {
      icon: <Trophy className="h-6 w-6 text-sky-600" />,
      title: 'Academic Distinction',
      description: 'Driving medical breakthroughs through disciplined research and innovation.',
    },
    {
      icon: <Users className="h-6 w-6 text-sky-600" />,
      title: 'Healthcare Leaders',
      description: 'An illustrious global alumni network leading healthcare innovation worldwide.',
    },
  ];

  const workshops = [
    {
      id: 'surgery',
      title: 'Surgery Workshop',
      category: 'Clinical Core',
      description: 'Hands-on practice on suture techniques, incisions, and advanced surgical procedures.',
      date: 'July 10-13, 2026',
      image: '/workshops/Surgery.png',
    },
    {
      id: 'anaesthesia',
      title: 'Anaesthesia Workshop',
      category: 'Clinical Core',
      description: 'Advanced simulation training in airway management and general anaesthesia administration.',
      date: 'July 13-14, 2026',
      image: '/workshops/Anesthesia.png',
    },
    {
      id: 'orthopaedics',
      title: 'Orthopaedics Workshop',
      category: 'Specialties',
      description: 'Learn plastering, casting techniques, joint examinations, and bone plating.',
      date: 'July 12, 2026',
      image: '/workshops/Orthopedics.png',
    },
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <>
      <Helmet>
        <title>ADHYAYAN 2026 | A Festival of Fire, A Symphony of Scholars</title>
        <meta name="description" content="Join ADHYAYAN 2026 - Where dreams take shape, and ideas take flight. A celebration of thought, talent, and transformation in medical excellence." />
      </Helmet>

      <HeroSection />

      {/* Legacy Section */}
      <section className="section bg-white overflow-hidden">
        {/* Glow decorative overlays */}
        <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="absolute bottom-1/4 -right-64 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="inline-block bg-sky-500/10 px-4 py-1.5 rounded-full border border-sky-500/20 text-sky-600 text-xs font-semibold uppercase tracking-widest mb-4 font-montserrat">
              Our Legacy
            </span>
            <h2 className="text-4xl md:text-5xl font-outfit font-extrabold text-slate-900 tracking-tight mb-4">
              A Century of Medical Excellence
            </h2>
            <div className="h-[3px] w-24 bg-gradient-to-r from-sky-400 to-sky-600 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left side content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-6"
            >
              <h3 className="font-outfit text-3xl md:text-5xl font-extrabold leading-tight text-slate-900">
                Crafting an Experience <br />
                <span className="bg-gradient-to-r from-slate-900 to-sky-600 bg-clip-text text-transparent">
                  Since 1923
                </span>
              </h3>
              <div className="space-y-4 font-jakarta text-slate-600 leading-relaxed text-base md:text-lg">
                <p>
                  <strong className="text-slate-800">Andhra Medical College</strong> stands as one of India's oldest and most prestigious medical institutions, fostering clinical excellence and research breakthroughs since 1923.
                </p>
                <p>
                  As the largest medical college in Andhra Pradesh, AMC's teaching affiliate, <strong className="text-slate-800">King George Hospital (KGH)</strong>, offers a world-class training ground with extensive clinical exposure for aspiring medical pioneers.
                </p>
                <p>
                  This festival represents the convergence of this rich centenary heritage with modern medical-tech innovations, creating an unparalleled platform for scholars.
                </p>
              </div>
              <div className="pt-4">
                <Link 
                  to="/about" 
                  className="btn-primary group text-white"
                >
                  Discover Our Heritage
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 text-white" />
                </Link>
              </div>
            </motion.div>

            {/* Right side stats grid */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {legacyHighlights.map((highlight, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="card p-6 flex flex-col items-start hover:-translate-y-1 bg-white border border-slate-200/60 shadow-sm"
                >
                  <div className="mb-5 p-3 rounded-xl bg-sky-50 border border-sky-100/50 text-sky-600">
                    {highlight.icon}
                  </div>
                  <h4 className="font-outfit font-bold text-lg mb-3 text-slate-900">
                    {highlight.title}
                  </h4>
                  <p className="text-sm text-slate-500 font-jakarta leading-relaxed">{highlight.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* About ADHYAYAN Section */}
      <section className="section bg-slate-50 border-t border-b border-slate-150">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-500/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

        <div className="container relative z-10">
          <SectionTitle
            subtitle="About the Event"
            title="ADHYAYAN 2026"
            alignment="center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 items-center">
            {/* Story text */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-6"
            >
              <h3 className="text-3xl font-outfit font-bold text-slate-900 leading-tight">
                A Festival of Fire, <br />
                <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">A Symphony of Scholars</span>
              </h3>
              <p className="text-slate-600 font-jakarta leading-relaxed">
                The Incendios, true to their name, burn with the flame of excellence. They have woven a fest not with mere events, but with visions — of a world where learning is not a task, but a triumph; not a burden, but a bliss. ADHYAYAN is more than a gathering — it is a pilgrimage of intellect.
              </p>
              
              <div className="p-6 bg-sky-50/50 border border-sky-100 rounded-2xl flex gap-4">
                <Quote className="h-8 w-8 text-sky-600 shrink-0 transform -scale-x-100" />
                <p className="text-slate-600 font-jakarta italic leading-relaxed text-sm">
                  In Visakhapatnam's sacred soil, heart is KING GEORGE. Its voice is ADHYAYAN. The flame is INCENDIOS. Together they just IGNITE.
                </p>
              </div>
              <div className="pt-2">
                <Link to="/about" className="btn-secondary">
                  Meet the Leaders
                </Link>
              </div>
            </motion.div>

            {/* Core facts widgets */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-6 grid grid-cols-2 gap-4"
            >
              <motion.div variants={itemVariants} className="card p-6 flex flex-col items-center text-center bg-white border border-slate-200/60 shadow-sm hover:border-sky-500/20">
                <div className="p-3 bg-sky-500/10 text-sky-600 rounded-full mb-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <h4 className="font-outfit font-bold text-base mb-1.5 text-slate-900">8 Days of Learning</h4>
                <p className="text-xs text-slate-500 font-jakarta leading-relaxed">Workshops, diagnostic labs, and networking</p>
              </motion.div>

              <motion.div variants={itemVariants} className="card p-6 flex flex-col items-center text-center bg-white border border-slate-200/60 shadow-sm hover:border-sky-500/20">
                <div className="p-3 bg-sky-500/10 text-sky-600 rounded-full mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h4 className="font-outfit font-bold text-base mb-1.5 text-slate-900">1000+ Attendees</h4>
                <p className="text-xs text-slate-500 font-jakarta leading-relaxed">Medical students, scholars, and doctors</p>
              </motion.div>

              <motion.div variants={itemVariants} className="card p-6 flex flex-col items-center text-center bg-white border-slate-200/60 shadow-sm hover:border-sky-500/20">
                <div className="p-3 bg-sky-500/10 text-sky-600 rounded-full mb-4">
                  <Award className="h-6 w-6" />
                </div>
                <h4 className="font-outfit font-bold text-base mb-1.5 text-slate-900">Cash Prizes</h4>
                <p className="text-xs text-slate-500 font-jakarta leading-relaxed">For innovations, debates, and seminars</p>
              </motion.div>

              <motion.div variants={itemVariants} className="card p-6 flex flex-col items-center text-center bg-white border-slate-200/60 shadow-sm hover:border-sky-500/20">
                <div className="p-3 bg-sky-500/10 text-sky-600 rounded-full mb-4">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <h4 className="font-outfit font-bold text-base mb-1.5 text-slate-900">Innovation Hub</h4>
                <p className="text-xs text-slate-500 font-jakarta leading-relaxed">A launching pad for future healthcare ideas</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Workshops & Competitions Preview */}
      <section className="section bg-white">
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

        <div className="container relative z-10">
          <SectionTitle
            subtitle="Featured Events"
            title="Workshops & Competitions"
            alignment="center"
          />

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            {workshops.map((workshop) => (
              <motion.div 
                key={workshop.id} 
                variants={itemVariants}
                className="flex justify-center"
                style={{ perspective: "1000px" }}
              >
                <InteractiveTravelCard
                  title={workshop.title}
                  subtitle={`${workshop.category} · ${workshop.date}`}
                  imageUrl={workshop.image}
                  actionText="Explore Details"
                  href={`/workshops/${workshop.id}`}
                  onActionClick={() => {
                    navigate(`/workshops/${workshop.id}`);
                  }}
                  className="w-full max-w-sm"
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link to="/workshops" className="btn-secondary group">
              View All Workshops
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Registration CTA Section */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-200/60 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.06),transparent_60%)] pointer-events-none"></div>
        <div className="container relative text-center max-w-3xl space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-500/10 text-sky-600 text-xs font-semibold uppercase tracking-wider border border-sky-500/20">
                <Sparkles className="h-3.5 w-3.5 text-sky-600" />
                Registrations Open
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-outfit font-extrabold text-slate-900 leading-tight">
              Ready to Join the Symphony of Scholars?
            </h2>
            <p className="text-slate-500 font-jakarta text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Secure your spot at ADHYAYAN 2026. Join interactive workshops, pitch your diagnostics solutions, and network with leading practitioners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/workshops" className="btn-primary px-8 py-3.5 text-white">
                Register Now
              </Link>
              <Link to="/contact" className="btn-secondary px-8 py-3.5">
                Inquire Info
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Venue Section */}
      <section className="section bg-white">
        <div className="container">
          <SectionTitle
            subtitle="Location"
            title="Venue & Accommodation"
            alignment="center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 items-center">
            {/* Location info details */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-8"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-sky-500/10 text-sky-600 rounded-2xl border border-sky-500/20 mt-1">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-outfit font-bold text-lg text-slate-900 mb-2">Event Venue</h4>
                  <p className="text-slate-500 font-jakarta text-sm leading-relaxed">
                    AMCOSA Function Hall, Near Zilla Parishad, Port Officers Quarters, Maharani Peta, Visakhapatnam, Andhra Pradesh 530002
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-sky-500/10 text-sky-600 rounded-2xl border border-sky-500/20 mt-1">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-outfit font-bold text-lg text-slate-900 mb-2">Convenient Accommodation</h4>
                  <p className="text-slate-500 font-jakarta text-sm leading-relaxed">
                    Frosted AC accommodation rooms available for outstation female participants on a sharing basis, situated close to active event halls.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link to="/accommodation" className="btn-secondary">
                  Accommodation Guide
                </Link>
              </div>
            </motion.div>

            {/* Map Frame */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 bg-white border border-slate-200/60 shadow-sm rounded-2xl overflow-hidden h-96 relative p-2"
            >
              <div className="rounded-xl overflow-hidden h-full w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.849139677741!2d83.29367499999999!3d17.7168805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3943124dbe2f73%3A0xcd2b3326b6ab2e05!2sAMCOSA%20Function%20Hall!5e0!3m2!1sen!2sin!4v1716900040879!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0,  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Adhyayan 2026 Map"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;

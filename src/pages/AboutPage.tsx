import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { BookOpen, Award, Lightbulb, Users, Building, GraduationCap, Quote, CheckCircle, Star, Heart } from 'lucide-react';
import sandhyaImage from '../assets/images/about/dr-sandhya-devi.jpeg';
import sivanandhaImage from '../assets/images/about/dr-sivanandha.jpeg';
import krishnaveniImage from '../assets/images/about/dr-krishnaveni.jpeg';
import rajendraPrasadImage from '../assets/images/about/dr-rajendra-prasad.jpeg';
import campusImg1 from '../assets/images/about/1.jpeg';
import campusImg2 from '../assets/images/about/2.jpeg';
import campusImg3 from '../assets/images/about/3.jpeg';
import VaniMD from '../assets/images/about/VaniMD.jpg';
// suppress unused import warning
void sivanandhaImage;

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.12 } }
};

const AboutPage: React.FC = () => {

  const stats = [
    { icon: <GraduationCap className="h-6 w-6" />, value: '1923', label: 'Year Founded', color: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-200' },
    { icon: <Users className="h-6 w-6" />, value: '5000+', label: 'Alumni Network', color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200' },
    { icon: <Building className="h-6 w-6" />, value: '40+', label: 'Departments', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { icon: <Award className="h-6 w-6" />, value: '100+', label: 'Awards & Recognitions', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
  ];

  const values = [
    {
      icon: <Lightbulb className="h-7 w-7 text-sky-600" />,
      title: 'Innovation',
      description: 'Encouraging students to develop groundbreaking solutions to healthcare challenges through creative and critical thinking.',
      bg: 'bg-sky-50',
      border: 'border-sky-100',
      iconBg: 'bg-sky-100',
    },
    {
      icon: <BookOpen className="h-7 w-7 text-indigo-600" />,
      title: 'Knowledge',
      description: 'Committed to the pursuit of knowledge by providing the latest research, techniques, and practices in medical science.',
      bg: 'bg-indigo-50',
      border: 'border-indigo-100',
      iconBg: 'bg-indigo-100',
    },
    {
      icon: <Heart className="h-7 w-7 text-rose-500" />,
      title: 'Compassion',
      description: 'Fostering a culture of empathy and patient-centred care that forms the ethical backbone of every medical professional.',
      bg: 'bg-rose-50',
      border: 'border-rose-100',
      iconBg: 'bg-rose-100',
    },
    {
      icon: <Star className="h-7 w-7 text-amber-500" />,
      title: 'Excellence',
      description: 'Setting high standards for academic and professional achievement through relentless dedication and discipline.',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      iconBg: 'bg-amber-100',
    },
  ];

  const leadership = [
    {
      name: 'Dr. K.V.S.M. Sandhya Devi',
      position: 'Principal, AMC',
      additionalRole: 'Addl. DME',
      qualifications: 'M.D, OBG',
      image: sandhyaImage,
      quote: "Education is not just about learning; it's about transforming lives through knowledge and innovation.",
      description: 'Leading AMC with dedication and vision towards medical excellence and institutional advancement.',
    },
    {
      name: 'Dr. I. Vani',
      position: 'Superintendent, KGH',
      qualifications: 'MD OBG',
      image: VaniMD,
      quote: "Our goal is to provide the highest quality healthcare education and service to our community.",
      description: 'Overseeing hospital operations and ensuring world-class excellence in patient care.',
    },
    {
      name: 'Dr. A. Krishnaveni',
      position: 'General Vice-Principal',
      additionalRole: 'Prof & HOD of Community Medicine, AMC',
      qualifications: 'MD',
      image: krishnaveniImage,
      quote: "Community health is the foundation upon which a healthy society is built.",
      description: 'Leading community medicine initiatives and expanding public health programs.',
    },
    {
      name: 'Dr. Rajendra Prasad',
      position: 'Vice-Principal (Administration)',
      additionalRole: 'Prof & HOD of Pediatric Surgery, AMC',
      qualifications: 'MS, M.CH',
      image: rajendraPrasadImage,
      quote: "Administrative excellence supports and sustains academic achievement.",
      description: 'Managing administrative operations and leading pediatric surgical services.',
    }
  ];

  const campusMedia = [
    { type: 'image', src: campusImg1, alt: 'Historic Main Building' },
    { type: 'image', src: campusImg2, alt: 'State-of-the-art Library' },
    { type: 'image', src: campusImg3, alt: 'AMC Campus Life' },
    { type: 'youtube', url: 'https://www.youtube.com/embed/tMqBBHvxY0g' }
  ];

  return (
    <>
      <Helmet>
        <title>About ADHYAYAN 2026 | Andhra Medical College</title>
        <meta name="description" content="Learn about ADHYAYAN 2026, the flagship medical fest of Andhra Medical College — our mission, leadership, campus, and values." />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-slate-900 pt-24">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/HEROBG.jpeg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/60 to-slate-900" />

        {/* Decorative rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full border border-white/5 animate-spin-very-slow" />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-white/5" />
        </div>

        <div className="container relative z-10 text-center text-white py-20">
          <motion.div {...fadeUp}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest mb-8 backdrop-blur-md">
              <CheckCircle className="h-3.5 w-3.5 text-sky-400" />
              Est. 1923 · A Century of Medical Excellence
            </span>
            <h1 className="font-playfair font-bold text-5xl md:text-7xl leading-tight mb-6 text-white">
              About <span className="text-sky-400">ADHYAYAN</span> 2026
            </h1>
            <p className="text-xl text-white/60 font-jakarta max-w-2xl mx-auto leading-relaxed">
              A legacy forged over a century — now carried forward by the brightest minds in medical education.
            </p>
          </motion.div>
        </div>

        {/* wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* ── Mission Statement ── */}
      <section className="section bg-slate-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            >
              <span className="inline-block text-sky-600 text-xs font-bold uppercase tracking-widest mb-4">Our Mission</span>
              <h2 className="font-playfair font-bold text-4xl md:text-5xl text-slate-900 mb-8 leading-tight">
                Nurturing <span className="text-sky-600">Tomorrow's</span> Healers
              </h2>
              <p className="text-lg text-slate-500 font-jakarta leading-relaxed max-w-3xl mx-auto mb-10">
                ADHYAYAN 2026 is the flagship annual medical fest of Andhra Medical College, Visakhapatnam — one of India's most prestigious government medical institutions. Our fest is a convergence of intellectual, clinical, and creative excellence, designed to inspire the next generation of medical professionals to innovate, collaborate, and lead.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {['Clinical Workshops', 'Research Competitions', 'Medical Debates', 'Creative Events', 'Guest Lectures'].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full border border-sky-200 bg-sky-50 text-sky-700 text-sm font-semibold font-montserrat">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 bg-white border-t border-b border-slate-100">
        <div className="container">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`rounded-2xl border ${stat.border} ${stat.bg} p-8 text-center`}
              >
                <div className={`flex justify-center mb-4 ${stat.color}`}>
                  <div className="p-3 rounded-xl bg-white shadow-sm">{stat.icon}</div>
                </div>
                <p className={`text-4xl font-playfair font-bold mb-1 ${stat.color}`}>{stat.value}</p>
                <p className="text-slate-500 text-sm font-montserrat font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-sky-600 text-xs font-bold uppercase tracking-widest block mb-3">Visionary Minds</span>
            <h2 className="font-playfair font-bold text-4xl md:text-5xl text-slate-900 mb-3">
              Our <span className="text-sky-600">Leadership</span>
            </h2>
            <div className="h-1 w-16 bg-sky-500 mx-auto rounded-full" />
          </div>

          <div className="space-y-20">
            {leadership.map((leader, index) => (
              <motion.div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Image */}
                <div className="w-full md:w-5/12">
                  <div className="relative group">
                    <div className="absolute -inset-3 bg-gradient-to-br from-sky-100 to-indigo-100 rounded-3xl -z-10 group-hover:scale-105 transition-transform duration-500" />
                    <div className="relative h-[420px] overflow-hidden rounded-2xl shadow-xl">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                      {/* Qualifications badge */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold font-montserrat px-4 py-2 rounded-full shadow">
                          {leader.qualifications}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-7/12 space-y-5">
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-block bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold font-montserrat px-4 py-1.5 rounded-full uppercase tracking-wide">
                      {leader.position}
                    </span>
                    {leader.additionalRole && (
                      <span className="inline-block bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold font-montserrat px-4 py-1.5 rounded-full uppercase tracking-wide">
                        {leader.additionalRole}
                      </span>
                    )}
                  </div>

                  <h3 className="font-playfair font-bold text-3xl md:text-4xl text-slate-900">{leader.name}</h3>

                  {/* Quote */}
                  <div className="relative pl-6 border-l-4 border-sky-400">
                    <Quote className="h-5 w-5 text-sky-400 mb-2" />
                    <p className="text-slate-600 text-lg italic font-jakarta leading-relaxed">
                      "{leader.quote}"
                    </p>
                  </div>

                  <p className="text-slate-500 text-base font-jakarta leading-relaxed">
                    {leader.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section bg-slate-50 border-t border-slate-100">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-sky-600 text-xs font-bold uppercase tracking-widest block mb-3">What We Stand For</span>
            <h2 className="font-playfair font-bold text-4xl md:text-5xl text-slate-900 mb-3">
              Our <span className="text-sky-600">Values</span>
            </h2>
            <div className="h-1 w-16 bg-sky-500 mx-auto rounded-full" />
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {values.map((value, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`rounded-2xl border ${value.border} ${value.bg} p-8 hover:shadow-lg transition-shadow duration-300`}
              >
                <div className={`inline-flex p-3 rounded-xl ${value.iconBg} mb-5`}>
                  {value.icon}
                </div>
                <h3 className="font-playfair font-bold text-xl text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-500 text-sm font-jakarta leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Campus Gallery ── */}
      <section className="section bg-white border-t border-slate-100">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-sky-600 text-xs font-bold uppercase tracking-widest block mb-3">Where History Meets Future</span>
            <h2 className="font-playfair font-bold text-4xl md:text-5xl text-slate-900 mb-3">
              Our <span className="text-sky-600">Campus</span>
            </h2>
            <div className="h-1 w-16 bg-sky-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campusMedia.map((item, idx) => (
              <motion.div
                key={idx}
                className={`overflow-hidden rounded-2xl shadow-md group ${idx === 0 ? 'md:col-span-2' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                {item.type === 'image' && (
                  <div className="relative overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className={`w-full object-cover transform group-hover:scale-105 transition-transform duration-700 ${idx === 0 ? 'h-[500px]' : 'h-[320px]'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                    <span className="absolute bottom-4 left-4 text-white font-semibold text-sm bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                      {item.alt}
                    </span>
                  </div>
                )}
                {item.type === 'youtube' && (
                  <div className="w-full h-[320px] rounded-2xl overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src={item.url}
                      title="Campus Tour"
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-sky-950 to-indigo-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,#0ea5e9,transparent_60%),radial-gradient(circle_at_70%_50%,#6366f1,transparent_60%)]" />
        <div className="container relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-sky-400 text-xs font-bold uppercase tracking-widest mb-4">Be Part of the Legacy</span>
            <h2 className="font-playfair font-bold text-4xl md:text-5xl mb-6 leading-tight">
              Join Our Legacy of Excellence
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-white/60 font-jakarta mb-10 leading-relaxed">
              Be part of ADHYAYAN 2026 and contribute to the future of medical innovation at one of India's most storied institutions.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/workshops"
                className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-bold font-montserrat px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:-translate-y-0.5 text-sm uppercase tracking-wide"
              >
                Explore Workshops
              </a>
              <a
                href="/competitions"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold font-montserrat px-8 py-4 rounded-xl transition-all duration-300 text-sm uppercase tracking-wide"
              >
                View Competitions
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;

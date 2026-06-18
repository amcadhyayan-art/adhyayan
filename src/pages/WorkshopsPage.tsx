import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowRight, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { InteractiveTravelCard } from '../components/ui/3d-card';
import SectionTitle from '../components/ui/SectionTitle';
import { API_BASE_URL } from '../config';

const defaultWorkshops = [
  {
    id: 'ophthalmology',
    _id: 'ophthalmology',
    title: 'Ophthalmology Workshop',
    category: 'Specialties',
    description: 'Comprehensive training in eye examination, fundoscopy, and basic surgical techniques.',
    date: 'July 10, 2026',
    venue: 'Govt. Regional Eye Hospital, RAMA TALKIES',
    price: 599,
    image: '/workshops/Ophthalmology.png'
  },
  {
    id: 'orthopaedics',
    _id: 'orthopaedics',
    title: 'Orthopaedics Workshop',
    category: 'Specialties',
    description: 'Learn essential splinting, bandaging, casting techniques, and fracture management.',
    date: 'July 12, 2026',
    time: 'AM & PM Sessions',
    venue: 'AMCOSA',
    price: 499,
    image: '/workshops/Orthopedics.png'
  },
  {
    id: 'anaesthesia',
    _id: 'anaesthesia',
    title: 'Anaesthesia Workshop',
    category: 'Clinical',
    description: 'Comprehensive training in anaesthesia administration, intubation, and basic life support.',
    date: 'July 13-14, 2026',
    time: 'AM & PM Sessions',
    venue: 'NELS Skill Lab, AMC',
    price: 449,
    image: '/workshops/Anesthesia.png'
  },
  {
    id: 'surgery',
    _id: 'surgery',
    title: 'Surgery Workshop',
    category: 'Clinical',
    description: 'Hands-on training in basic surgical knotting, suturing techniques, and wound management.',
    date: 'July 10-13, 2026',
    venue: 'AMCOSA',
    price: 499,
    image: '/workshops/Surgery.png'
  },
  {
    id: 'obgyn1',
    _id: 'obgyn1',
    title: 'ObGyn Workshop - 1',
    category: 'Specialties',
    description: 'Essential obstetric and gynecological procedures training, including deliveries.',
    date: 'July 11-12, 2026',
    venue: 'AMCOSA',
    price: 299,
    image: '/workshops/Gynaecology.png'
  },
  {
    id: 'obgyn2',
    _id: 'obgyn2',
    title: 'ObGyn Workshop - 2',
    category: 'Specialties',
    description: 'Advanced obstetric and gynecological procedures training and emergency management.',
    date: 'July 13-14, 2026',
    venue: 'AMCOSA',
    price: 299,
    image: '/workshops/Gynaecology.png'
  },
  {
    id: 'ent',
    _id: 'ent',
    title: 'ENT Workshop',
    category: 'Specialties',
    description: 'Comprehensive training in otorhinolaryngology diagnostics and clinical procedures.',
    date: 'July 12, 2026',
    venue: 'Govt. ENT Hospital, Pedda Waltair',
    price: 349,
    image: '/workshops/Ent.png'
  },
  {
    id: 'pediatrics',
    _id: 'pediatrics',
    title: 'Pediatrics Workshop',
    category: 'Specialties',
    description: 'Essential pediatric resuscitation, clinical care, and developmental assessment training.',
    date: 'July 11, 2026',
    venue: 'Dept. of Pediatrics, AMC',
    price: 499,
    image: '/workshops/Pediatrics.png'
  },
  {
    id: 'community',
    _id: 'community',
    title: 'Community Medicine Workshop',
    category: 'Specialties',
    description: 'Training in community health assessment, epidemiology, and preventive medicine.',
    date: 'July 11-12, 2026',
    venue: 'AMCOSA',
    price: 349,
    image: '/workshops/Community_Medicine.png'
  },
  {
    id: 'fmt',
    _id: 'fmt',
    title: 'Forensic Medicine Workshop',
    category: 'Specialties',
    description: 'Hands-on forensic medicine, clinical toxicology, and basic autopsy observation.',
    date: 'July 10-13, 2026',
    venue: 'Mortuary, Dept. of FMT, AMC KGH',
    price: 649,
    image: '/workshops/Forensic_Medicine.png'
  },
  {
    id: 'medicine',
    _id: 'medicine',
    title: 'Medicine Workshop',
    category: 'Clinical',
    description: 'Comprehensive general medical skills, ECG analysis, and patient assessment training.',
    date: 'July 10, 2026',
    venue: 'AMCOSA',
    price: 399,
    image: '/workshops/Medicine.png'
  }
];

const WorkshopsPage: React.FC = () => {
  const navigate = useNavigate();
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>('All');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/workshops`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((w: any) => ({
            ...w,
            id: w.id || w._id
          }));
          setWorkshops(mapped);
        } else {
          setWorkshops(defaultWorkshops);
        }
      })
      .catch((err) => {
        console.warn('API down, using local fallback workshops data.', err);
        setWorkshops(defaultWorkshops);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const categories = ['All', ...Array.from(new Set(workshops.map(w => w.category || 'General')))];

  const filteredWorkshops = activeTab === 'All' 
    ? workshops 
    : workshops.filter(w => (w.category || 'General') === activeTab);

  return (
    <>
      <Helmet>
        <title>Workshops | ADHYAYAN 2026</title>
        <meta name="description" content="Join our specialized medical workshops at ADHYAYAN 2026. Learn from experts, gain hands-on experience, and enhance your medical skills." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-gradient-to-b from-white to-slate-50 text-slate-800 border-b border-slate-100 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.05),transparent_60%)] pointer-events-none"></div>
        <div className="container">
          <motion.div 
            className="max-w-3xl mx-auto text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-500/10 text-sky-600 text-xs font-semibold uppercase tracking-wider border border-sky-500/20">
                <Sparkles className="h-3.5 w-3.5" />
                Hands-on Training
              </span>
            </div>
            <h1 className="font-outfit font-extrabold text-5xl md:text-6xl text-slate-900">Specialized Medical Workshops</h1>
            <p className="text-lg text-slate-500 font-jakarta max-w-2xl mx-auto">
              Enhance your clinical dexterity and theoretical knowledge through intensive, hands-on sessions led by leading medical practitioners.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Workshops List */}
      <section className="section bg-white">
        <div className="container">
          <SectionTitle
            subtitle="Learning Opportunities"
            title="Explore Workshops"
            alignment="center"
          />

          {/* Category tabs */}
          <div className="flex justify-center gap-3 mt-10 mb-12 flex-wrap">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl font-montserrat text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-lg shadow-cyan-500/20 border border-cyan-400/20'
                    : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid cards */}
          {isLoading ? (
            <div className="flex flex-col justify-center items-center py-20 gap-4">
              <motion.svg
                width="120"
                height="60"
                viewBox="0 0 120 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-sky-600 drop-shadow-md"
              >
                <motion.path
                  d="M 0 30 L 30 30 L 40 10 L 60 50 L 80 10 L 90 30 L 120 30"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0.2 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "loop"
                  }}
                />
              </motion.svg>
              <p className="text-sky-600 font-montserrat font-semibold animate-pulse">Loading Workshops...</p>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
            >
              <AnimatePresence mode="popLayout">
                {filteredWorkshops.map((workshop) => (
                  <motion.div
                    key={workshop.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="flex justify-center w-full max-w-sm"
                    style={{ perspective: "1000px" }}
                  >
                    <InteractiveTravelCard
                      title={workshop.title}
                      subtitle={`${workshop.date || 'Multiple Dates'} | ${workshop.venue}`}
                      imageUrl={workshop.image}
                      actionText={`Register - ₹${workshop.price}`}
                      href={`/workshops/${workshop.id || workshop._id}`}
                      onActionClick={() => {
                        navigate(`/workshops/${workshop.id || workshop._id}`);
                      }}
                      className="w-full"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Guidelines Section */}
      <section className="section bg-slate-50 border-t border-slate-100">
        <div className="container max-w-4xl">
          <SectionTitle
            subtitle="Important Information"
            title="Workshop Guidelines"
            alignment="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card p-8 bg-white border border-slate-200/60 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="h-6 w-6 text-sky-600" />
                <h3 className="text-xl font-outfit font-bold text-slate-900">What to Bring</h3>
              </div>
              <ul className="space-y-4 text-slate-500 text-sm font-jakarta">
                <li className="flex items-start">
                  <ShieldCheck className="h-5 w-5 text-sky-600 shrink-0 mr-3" />
                  <span>Valid college ID proof and registration confirmation slip.</span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-5 w-5 text-sky-600 shrink-0 mr-3" />
                  <span>Notebook, clinical aprons, and writing instruments.</span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-5 w-5 text-sky-600 shrink-0 mr-3" />
                  <span>Any department-specific diagnostic tool kits (if notified).</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card p-8 bg-white border border-slate-200/60 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="h-6 w-6 text-sky-600" />
                <h3 className="text-xl font-outfit font-bold text-slate-900">Workshop Policies</h3>
              </div>
              <ul className="space-y-4 text-slate-500 text-sm font-jakarta">
                <li className="flex items-start">
                  <ShieldCheck className="h-5 w-5 text-sky-600 shrink-0 mr-3" />
                  <span>100% active attendance is mandatory for cert issuance.</span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-5 w-5 text-sky-600 shrink-0 mr-3" />
                  <span>Batch re-allocations are subject to seat availability constraints.</span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-5 w-5 text-sky-600 shrink-0 mr-3" />
                  <span>Cancellation refunds are subject to standard cancellation policies.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkshopsPage;
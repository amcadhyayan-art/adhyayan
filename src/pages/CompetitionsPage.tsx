import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Video, MessageSquare, PenTool, Brain, Search, Presentation, Trophy, Calendar, Users, Clock, MapPin, X, Phone, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { InteractiveTravelCard } from '../components/ui/3d-card';
import SectionTitle from '../components/ui/SectionTitle';
import RegistrationModal from '../components/RegistrationModal';
import { API_BASE_URL } from '../config';

interface Competition {
  id: string;
  title: string;
  category?: string;
  icon: JSX.Element;
  description: string;
  image: string;
  details: {
    rules: string[];
    eligibility?: string[];
    guidelines?: string[];
    contact?: {
      name: string;
      phone: string;
    };
    date?: string;
    fee?: string;
    venue?: string;
    topic?: string;
    theme?: string;
    judgingCriteria?: string[]; 
    topics?: string[];
    awards?: string[];
  };
}

const defaultCompetitions: any[] = [
  {
    id: 'build-diagnosis',
    _id: 'build-diagnosis',
    title: 'Build the Diagnosis',
    category: 'Competitions',
    description: 'A case-based diagnostic puzzle combining patient history, clinical signs, lab results, and logical reasoning.',
    image: '/competitions/Diagnosis.png',
    details: {
      rules: [
        'All UG students can participate (including interns)',
        'A team must consist of exactly four members',
        'Case-based diagnostic rounds and rapid-fire challenges',
        'Tests quick clinical decision-making, history matching, and diagnostic reasoning',
      ],
      fee: '100/-',
      contact: {
        name: 'Harikrishna',
        phone: '+91 91825 45949'
      }
    }
  },
  {
    id: 'debate',
    _id: 'debate',
    title: 'Medical Debate',
    category: 'Competitions',
    description: 'Engage in thought-provoking formal discussions and rebuttals on critical bioethical and medical topics.',
    image: '/competitions/Medical_debate.png',
    details: {
      rules: [
        'Three-round structured debate formats',
        'Opening statements: 3 minutes per team',
        'Cross-questioning and direct rebuttals: 4 minutes',
        'Closing remarks and audience interaction summary',
        'Respectful dialogue; personal attacks result in direct disqualification'
      ],
      guidelines: [
        'Judged on argumentation relevance, citation of studies, delivery, and structure'
      ],
      contact: {
        name: 'Jaideep',
        phone: '+91 90102 38700'
      },
      topic: 'Euthanasia: Compassionate Choice or Moral Misstep'
    }
  },
  {
    id: 'essay',
    _id: 'essay',
    title: 'Essay Writing',
    category: 'Competitions',
    description: 'Express your insights on contemporary medical challenges through academically rigorous and compelling essays.',
    image: '/competitions/essaywriting.png',
    details: {
      topic: 'De-Stigmatising the Demon: Reframing HIV Beyond Fear and Prejudice',
      contact: {
        name: 'Renuka Priya',
        phone: '+91 95738 70164'
      },
      rules: [
        'Essay must be written between 1000 - 1500 words',
        'Formatting should align with standardized MLA guidelines for citations',
        'Plagiarism of any form leads to instant disqualification',
      ],
    }
  },
  {
    id: 'reels',
    _id: 'reels',
    title: 'Medical Reels',
    category: 'Competitions',
    description: 'Create engaging, informative, and visually stunning short-form social video content explaining medical phenomena.',
    image: '/competitions/Medical_Reels.png',
    details: {
      rules: [
        'Pure vector animations are not accepted; must involve live presentation/acting',
        'Abusive language, copyrighted music, and censored material strictly prohibited',
        'Top 3 selected films will be screened live during Movie Night (14th July)',
        'All final reel file submissions must be completed by 11th July'
      ],
      guidelines: [
        'Judged on conceptual accuracy, acting/expression, sound clarity, and cinematography'
      ],
      contact: {
        name: 'Atchuth Ram',
        phone: '+91 85238 63076'
      }
    }
  },
  {
    id: 'seminar',
    _id: 'seminar',
    title: 'Integrated Seminar',
    category: 'Competitions',
    description: 'Present clinical cases and explain complex medical topics from pathophysiological mechanism to clinical management.',
    image: '/competitions/Seminar.png',
    details: {
      rules: [
        'Presentations must follow the recommended structured formatting',
        'A maximum of 10 slides is permitted (excluding title and reference slide)',
        'Utilisation of visual models, flowcharts, and diagrams is highly encouraged',
        'Registration fee: ₹100'
      ],
      guidelines: [
        'Slide 1: Title and clinical vignette overview',
        'Slide 2-3: Pathophysiology (molecular/cellular models)',
        'Slide 4: Clinical Presentation (symptomatology, examination)',
        'Slide 5: Diagnostic investigations with clinical rationale',
        'Slide 6-7: Therapeutic management (evidence-based updates)',
        'Slide 8: Crucial clinical takeaways',
        'Slide 9: References'
      ],
      judgingCriteria: [
        'Scientific accuracy & literature citation depth - 10 marks',
        'Integration of pathophysiology with management outcomes - 10 marks',
        'Clarity, visual appeal, & slide layout - 10 marks',
        'Time adherence & public speaking delivery - 10 marks',
        'Handling Q&A jury questions - 10 marks'
      ],
      topics: [
        'Chronic Kidney Disease (CKD)',
        'Ischemic Stroke Pathophysiology',
        'Diabetes Mellitus & Microvascular Complications',
        'Hypo- and Hyperthyroidism Emergency Care',
        'Acute Kidney Injury (AKI) in Critically Ill Patients',
        'Gastrointestinal Bleed Management',
        'Rheumatoid Arthritis Immunotherapy',
        'Hypertensive Urgency and Emergency care',
        'ACS Timeline Guidelines',
        'SLE Pathophysiology'
      ],
      contact: {
        name: 'Shubham',
        phone: '+91 88856 60398'
      },
      awards: [
        'Best Integrated Seminar Presentation - Trophy & Cash Awards'
      ]
    }
  },
  {
    id: 'photography',
    _id: 'photography',
    title: 'Photography Competition',
    category: 'Competitions',
    description: 'Capture the essence of college life, medical heritage, and campus beauty through your photography lens.',
    image: '/competitions/Photography.png',
    details: {
      theme: 'Our Heritage & Campus Life',
      rules: [
        'Submissions must include a 2-line conceptual description',
        'All photographs must be captured on-campus during the fest week',
        'Images must remain unedited (no heavy manipulation/compositing)',
        'Final submissions must be uploaded by 11th July'
      ],
      contact: {
        name: 'Farooq',
        phone: '+91 93928 03340'
      }
    }
  }
];

const CompetitionsPage: React.FC = () => {
  const location = useLocation();
  const [selectedCompetition, setSelectedCompetition] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Initialize active tab from URL query params or default to 'All'
  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get('category');
  const [activeTab, setActiveTab] = useState<string>(categoryFromUrl || 'All');

  const [competitions, setCompetitions] = useState<any[]>(defaultCompetitions);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  // Update active tab if URL changes while on the same page
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat) {
      setActiveTab(cat);
    } else {
      setActiveTab('All');
    }
  }, [location.search]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/competitions`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const getIcon = (id: string, category: string) => {
            const normId = id?.toLowerCase() || '';
            if (normId.includes('diagnosis')) return <Brain className="h-6 w-6" />;
            if (normId.includes('debate')) return <MessageSquare className="h-6 w-6" />;
            if (normId.includes('essay')) return <PenTool className="h-6 w-6" />;
            if (normId.includes('reel') || normId.includes('video')) return <Video className="h-6 w-6" />;
            if (normId.includes('seminar') || normId.includes('presentation')) return <Presentation className="h-6 w-6" />;
            if (normId.includes('photo') || normId.includes('camera')) return <Camera className="h-6 w-6" />;
            return <Brain className="h-6 w-6" />;
          };

          // Map MongoDB _id to id if missing for backwards compatibility in modal triggers
          const mapped = data.map((c: any) => {
            const localId = c.id || c._id;
            const localFallback = defaultCompetitions.find(d => d.id === localId || d.id === c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
            
            return {
              ...c,
              id: localId,
              icon: localFallback?.icon || getIcon(localId, c.category || 'Scientific'),
              details: {
                rules: c.rules && c.rules.length > 0 ? c.rules : (localFallback?.details?.rules || []),
                guidelines: c.guidelines && c.guidelines.length > 0 ? c.guidelines : (localFallback?.details?.guidelines || []),
                topics: c.topics && c.topics.length > 0 ? c.topics : (localFallback?.details?.topics || []),
                judgingCriteria: c.judgingCriteria && c.judgingCriteria.length > 0 ? c.judgingCriteria : (localFallback?.details?.judgingCriteria || []),
                fee: c.price !== undefined ? `${c.price}/-` : (localFallback?.details?.fee || '100/-'),
                topic: c.topics && c.topics.length > 0 ? c.topics[0] : (localFallback?.details?.topic || ''),
                contact: c.contacts && c.contacts.length > 0 ? c.contacts[0] : (localFallback?.details?.contact || null)
              }
            };
          });
          setCompetitions(mapped);
        }
      })
      .catch((err) => {
        console.warn('API down, using local fallback competitions data.', err);
      });
  }, []);

  const categories = ['All', ...Array.from(new Set(competitions.map(c => c.category || 'General')))];

  const filteredCompetitions = competitions.filter(comp => {
    const matchesSearch = comp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          comp.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'All' || (comp.category || 'General') === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <>
      <Helmet>
        <title>Competitions | ADHYAYAN 2026</title>
        <meta name="description" content="Participate in various medical competitions at ADHYAYAN 2026. Showcase your skills, win prizes, and gain recognition." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-gradient-to-b from-white to-slate-50 text-slate-800 border-b border-slate-100 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.05),transparent_60%)] pointer-events-none"></div>
        <div className="container">
          <motion.div 
            className="max-w-3xl mx-auto text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-500/10 text-sky-600 text-xs font-semibold uppercase tracking-wider border border-sky-500/20">
                <Sparkles className="h-3.5 w-3.5 text-sky-600" />
                Compete & Conquer
              </span>
            </div>
            <h1 className="font-outfit font-extrabold text-5xl md:text-6xl text-slate-900">Medical Competitions</h1>
            <p className="text-lg text-slate-500 font-jakarta max-w-2xl mx-auto">
              Test your clinical acumen, bioethical reasoning, creative media production, or scientific writing alongside scholars from all over the country.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section bg-white" id="events-grid">
        <div className="container">
          <SectionTitle
            subtitle="Showcase Your Talent"
            title="Featured Events"
            alignment="center"
          />

          {/* Search and Filters Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-12 mb-12 max-w-4xl mx-auto">
            {/* Filter Tabs */}
            <div className="flex gap-2.5 flex-wrap">
              {categories.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4.5 py-2 rounded-xl font-montserrat text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-lg shadow-pink-500/20 border border-pink-400/20'
                      : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search competitions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all duration-300"
              />
            </div>
          </div>

          {/* Competitions Grid - 3D Cards */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
          >
            <AnimatePresence mode="popLayout">
              {filteredCompetitions.map((competition) => (
                <motion.div
                  key={competition.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="flex justify-center w-full max-w-sm"
                  style={{ perspective: "1000px" }}
                >
                  <InteractiveTravelCard
                    title={competition.title}
                    subtitle={competition.category}
                    imageUrl={competition.image}
                    actionText="View Event Info"
                    href="#"
                    onActionClick={() => setSelectedCompetition(competition)}
                    className="w-full"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Competition Details Modal */}
      <AnimatePresence>
        {selectedCompetition && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCompetition(null)}
              className="absolute inset-0 bg-white/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto relative z-10 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCompetition(null)}
                className="absolute right-5 top-5 p-2 bg-slate-100 hover:bg-slate-200 rounded-full border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors z-10"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-8 space-y-8">
                {/* Header */}
                <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
                  <div className="p-3.5 rounded-2xl bg-sky-500/10 text-sky-600 border border-sky-500/20 shadow-sm">
                    {selectedCompetition.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{selectedCompetition.category} Competition</span>
                    <h3 className="text-2xl md:text-3xl font-outfit font-extrabold text-slate-900 mt-1">
                      {selectedCompetition.title}
                    </h3>
                  </div>
                </div>

                {/* Topic / Theme if applicable */}
                {selectedCompetition.details.topic && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-sky-600 mb-1">Competition Topic</span>
                    <p className="text-slate-800 font-montserrat font-semibold text-sm leading-relaxed">{selectedCompetition.details.topic}</p>
                  </div>
                )}

                {/* Topics Array (integrated seminar) */}
                {selectedCompetition.details.topics && (
                  <div className="space-y-3">
                    <h4 className="font-outfit font-bold text-lg text-slate-900 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-sky-600" />
                      Suggested Seminar Topics
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1 bg-slate-50 rounded-xl border border-slate-100">
                      {selectedCompetition.details.topics.map((topic: string, index: number) => (
                        <div key={index} className="flex items-center text-xs text-slate-600 font-jakarta p-2.5 hover:bg-slate-100 rounded-lg">
                          <span className="h-1.5 w-1.5 bg-pink-500 rounded-full mr-2.5 shrink-0"></span>
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rules */}
                {selectedCompetition.details.rules && (
                  <div className="space-y-3.5">
                    <h4 className="font-outfit font-bold text-lg text-slate-900 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-sky-600" />
                      Rules & Regulations
                    </h4>
                    <ul className="space-y-3 text-sm text-slate-500 font-jakarta">
                      {selectedCompetition.details.rules.map((rule: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="h-2 w-2 bg-sky-600 rounded-full mr-3 mt-1.5 shrink-0"></span>
                          <span className="leading-relaxed">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Guidelines */}
                {selectedCompetition.details.guidelines && (
                  <div className="space-y-3.5">
                    <h4 className="font-outfit font-bold text-lg text-slate-900 flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-sky-600" />
                      Guidelines & Evaluation
                    </h4>
                    <ul className="space-y-3 text-sm text-slate-500 font-jakarta">
                      {selectedCompetition.details.guidelines.map((guideline: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="h-2 w-2 bg-sky-500 rounded-full mr-3 mt-1.5 shrink-0"></span>
                          <span className="leading-relaxed">{guideline}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Judging Criteria */}
                {selectedCompetition.details.judgingCriteria && (
                  <div className="space-y-3.5">
                    <h4 className="font-outfit font-bold text-lg text-slate-900 flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-sky-600" />
                      Judging Matrix (Jury Scores)
                    </h4>
                    <ul className="space-y-2.5 text-sm text-slate-500 font-jakarta">
                      {selectedCompetition.details.judgingCriteria.map((criteria: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="h-2 w-2 bg-sky-600 rounded-full mr-3 mt-1.5 shrink-0"></span>
                          <span>{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Registration Fee */}
                {selectedCompetition.details.fee && (
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-sm font-semibold text-slate-500 font-jakarta">Reg Fee</span>
                    <span className="text-2xl font-extrabold text-sky-600 font-outfit">₹{selectedCompetition.details.fee}</span>
                  </div>
                )}

                {/* Contact & Registration Footer */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
                  {selectedCompetition.details.contact && (
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-full bg-slate-100 border border-slate-200 text-sky-600">
                        <Phone className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase font-bold text-slate-500">Coordinator</span>
                        <a 
                          href={`tel:${selectedCompetition.details.contact.phone}`}
                          className="text-sm font-semibold text-slate-600 hover:text-sky-600 transition-colors"
                        >
                          {selectedCompetition.details.contact.name}: {selectedCompetition.details.contact.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={() => setRegisterModalOpen(true)}
                    className="w-full sm:w-auto btn-primary px-8 py-3 text-sm"
                  >
                    Register For Event
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {selectedCompetition && (
        <RegistrationModal
          isOpen={registerModalOpen}
          onClose={() => setRegisterModalOpen(false)}
          preSelectedType="competition"
          preSelectedItem={selectedCompetition}
        />
      )}

      {/* Rewards Section */}
      <section className="section bg-slate-50 border-t border-slate-100">
        <div className="container">
          <SectionTitle
            subtitle="Rewards"
            title="Prizes & Recognition"
            alignment="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            {['First', 'Second', 'Third'].map((position, index) => (
              <motion.div
                key={position}
                className="card p-8 text-center bg-white border border-slate-200/60 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
              >
                <div className="flex justify-center mb-6">
                  <div className={`p-4 rounded-2xl bg-slate-50 border border-slate-100 ${
                    index === 0 ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.3)]' : 
                    index === 1 ? 'text-slate-600 drop-shadow-[0_0_8px_rgba(203,213,225,0.3)]' : 
                    'text-amber-600 drop-shadow-[0_0_8px_rgba(217,119,6,0.3)]'
                  }`}>
                    <Trophy className="h-10 w-10" />
                  </div>
                </div>
                <h3 className="text-xl font-outfit font-bold mb-3 text-slate-900">{position} Place</h3>
                <p className="text-sm text-slate-500 font-jakarta leading-relaxed">
                  {index === 0 ? 'Exquisite Winner Trophy + Cert of Merit + Cash Award' :
                   index === 1 ? 'Runner Medal + Cert of Merit + Cash Award' :
                   'Podium Medal + Cert of Merit + Cash Award'}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-slate-50 text-slate-800 text-center border-t border-b border-slate-250/60">
        <div className="container max-w-2xl space-y-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-outfit font-extrabold text-slate-900 leading-tight">
            Ready to Showcase Your Talent?
          </h2>
          <p className="text-slate-500 font-jakarta text-sm leading-relaxed max-w-lg mx-auto">
            Limited slots are available for active registrations. Coordinate with coordinators to lock in your slot.
          </p>
          <div className="pt-2">
            <button 
              onClick={() => {
                document.getElementById('events-grid')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary px-8 py-3.5 text-white"
            >
              Secure Registration slot
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CompetitionsPage;

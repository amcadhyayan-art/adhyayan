import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ShieldCheck, Scale, FileText, HelpCircle } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';

const TermsAndConditionsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | ADHYAYAN 2026</title>
        <meta name="description" content="Read the official terms and conditions for ADHYAYAN 2026, the medical symposium and innovation summit hosted by Andhra Medical College." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-white to-slate-50 text-slate-800 border-b border-slate-100">
        <div className="container">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-montserrat font-bold text-slate-900 mb-6">Terms & Conditions</h1>
            <p className="text-xl text-slate-500">
              Please review the terms and conditions governing participation in ADHYAYAN 2026.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-slate max-w-none space-y-8 text-slate-600"
            >
              <div className="card p-8 bg-white border border-slate-100 shadow-sm rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="h-6 w-6 text-sky-600" />
                  <h2 className="text-2xl font-montserrat font-bold text-slate-900 m-0">1. Acceptance of Terms</h2>
                </div>
                <p className="leading-relaxed">
                  By registering for, accessing, or participating in ADHYAYAN 2026 (hereafter referred to as "the Symposium", "the Event"), organized by Andhra Medical College, Visakhapatnam, you agree to be bound by these Terms and Conditions. If you do not agree, you should not register or participate.
                </p>
              </div>

              <div className="card p-8 bg-white border border-slate-100 shadow-sm rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="h-6 w-6 text-sky-600" />
                  <h2 className="text-2xl font-montserrat font-bold text-slate-900 m-0">2. Registration & Eligibility</h2>
                </div>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Registration is open to medical students, practitioners, researchers, and healthcare professionals.</li>
                  <li>All information provided during registration must be accurate, complete, and up-to-date.</li>
                  <li>The organizers reserve the right to verify credentials and disqualify registrations that contain false information.</li>
                  <li>Each registration is personal and non-transferable unless explicitly approved by the organizing committee.</li>
                </ul>
              </div>

              <div className="card p-8 bg-white border border-slate-100 shadow-sm rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="h-6 w-6 text-sky-600" />
                  <h2 className="text-2xl font-montserrat font-bold text-slate-900 m-0">3. Code of Conduct</h2>
                </div>
                <p className="leading-relaxed">
                  Attendees are expected to behave professionally and respectfully during all sessions, workshops, and competitions. Any form of harassment, disruption, or academic dishonesty (e.g., plagiarism in competitions) will lead to immediate expulsion from the event and potential academic or legal action.
                </p>
              </div>

              <div className="card p-8 bg-white border border-slate-100 shadow-sm rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <HelpCircle className="h-6 w-6 text-sky-600" />
                  <h2 className="text-2xl font-montserrat font-bold text-slate-900 m-0">4. Liability & Intellectual Property</h2>
                </div>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The organizers are not responsible for any personal injury, loss, or damage to personal property during the physical event.</li>
                  <li>All materials presented at ADHYAYAN 2026, including presentations, abstracts, and designs, remain the intellectual property of their respective authors or organizers. Unauthorized reproduction is strictly prohibited.</li>
                  <li>The schedule, guest speakers, and specific event details are subject to change. The organizing committee will notify registered participants of any significant changes via email or the official website.</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsAndConditionsPage;

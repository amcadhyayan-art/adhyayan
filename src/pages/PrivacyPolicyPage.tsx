import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Lock, Eye, CheckCircle, Database } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | ADHYAYAN 2026</title>
        <meta name="description" content="Read the privacy policy for ADHYAYAN 2026 to understand how we collect, use, and protect your personal data." />
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
            <h1 className="font-montserrat font-bold text-slate-900 mb-6">Privacy Policy</h1>
            <p className="text-xl text-slate-500">
              We value your privacy. Read about how we manage and safeguard your personal information.
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
                  <Database className="h-6 w-6 text-sky-600" />
                  <h2 className="text-2xl font-montserrat font-bold text-slate-900 m-0">1. Information We Collect</h2>
                </div>
                <p className="leading-relaxed mb-4">
                  We collect personal information that you voluntarily provide to us when registering for the Symposium, subscribing to newsletters, or contacting us. This includes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li><strong>Personal details:</strong> Name, age, gender, medical registration number (if applicable).</li>
                  <li><strong>Contact details:</strong> Email address, mobile phone number.</li>
                  <li><strong>Academic details:</strong> Institution/College name, course of study, batch/year.</li>
                  <li><strong>Payment information:</strong> Transaction ID, bank receipt, and billing details (payment details are handled securely by third-party processors).</li>
                </ul>
              </div>

              <div className="card p-8 bg-white border border-slate-100 shadow-sm rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="h-6 w-6 text-sky-600" />
                  <h2 className="text-2xl font-montserrat font-bold text-slate-900 m-0">2. How We Use Your Information</h2>
                </div>
                <p className="leading-relaxed mb-4">
                  The collected data is used exclusively to facilitate and improve your experience at the event, specifically to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>Process registrations, verify credentials, and issue delegate badges.</li>
                  <li>Send updates, confirmations, schedule changes, and event-related newsletters.</li>
                  <li>Coordinate accommodation, workshop seat assignments, and certificates of participation.</li>
                  <li>Analyze aggregate demographics to improve future editions of ADHYAYAN.</li>
                </ul>
              </div>

              <div className="card p-8 bg-white border border-slate-100 shadow-sm rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="h-6 w-6 text-sky-600" />
                  <h2 className="text-2xl font-montserrat font-bold text-slate-900 m-0">3. Data Security & Sharing</h2>
                </div>
                <p className="leading-relaxed">
                  We implement high-standard security measures to safeguard your personal data. We do not sell, rent, or trade your personal information to third parties. Data is shared with third parties only when necessary to process payments or if required by law.
                </p>
              </div>

              <div className="card p-8 bg-white border border-slate-100 shadow-sm rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-sky-600" />
                  <h2 className="text-2xl font-montserrat font-bold text-slate-900 m-0">4. Your Consent & Rights</h2>
                </div>
                <p className="leading-relaxed">
                  By using our website and registering for ADHYAYAN 2026, you consent to the collection and use of your details as specified in this Privacy Policy. You have the right to request access to the data we hold about you or request correction/deletion of your details by contacting our team.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicyPage;

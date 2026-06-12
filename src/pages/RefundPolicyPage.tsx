import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, XCircle, Info } from 'lucide-react';

const RefundPolicyPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Refund & Return Policy | ADHYAYAN 2026</title>
        <meta name="description" content="Read the refund, cancellation, and return policy for ADHYAYAN 2026 registration and services." />
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
            <h1 className="font-montserrat font-bold text-slate-900 mb-6">Refund & Return Policy</h1>
            <p className="text-xl text-slate-500">
              Information regarding registration fees, cancellations, and returns.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8 text-slate-600"
            >
              {/* Highlight box */}
              <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-amber-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-montserrat font-semibold text-amber-800 mb-1">Strict No-Refund Policy</h3>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    Please note that registrations for ADHYAYAN 2026, including all events, workshops, accommodation bookings, and competitions, are strictly <strong>non-refundable</strong> and <strong>non-cancellable</strong>.
                  </p>
                </div>
              </div>

              <div className="card p-8 bg-white border border-slate-100 shadow-sm rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <XCircle className="h-6 w-6 text-red-500" />
                  <h2 className="text-xl font-montserrat font-bold text-slate-900 m-0">No Refunds & Cancellations</h2>
                </div>
                <p className="leading-relaxed mb-4">
                  Once registration is completed and payment is successfully processed, the registration fee cannot be refunded under any circumstances. This includes, but is not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>Inability to attend the symposium or any associated events.</li>
                  <li>Double payment or duplicate registrations due to user errors.</li>
                  <li>Personal emergencies, travel changes, or academic scheduling conflicts.</li>
                  <li>Cancellation of specific workshops or changes in speaker line-ups.</li>
                </ul>
              </div>

              <div className="card p-8 bg-white border border-slate-100 shadow-sm rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <RefreshCw className="h-6 w-6 text-sky-600" />
                  <h2 className="text-xl font-montserrat font-bold text-slate-900 m-0">Transfers & Substitutions</h2>
                </div>
                <p className="leading-relaxed">
                  While refund requests will not be entertained, tickets/registrations may be transferred to another eligible individual (e.g., another medical student from the same institution) upon formal request. To request a registration transfer, please contact the organizing committee at <a href="mailto:andhramedicalcollege100@gmail.com" className="text-sky-600 hover:underline">andhramedicalcollege100@gmail.com</a> at least <strong>48 hours prior</strong> to the start of the event.
                </p>
              </div>

              <div className="card p-8 bg-white border border-slate-100 shadow-sm rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Info className="h-6 w-6 text-sky-600" />
                  <h2 className="text-xl font-montserrat font-bold text-slate-900 m-0">Event Postponement or Cancellation</h2>
                </div>
                <p className="leading-relaxed">
                  In the extremely rare event that ADHYAYAN 2026 is fully cancelled or postponed by Andhra Medical College due to force majeure (acts of God, government regulations, natural disasters), details regarding the credit toward the rescheduled event dates or alternative options will be communicated directly to all registered delegates.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RefundPolicyPage;

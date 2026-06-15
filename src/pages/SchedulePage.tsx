import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';

interface Session {
  time: string;
  events: string[];
}

interface DaySchedule {
  date: string;
  title?: string;
  sessions: Session[];
}

const SchedulePage: React.FC = () => {
  const scheduleData: Record<string, DaySchedule> = {
    day1: {
      date: '9',
      title: 'July 9 - Thursday',
      sessions: [
        { time: 'Morning (9AM-12PM)', events: [] },
        { time: 'Afternoon', events: ['FLASH MOB'] }
      ]
    },
    day2: {
      date: '10',
      title: 'July 10 - Friday',
      sessions: [
        { time: 'Morning', events: ['MEDICINE', 'SURGERY', 'OPTHA', 'BUILD THE DIAGNOSIS'] },
        { time: 'Afternoon', events: ['MEDICINE', 'SURGERY', 'FMT', 'CASE PRESENTATION', 'PAPER PRESENTATION'] }
      ]
    },
    day3: {
      date: '11',
      title: 'July 11 - Saturday',
      sessions: [
        { time: 'Morning', events: ['PAEDIATRICS', 'SPM', 'OBGYN-1', 'ANAESTHESIA', 'RESPIRATORY MEDICINE', 'SEMINAR PRESENTATION', 'ESSAY WRITING'] },
        { time: 'Afternoon', events: ['PAEDIATRICS', 'FMT', 'OBGYN-2', 'ANAESTHESIA', 'PLASTIC SURGERY', 'POSTER PRESENTATION', 'HISTO-RANGOLI'] }
      ]
    },
    day4: {
      date: '12',
      title: 'July 12 - Sunday',
      sessions: [
        { time: 'Morning & Afternoon', events: ['MED HUNT'] }
      ]
    },
    day5: {
      date: '13',
      title: 'July 13 - Monday',
      sessions: [
        { time: 'Morning', events: ['SURGERY', 'ORTHOPEDICS', 'ENT', 'SPM', 'OPTHALMOLOGY', 'GASTROENTEROLGY', 'NEUROLOGY'] },
        { time: 'Afternoon', events: ['SURGERY', 'ORTHOPEDICS', 'FMT', 'OBGYN-1', 'DEBATE', 'ANTHYAKSHARI'] }
      ]
    },
    day6: {
      date: '14',
      title: 'July 14 - Tuesday',
      sessions: [
        { time: 'Morning', events: ['SURGERY', 'ANAESTHESIA', 'ENT', 'OBGYN-2', 'SPELL-BEE'] },
        { time: 'Afternoon', events: ['ANAESTHESIA', 'FMT', 'CONCERT(EVENING)'] }
      ]
    },
    day7: {
      date: '15',
      title: 'July 15 - Wednesday',
      sessions: [
        { time: 'Morning', events: ['RADIOLOGY', 'NEUROSURGERY'] },
        { time: 'Afternoon', events: ['PATHOLOGY & MICROBIOLOGY', 'MOVIE NIGHT'] }
      ]
    },
    day8: {
      date: '16',
      title: 'July 16 - Thursday',
      sessions: [
        { time: 'Morning & Afternoon', events: ['VALEDICTORY CEREMONY'] }
      ]
    }
  };

  return (
    <>
      <Helmet>
        <title>Schedule | Adhyayan 2026</title>
        <meta name="description" content="Detailed schedule of workshops, competitions, and events at MED HUNT 2026." />
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
            <h1 className="font-montserrat font-bold text-slate-900 mb-6">ADHYAYAN Schedule</h1>
            <p className="text-xl text-slate-500">
              Six days of learning, innovation, and celebration
            </p>
          </motion.div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {Object.entries(scheduleData).map(([day, data], index) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="mb-12 last:mb-0"
              >
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 bg-accent/10 rounded-2xl flex items-center justify-center">
                    <span className="text-4xl font-bold text-accent">{data.date}</span>
                  </div>
                  <div>
                    {data.title && (
                      <h2 className="text-3xl font-bold text-primary mb-2">{data.title}</h2>
                    )}
                  </div>
                </div>

                {data.sessions.map((session, sessionIndex) => (
                  <div key={sessionIndex} className="card p-6 mb-6 last:mb-0 bg-white border-slate-100 shadow-sm border border-slate-100">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-accent mr-2" />
                        <span className="font-medium">{session.time}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {session.events.map((event, i) => (
                          <div key={i} className="flex items-center bg-white/5 border border-slate-100 rounded-lg p-3">
                            <span className="h-2 w-2 bg-accent rounded-full mr-3"></span>
                            <span className="text-slate-800">{event}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="section bg-slate-50 border-t border-b border-slate-100">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              subtitle="Important Information"
              title="Event Guidelines"
              alignment="center"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="card p-6 bg-white border-slate-100 shadow-sm border border-slate-100">
                <h3 className="font-montserrat font-semibold mb-4">Venue Information</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-accent mr-3 mt-1" />
                    <p className="text-slate-500">All venues are within the AMC campus</p>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-5 w-5 text-accent mr-3 mt-1" />
                    <p className="text-slate-500">Follow signage for easy navigation</p>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-accent mr-3 mt-1" />
                    <p className="text-slate-500">Help desk available throughout the event</p>
                  </li>
                </ul>
              </div>

              <div className="card p-6 bg-white border-slate-100 shadow-sm border border-slate-100">
                <h3 className="font-montserrat font-semibold mb-4">Registration & Check-in</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Calendar className="h-5 w-5 text-accent mr-3 mt-1" />
                    <p className="text-slate-500">Register for specific workshops in advance</p>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-5 w-5 text-accent mr-3 mt-1" />
                    <p className="text-slate-500">Bring valid ID and registration confirmation</p>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-accent mr-3 mt-1" />
                    <p className="text-slate-500">Arrive 15 minutes before scheduled events</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
            Download Schedule
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-slate-300">
            Get the complete schedule on your device for offline access
          </p>
          <a
            href="https://drive.google.com/file/d/1HqNgHpxbeXy_EGfcB2nTaSNExgR0e3Ni/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn-primary text-white">
              Download PDF Schedule
            </button>
          </a>
        </div>
      </section>

    </>
  );
};

export default SchedulePage;

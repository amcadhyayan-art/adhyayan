import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  image: string;
  link: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  date,
  image,
  link,
}) => {
  // 3D Tilt Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const { width, height, left, top } = rect;
    const mouseXVal = e.clientX - left;
    const mouseYVal = e.clientY - top;
    const xPct = mouseXVal / width - 0.5;
    const yPct = mouseYVal / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="w-full rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col h-[28rem]"
    >
      <div 
        style={{ transform: "translateZ(30px)" }} 
        className="relative h-48 overflow-hidden shrink-0"
      >
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
        <div className="absolute bottom-4 left-4 flex items-center text-sky-600 text-xs font-semibold uppercase tracking-wider font-montserrat bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/50 shadow-sm">
          <Calendar className="h-3.5 w-3.5 mr-1.5 text-sky-600" />
          <span>{date}</span>
        </div>
      </div>
      
      <div 
        style={{ transform: "translateZ(20px)" }}
        className="p-6 flex-grow flex flex-col bg-white"
      >
        <h3 className="font-outfit font-bold text-xl mb-3 text-slate-900 hover:text-sky-600 transition-colors">
          {title}
        </h3>
        <p className="text-slate-500 text-sm mb-6 flex-grow font-jakarta leading-relaxed">
          {description}
        </p>
        <Link 
          to={link} 
          className="mt-auto inline-flex items-center text-sky-600 hover:text-sky-700 font-semibold text-sm transition-all hover:translate-x-1"
        >
          Explore Details
          <ArrowRight className="ml-1.5 h-4 w-4 text-sky-600" />
        </Link>
      </div>
    </motion.div>
  );
};

export default EventCard;
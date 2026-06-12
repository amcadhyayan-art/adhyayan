import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, SkipForward } from 'lucide-react';

interface SplashVideoProps {
  onComplete: () => void;
}

const SplashVideo: React.FC<SplashVideoProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  const dismiss = () => {
    setExiting(true);
    setTimeout(onComplete, 700);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start muted so browser allows autoplay
    video.muted = true;
    video.volume = 1;

    video.play().then(() => {
      // Video is now playing — immediately unmute for sound
      video.muted = false;
      setMuted(false);
    }).catch(() => {
      // Autoplay failed entirely — still try muted
      video.muted = true;
      setMuted(true);
      video.play().catch(() => {/* silently fail */});
    });

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', dismiss);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', dismiss);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          {/* Video */}
          <video
            ref={videoRef}
            src="/logoanimation.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark vignette edges */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />

          {/* Controls bar */}
          <div className="absolute bottom-6 left-0 right-0 px-6 flex items-center gap-4 z-10">
            {/* Progress bar */}
            <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Mute toggle */}
            <button
              onClick={toggleMute}
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
              aria-label={muted ? 'Unmute' : 'Mute'}
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Skip button */}
            <button
              onClick={dismiss}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold font-montserrat uppercase tracking-wider hover:bg-white/20 transition-colors"
              aria-label="Skip intro"
            >
              Skip
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default SplashVideo;

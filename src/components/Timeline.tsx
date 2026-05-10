import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import cowBg from '../image/Cow1.png';

const milestones = [
  {
    id: 1,
    metadata: "Origin",
    title: "Sumba Valley - Verified Issuer #001",
    image: "https://picsum.photos/seed/nusa1/800/800",
    rotation: -2,
  },
  {
    id: 2,
    metadata: "Minting",
    title: "cNFT Minted - On-Chain Asset Identity",
    image: "https://picsum.photos/seed/nusa2/800/800",
    rotation: 1.5,
  },
  {
    id: 3,
    metadata: "Growth",
    title: "Proof of Growth - Weight 450kg Updated",
    image: "https://picsum.photos/seed/nusa3/800/800",
    rotation: -1.5,
  },
  {
    id: 4,
    metadata: "Settlement",
    title: "Profit Distribution - Vault Settlement",
    image: "https://picsum.photos/seed/nusa4/800/800",
    rotation: 2,
  },
];

export const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section 
      id="timeline" 
      className="py-20 md:py-24 text-[#234A2C] overflow-hidden relative bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${cowBg})` }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[#F4F0E7]/60 backdrop-blur-[2px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header section */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif mb-4"
          >
            Protocol Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg font-sans opacity-80"
          >
            A transparent, verifiable timeline of the livestock protocol.
          </motion.p>
        </div>

        {/* Timeline container */}
        <div className="relative" ref={containerRef}>

          {/* SVG Line for Desktop - Diberi z-0 agar di paling bawah */}
          <div className="absolute left-1/2 top-4 bottom-4 hidden md:block -translate-x-1/2 w-full max-w-4xl pointer-events-none z-0">
            <svg className="h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 1000" fill="none">
              <path
                d="M 500 0 C 700 0, 700 56, 500 106 C 100 206, 100 268, 500 368 C 900 468, 900 531, 500 631 C 100 731, 100 794, 500 894 C 700 944, 700 1000, 500 1000"
                vectorEffect="non-scaling-stroke"
                stroke="#6E8C68" strokeWidth="4" strokeDasharray="8 8" strokeOpacity="0.2"
              />
              <motion.path
                d="M 500 0 C 700 0, 700 56, 500 106 C 100 206, 100 268, 500 368 C 900 468, 900 531, 500 631 C 100 731, 100 794, 500 894 C 700 944, 700 1000, 500 1000"
                vectorEffect="non-scaling-stroke"
                stroke="#6E8C68"
                strokeWidth="4"
                strokeDasharray="8 8"
                style={{ pathLength }}
              />
            </svg>
          </div>

          {/* SVG Line for Mobile */}
          <div className="absolute left-6 top-0 bottom-0 md:hidden -translate-x-1/2 w-4 pointer-events-none z-0">
            <div className="h-full w-[2px] bg-[#6E8C68]/20 absolute left-1/2 -translate-x-1/2" />
            <motion.div
              style={{ scaleY: pathLength, originY: 0 }}
              className="h-full w-[2px] bg-[#6E8C68] absolute left-1/2 -translate-x-1/2"
            />
          </div>

          <div className="space-y-16 md:space-y-32 relative">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={milestone.id} className={`flex flex-col md:flex-row items-center md:justify-between w-full relative`}>

                  {/* Timeline Dot - Desktop - z-10 (di atas garis, di bawah kartu) */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.2 }}
                    className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#F4F0E7] border-4 border-[#6E8C68] z-10 items-center justify-center"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#234A2C]"></div>
                  </motion.div>

                  {/* Timeline Dot - Mobile */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.2 }}
                    className="flex md:hidden absolute left-6 -translate-x-1/2 w-5 h-5 rounded-full bg-[#F4F0E7] border-4 border-[#6E8C68] z-10 items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#234A2C]"></div>
                  </motion.div>

                  {/* Content Wrapper */}
                  <div className={`flex w-full ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>

                    <div className="hidden md:block md:w-5/12"></div>

                    {/* Polaroid Card Wrapper - Diberi z-30 agar menutupi garis & dot */}
                    <div className="w-full md:w-5/12 flex justify-start md:justify-center pl-12 md:pl-0 z-30">
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{
                          opacity: 1,
                          x: 0,
                          rotate: milestone.rotation
                        }}
                        whileHover={{ rotate: 0, scale: 1.05, zIndex: 50 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{
                          type: "spring",
                          stiffness: 80,
                          damping: 15
                        }}
                        className="bg-white p-3 pb-8 md:p-4 md:pb-10 rounded-sm shadow-xl flex flex-col w-full max-w-[280px] sm:max-w-sm cursor-pointer border border-gray-100 origin-center"
                        style={{
                          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.15)'
                        }}
                      >
                        <div className="aspect-square w-full overflow-hidden bg-gray-50 mb-4 md:mb-6 relative">
                          <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-16 md:w-24 h-4 md:h-6 bg-[#fffceb]/60 backdrop-blur-sm rotate-[-1deg] z-10 shadow-sm border border-white/20"></div>

                          <img
                            src={milestone.image}
                            alt={milestone.title}
                            className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                          />
                        </div>

                        <div className="px-1 text-center">
                          <span className="text-[#6E8C68] font-sans text-[10px] md:text-xs font-bold tracking-widest uppercase block mb-2 md:mb-3">
                            {milestone.metadata}
                          </span>
                          <h3 className="text-lg md:text-xl font-serif text-[#234A2C] leading-snug">
                            {milestone.title}
                          </h3>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
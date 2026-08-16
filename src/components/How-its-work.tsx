import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import cow2Img from "../image/Cow2.png";
import cow3Img from "../image/Cow3.png";
import cow4Img from "../image/Cow5.png";
import cow5Img from "../image/Cow4.png";

const getSrc = (img: any): string => (typeof img === 'string' ? img : img?.src || (img as string));

const steps = [
  {
    id: 1,
    title: "Tokenize Asset",
    description: "Physical livestock are carefully vetted, insured, and tokenized into digital assets, allowing fractional ownership on the blockchain.",
    color: "",
    textColor: "text-white",
    accent: "bg-olive",
    icon: "🐄",
    bgImageSrc: cow2Img,
  },
  {
    id: 2,
    title: "Invest & Hold",
    description: "Investors can seamlessly purchase fractions of a cow, building a diversified portfolio of real-world agricultural assets with minimal capital.",
    color: "",
    textColor: "text-white",
    accent: "bg-olive",
    icon: "📈",
    bgImageSrc: cow3Img,
  },
  {
    id: 3,
    title: "Professional Care",
    description: "Our elite partner farms handle all aspects of raising the livestock, ensuring optimal growth and health with transparent, regular updates.",
    color: "",
    textColor: "text-white",
    accent: "bg-olive",
    icon: "👨‍🌾",
    bgImageSrc: cow4Img,
  },
  {
    id: 4,
    title: "Profit Distribution",
    description: "Once the livestock reaches maturity and is sold at market, profits are automatically and transparently distributed to token holders via smart contracts.",
    color: "",
    textColor: "text-white",
    accent: "bg-olive",
    icon: "💰",
    bgImageSrc: cow5Img,
  }
];

export default function HowItsWork() {
  const targetRef = useRef<HTMLDivElement>(null);

  // The targetRef is on a container that is 400vh tall.
  // As the user scrolls down these 400vh, scrollYProgress goes from 0 to 1.
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // We translate the inner container by -75% to show all 4 panels (each is 25% of the 400vw width).
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-cream">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">

        {/* Fixed Title overlay */}
        <div className="absolute top-12 left-6 md:top-24 md:left-12 z-20 pointer-events-none">
          <motion.h2
            animate={{
              textShadow: [
                "0 0 10px rgba(255,255,255,0.9), 0 0 30px rgba(255,255,255,0.6), 0 0 70px rgba(255,255,255,0.3)",
                "0 0 20px rgba(255,255,255,1),   0 0 50px rgba(255,255,255,0.8), 0 0 100px rgba(255,255,255,0.5)",
                "0 0 10px rgba(255,255,255,0.9), 0 0 30px rgba(255,255,255,0.6), 0 0 70px rgba(255,255,255,0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-5xl md:text-8xl font-serif italic tracking-tight text-white"
          >
            How It{" "}
            <span className="text-white/60">Works</span>
          </motion.h2>
        </div>

        <motion.div style={{ x }} className="flex w-[400vw] h-full items-center">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`w-[100vw] h-full flex flex-col justify-center px-6 md:px-24 relative overflow-hidden border-r border-black/5 ${step.bgImageSrc ? "" : step.color
                }`}
            >
              {/* Background image if provided */}
              {step.bgImageSrc && (
                <>
                  <img
                    src={getSrc(step.bgImageSrc)}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    aria-hidden="true"
                  />

                  {/* dark gradient overlay so text stays readable */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
                </>
              )}

              {/* Large Background Number */}
              <div className="absolute -right-4 md:right-10 bottom-0 text-[40vh] font-black text-white/[0.06] leading-none select-none pointer-events-none">
                0{step.id}
              </div>

              <div className="max-w-4xl z-10 flex flex-col items-start mt-20">
                <div className="text-6xl md:text-8xl mb-8 p-6 bg-white/20 backdrop-blur-xl rounded-3xl shadow-xl shadow-black/20 border border-white/30">
                  {step.icon}
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <span className={`flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-xl ${step.accent}`}>
                    {step.id}
                  </span>
                  <h3 className={`text-4xl md:text-7xl font-serif italic tracking-tight ${step.textColor}`}>
                    {step.title}
                  </h3>
                </div>

                <p className={`text-xl md:text-3xl font-medium leading-relaxed opacity-90 ${step.textColor} max-w-2xl pl-16`}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What is NusaCow?",
    answer: "NusaCow is a decentralized RWA (Real World Asset) protocol on Solana that allows anyone to fund and own fractional shares of high-quality livestock through blockchain technology."
  },
  {
    question: "How do I know the cattle actually exists?",
    answer: "Every asset is minted as a cNFT (Compressed NFT) on Solana, containing unique metadata such as location, breed, and health records. Our partner farmers provide periodic \"Proof of Growth\" updates via on-chain photography and weight logs."
  },
  {
    question: "What is the minimum investment?",
    answer: "Thanks to fractionalization, you can start supporting local ranches with as little as 10 USDC. We aim to democratize access to high-yield agricultural assets."
  },
  {
    question: "When can I claim my rewards?",
    answer: "Once the cattle reaches its target weight and is sold to an off-chain buyer, the funds are deposited into the Smart Contract. You can then \"Harvest\" your initial capital plus profit directly through your dashboard."
  },
  {
    question: "Do I need a specific wallet?",
    answer: "You can use any Solana-compatible wallet such as Phantom, Solflare, or Backpack."
  },
  {
    question: "Why should I join the NusaCow Waitlist?",
    answer: "By joining the waitlist, you gain priority access to our first \"Genesis Vault.\" Capacity is limited, and waitlist members will be the first to be notified before the public launch, ensuring you don't miss out on a high-yield opportunity. For more information, check social media platforms like X, etc."
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-cream relative overflow-hidden" id="faq">
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-olive mb-4">Frequently Asked Questions</h2>
          <p className="text-black/60 max-w-xl mx-auto">
            Everything you need to know about the NusaCow protocol and how to start your journey in agricultural RWA.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-black/10 rounded-2xl bg-white overflow-hidden hover:border-olive/30 transition-colors shadow-sm"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none cursor-pointer"
              >
                <span className="font-semibold text-lg text-ink pr-8">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0 text-olive"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-5 pt-0 text-black/70 leading-relaxed border-t border-black/5 mt-2 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { motion } from 'motion/react';
import { Ticket, ArrowLeft, Check } from 'lucide-react';

export default function Waitlist({ onBack }: { onBack?: () => void }) {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && role) {
            setSubmitted(true);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 flex items-center justify-center relative">
            <motion.div
                className="w-full max-w-xl bg-white/60 backdrop-blur-xl border border-[#D8CFBE] rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-black/5 relative z-10"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                {onBack && (
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-sm text-[#6E8C68] font-medium hover:text-[#4A6046] transition-colors mb-8"
                    >
                        <ArrowLeft size={16} />
                        Back to Home
                    </button>
                )}

                {submitted ? (
                    <motion.div
                        className="text-center py-12"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="w-20 h-20 bg-[#6E8C68] text-[#F4F0E7] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#6E8C68]/30">
                            <Check size={40} />
                        </div>
                        <h2 className="text-3xl font-serif mb-4 text-[#222222]">You're on the list!</h2>
                        <p className="text-black/60 font-sans">Thank you for joining the NusaCow waitlist as a <span className="font-semibold">{role}</span>. We will contact you via email shortly to request access..</p>
                    </motion.div>
                ) : (
                    <>
                        <div className="mb-8">
                            <h1 className="text-4xl md:text-5xl font-serif text-[#222222] mb-4 tracking-tight">Join the Waitlist</h1>
                            <p className="text-[#222222]/60 font-sans text-lg">Be the first to access our Genesis Vault and revolutionize the agriculture industry.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-sm font-medium text-[#222222] font-sans">Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="px-5 py-4 rounded-2xl border border-[#D8CFBE] bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6E8C68] transition-all text-[#222222] font-sans"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="role" className="text-sm font-medium text-[#222222] font-sans">I am joining as...</label>
                                <div className="relative">
                                    <select
                                        id="role"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        required
                                        className="w-full px-5 py-4 rounded-2xl border border-[#D8CFBE] bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6E8C68] transition-all text-[#222222] font-sans appearance-none pr-10"
                                    >
                                        <option value="" disabled>Select your role</option>
                                        <option value="Capital Provider (Investor)">Capital Provider (Investor)</option>
                                        <option value="Local Rancher (breeder)">Local Rancher (breeder)</option>
                                        <option value="Observer (customer)">Observer (customer)</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-4 w-full bg-[#6E8C68] text-[#F4F0E7] py-4 rounded-2xl font-medium hover:bg-[#5C7757] transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transform shadow-lg shadow-[#6E8C68]/20 font-sans"
                            >
                                <span>Join Waitlist</span>
                                <Ticket size={18} />
                            </button>
                        </form>
                    </>
                )}
            </motion.div>
        </div>
    );
}

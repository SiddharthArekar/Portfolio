import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, Loader2, AlertCircle } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const formRef = useRef();
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            setStatus('error');
            setErrorMessage('Configuration Error: Missing EmailJS keys in .env file.');
            return;
        }

        emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
            .then((result) => {
                console.log(result.text);
                setStatus('success');
                formRef.current.reset();
            }, (error) => {
                console.error("EmailJS Error:", error);

                // Smart Error Handling for the User
                if (error.text?.includes("insufficient authentication scopes") || error.text?.includes("Gmail_API")) {
                    setErrorMessage("Service Error: Please reconnect Gmail in EmailJS dashboard and grant 'Send' permissions.");
                } else if (status === 412) {
                    setErrorMessage("Configuration Error: Invalid Public Key or Service ID.");
                } else {
                    setErrorMessage("Failed to send message. Please try again later.");
                }
                setStatus('error');
            });
    };

    return (
        <SectionWrapper id="contact" className="bg-slate-900/30">
            <motion.div
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Let's <span className="text-sky-400">Connect</span></h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        I am actively seeking opportunities as a Cloud Engineer. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
                    {/* Social Links */}
                    <div className="space-y-6">
                        <div className="p-5 md:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
                            <h3 className="text-2xl font-bold text-white mb-6">Contact Info</h3>
                            <div className="space-y-4">
                                <a
                                    href="mailto:siddhartharekar4@gmail.com"
                                    className="flex items-center gap-4 text-slate-400 hover:text-sky-400 transition-colors p-3 rounded-lg hover:bg-slate-800/50"
                                >
                                    <div className="p-3 bg-sky-500/10 rounded-lg text-sky-400 h-12 w-12 flex items-center justify-center">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">Email</p>
                                        <p className="font-medium text-white break-all">siddhartharekar4@gmail.com</p>
                                    </div>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/siddharth-arekar/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 text-slate-400 hover:text-[#0077b5] transition-colors p-3 rounded-lg hover:bg-slate-800/50"
                                >
                                    <div className="p-3 bg-sky-500/10 rounded-lg text-sky-400 h-12 w-12 flex items-center justify-center">
                                        <Linkedin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">LinkedIn</p>
                                        <p className="font-medium text-white">Siddharth Arekar</p>
                                    </div>
                                </a>
                                <a
                                    href="https://github.com/SiddharthArekar"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors p-3 rounded-lg hover:bg-slate-800/50"
                                >
                                    <div className="p-3 bg-sky-500/10 rounded-lg text-sky-400 h-12 w-12 flex items-center justify-center">
                                        <Github size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">GitHub</p>
                                        <p className="font-medium text-white">Check my Repos</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-5 md:p-8 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden"
                    >
                        {/* Status Messages */}
                        {status === 'success' && (
                            <div className="absolute inset-0 bg-slate-900 z-10 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
                                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                                    <Send size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                <p className="text-slate-400">Thank you for reaching out. I'll get back to you shortly.</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="mt-6 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                                >
                                    Send another
                                </button>
                            </div>
                        )}

                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="user_name" className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                                <input
                                    type="text"
                                    id="user_name"
                                    name="user_name"
                                    required
                                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all text-white placeholder-slate-600 [&:-webkit-autofill]:bg-slate-950 [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0px_1000px_#020617_inset] [&:-webkit-autofill]:-webkit-text-fill-color:white"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="user_email" className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="user_email"
                                    name="user_email"
                                    required
                                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all text-white placeholder-slate-600 [&:-webkit-autofill]:bg-slate-950 [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0px_1000px_#020617_inset] [&:-webkit-autofill]:-webkit-text-fill-color:white"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows="4"
                                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all text-white placeholder-slate-600 resize-none"
                                    placeholder="How can I help you?"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send size={20} />
                                        Send Message
                                    </>
                                )}
                            </button>

                            {/* Error Message Display */}
                            {status === 'error' && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-200 text-sm">
                                    <AlertCircle size={18} className="text-red-400 shrink-0" />
                                    <p>{errorMessage || "Something went wrong. Please check your configuration."}</p>
                                </div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </motion.div>
        </SectionWrapper>
    );
};

export default Contact;

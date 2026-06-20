'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles } from 'lucide-react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profileType: 'private_collector',
    timeline: 'explore',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitting(true);
    // Simulate submission to API
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      profileType: 'private_collector',
      timeline: 'explore',
      notes: '',
    });
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink-950/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-md border border-gold-300/20 bg-ink-900 shadow-[0_50px_100px_rgba(0,0,0,0.6)]"
          >
            {/* Ambient gold glow */}
            <div className="absolute -left-12 -top-12 h-32 w-32 rounded-full bg-gold-400/10 blur-[60px] pointer-events-none" />
            <div className="absolute -right-12 -bottom-12 h-32 w-32 rounded-full bg-gold-500/10 blur-[60px] pointer-events-none" />
            <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-bone/10 px-6 py-5">
              <span className="flex items-center gap-2 text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300">
                <Sparkles size={12} className="animate-pulse" />
                Atelier Registration
              </span>
              <button
                onClick={onClose}
                className="flex items-center justify-center h-10 w-10 min-h-[44px] min-w-[44px] rounded-full text-bone/60 hover:bg-bone/5 hover:text-bone transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-7">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="text-center mb-6">
                    <h3 className="font-serif text-2xl sm:text-3xl italic text-bone font-medium">
                      Request Private Waitlist Access
                    </h3>
                    <p className="mt-2 text-xs leading-[1.6] text-bone/60">
                      Admission is strictly curated. Accepted profiles will gain early access to Wovenwarp masterworks and the Global Living Ledger.
                    </p>
                  </div>

                  {/* Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="waitlist-name" className="block text-[10px] uppercase tracking-widest text-gold-300/80">
                      Full Name
                    </label>
                    <input
                      id="waitlist-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alexander Mercer"
                      className="w-full rounded-none border border-bone/15 bg-ink-950 px-4 py-3 text-sm text-bone placeholder-bone/30 outline-none transition-colors focus:border-gold-300/40"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="waitlist-email" className="block text-[10px] uppercase tracking-widest text-gold-300/80">
                      Email Address
                    </label>
                    <input
                      id="waitlist-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alexander@mercerstudios.com"
                      className="w-full rounded-none border border-bone/15 bg-ink-950 px-4 py-3 text-sm text-bone placeholder-bone/30 outline-none transition-colors focus:border-gold-300/40"
                    />
                  </div>

                  {/* Profile Type */}
                  <div className="space-y-1.5">
                    <label htmlFor="waitlist-profile" className="block text-[10px] uppercase tracking-widest text-gold-300/80">
                      Collector Profile
                    </label>
                    <select
                      id="waitlist-profile"
                      value={formData.profileType}
                      onChange={(e) => setFormData({ ...formData, profileType: e.target.value })}
                      className="w-full rounded-none border border-bone/15 bg-ink-950 px-4 py-3 text-sm text-bone outline-none transition-colors focus:border-gold-300/40 appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='none' stroke='%23efe6d8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' viewBox='0 0 24 24' width='16' height='16' xmlns='http://www.w3.org/2000/svg'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                        backgroundPosition: 'right 16px center',
                        backgroundRepeat: 'no-repeat',
                        paddingRight: '40px',
                      }}
                    >
                      <option value="private_collector" className="bg-ink-950">Private Collector</option>
                      <option value="architect" className="bg-ink-950">Architect / Interior Designer</option>
                      <option value="gallery" className="bg-ink-950">Gallery Curator / Representative</option>
                      <option value="hospitality" className="bg-ink-950">Hospitality Developer</option>
                    </select>
                  </div>

                  {/* Acquisition Timeline */}
                  <div className="space-y-1.5">
                    <label htmlFor="waitlist-timeline" className="block text-[10px] uppercase tracking-widest text-gold-300/80">
                      Commission Timeline
                    </label>
                    <select
                      id="waitlist-timeline"
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full rounded-none border border-bone/15 bg-ink-950 px-4 py-3 text-sm text-bone outline-none transition-colors focus:border-gold-300/40 appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='none' stroke='%23efe6d8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' viewBox='0 0 24 24' width='16' height='16' xmlns='http://www.w3.org/2000/svg'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                        backgroundPosition: 'right 16px center',
                        backgroundRepeat: 'no-repeat',
                        paddingRight: '40px',
                      }}
                    >
                      <option value="immediate" className="bg-ink-950">Active project (Immediate)</option>
                      <option value="medium" className="bg-ink-950">Looking for custom rug (1-6 months)</option>
                      <option value="explore" className="bg-ink-950">General design inquiry / Archive review</option>
                    </select>
                  </div>

                  {/* Notes */}
                  <div className="space-y-1.5">
                    <label htmlFor="waitlist-notes" className="block text-[10px] uppercase tracking-widest text-gold-300/80">
                      Design Notes & Preferences
                    </label>
                    <textarea
                      id="waitlist-notes"
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Share details about your space or custom requirements..."
                      className="w-full rounded-none border border-bone/15 bg-ink-950 px-4 py-3 text-sm text-bone placeholder-bone/30 outline-none transition-colors focus:border-gold-300/40 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-3 bg-gold-300 min-h-[48px] py-3 px-6 text-sm font-semibold uppercase tracking-[0.2em] text-ink-950 transition hover:bg-gold-200 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-ink-950" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Verifying Profile...
                      </span>
                    ) : (
                      <>
                        Request Waitlist Access
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="py-8 text-center space-y-6">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold-300/30 bg-gold-300/5">
                    <Sparkles size={28} className="text-gold-300" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-serif text-2xl italic text-bone">
                      Profile Received
                    </h3>
                    <p className="text-sm leading-[1.7] text-bone/70 max-w-md mx-auto">
                      Thank you for your interest, <strong className="text-bone">{formData.name}</strong>. Our Collector Relations team will review your profile.
                    </p>
                    <p className="text-xs leading-[1.8] text-bone/60 max-w-sm mx-auto bg-ink-950/40 p-4 border border-gold-300/10 rounded-sm">
                      A registration link for the Living Ledger will be dispatched to <strong className="text-gold-300 font-normal">{formData.email}</strong> ahead of the <strong className="text-bone font-normal">Day of Genesis (25th December 2026)</strong>.
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center justify-center min-h-[44px] rounded-full border border-bone/15 px-6 py-2.5 text-xs uppercase tracking-widest text-bone/80 hover:border-gold-300/40 hover:text-gold-300 transition-colors"
                  >
                    Return to Atelier
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

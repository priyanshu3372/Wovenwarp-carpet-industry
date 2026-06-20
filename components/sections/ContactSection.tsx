'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Mail, Phone, Instagram, Linkedin, Youtube, Facebook } from 'lucide-react';
import BehanceMark from '@/components/ui/BehanceMark';

const CONTACT_EMAILS = ['info@wovenwarp.com', 'contact@wovenwarp.com'];
const PHONE_DISPLAY = '+91 87369 11035';
const PHONE_TEL = '+918736911035';
const WHATSAPP_URL = `https://wa.me/${PHONE_TEL.replace('+', '')}`;

const SOCIAL_LINKS = [
  {
    icon: Instagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/wovenwarp?igsh=NDBnOTRkODJuM3l6',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/wovenwarp/about/?viewAsMember=true',
  },
  {
    icon: Facebook,
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1BbCVUk2mH/',
  },
  {
    icon: BehanceMark,
    label: 'Behance',
    href: 'https://www.behance.net/wovenwarp',
  },
  {
    icon: Youtube,
    label: 'YouTube',
    href: 'https://youtube.com/@wovenwarp?si=2xN0KuOCKFeC2jUu',
  },
];

export default function ContactSection() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  useLayoutEffect(() => {
    const rootEl = rootRef.current;
    if (!rootEl) return;

    const ctx = gsap.context(() => {
      rootEl.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 42 },
          {
            opacity: 1,
            y: 0,
            duration: 1.25,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
            },
          }
        );
      });
    }, rootEl);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = [
      'Consultation Inquiry',
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone || 'Not provided'}`,
      `Subject: ${formData.subject}`,
      `Message: ${formData.message}`,
    ].join('\n');

    window.open(
      `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );

    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div ref={rootRef} id="contact" className="relative overflow-hidden bg-ink-950">
      <section className="relative px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div data-reveal className="text-center mb-10 sm:mb-12 md:mb-14">
            <span className="mb-4 sm:mb-5 inline-flex items-center gap-2 sm:gap-4 text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300/75">
              <span className="h-px w-6 sm:w-10 bg-gold-300/50" />
              Get In Touch
              <span className="h-px w-6 sm:w-10 bg-gold-300/50" />
            </span>
            <h1 className="font-serif text-[clamp(2rem,5.5vw,6rem)] font-medium leading-[0.95] tracking-tightest text-bone mb-4 sm:mb-6">
              Luxury Consultation & Inquiry
            </h1>
            <p className="mx-auto max-w-2xl text-[clamp(0.875rem,2vw,1rem)] font-light leading-[1.7] sm:leading-[1.85] text-bone/70">
              Connect with our atelier team for collection inquiries, custom rug commissions, or design consultations.
            </p>
          </div>

          <div className="grid gap-8 sm:gap-10 lg:grid-cols-3 mb-10 sm:mb-12 md:mb-14">
            {/* Contact Info Cards */}
            {[
              {
                icon: Mail,
                label: 'Email',
                value: CONTACT_EMAILS,
                detail: 'Response within 24 hours',
                href: `mailto:${CONTACT_EMAILS.join(',')}`,
              },
              {
                icon: Phone,
                label: 'Phone',
                value: PHONE_DISPLAY,
                detail: 'Tap to call directly',
                href: `tel:${PHONE_TEL}`,
              },
              {
                icon: Phone,
                label: 'WhatsApp',
                value: PHONE_DISPLAY,
                detail: 'Send a consultation query',
                href: WHATSAPP_URL,
              },
            ].map((contact, idx) => {
              const Icon = contact.icon;
              return (
                <motion.a
                  key={contact.label}
                  data-reveal
                  href={contact.href}
                  target={contact.href.startsWith('https://') ? '_blank' : undefined}
                  rel={contact.href.startsWith('https://') ? 'noreferrer' : undefined}
                  className="flex flex-col items-center text-center min-h-[160px] sm:min-h-[180px] p-4 sm:p-6 rounded-sm border border-bone/10 hover:border-gold-300/30 transition-colors justify-center"
                >
                  <div className="mb-4 sm:mb-6 flex justify-center">
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-bone/20 bg-ink-900/60">
                      <Icon size={20} className="text-gold-300/80" />
                    </div>
                  </div>
                  <p className="text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300/75 mb-2">
                    {contact.label}
                  </p>
                  <p className="font-serif text-[clamp(0.95rem,2vw,1.25rem)] italic text-bone mb-2 break-all">
                    {Array.isArray(contact.value) ? contact.value.join(' + ') : contact.value}
                  </p>
                  <p className="text-[clamp(0.75rem,1.8vw,0.875rem)] text-bone/55">{contact.detail}</p>
                </motion.a>
              );
            })}
          </div>

          {/* Contact Form */}
          <motion.div
            data-reveal
            className="relative max-w-2xl mx-auto p-5 sm:p-8 md:p-10 lg:p-12 rounded-sm border border-bone/15 bg-bone/[0.03] backdrop-blur-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300/75 mb-2 sm:mb-3">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-bone/20 pb-2 sm:pb-3 text-bone placeholder-bone/40 outline-none transition focus:border-gold-300/50 min-h-[44px] text-[clamp(0.875rem,2vw,1rem)]"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300/75 mb-2 sm:mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-bone/20 pb-2 sm:pb-3 text-bone placeholder-bone/40 outline-none transition focus:border-gold-300/50 min-h-[44px] text-[clamp(0.875rem,2vw,1rem)]"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300/75 mb-2 sm:mb-3">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-bone/20 pb-2 sm:pb-3 text-bone placeholder-bone/40 outline-none transition focus:border-gold-300/50 min-h-[44px] text-[clamp(0.875rem,2vw,1rem)]"
                  placeholder="+91 87369 11035"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300/75 mb-2 sm:mb-3">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-bone/20 pb-2 sm:pb-3 text-bone placeholder-bone/40 outline-none transition focus:border-gold-300/50 min-h-[44px] text-[clamp(0.875rem,2vw,1rem)]"
                  placeholder="Collection inquiry / Custom design / Other"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-gold-300/75 mb-2 sm:mb-3">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-transparent border-b border-bone/20 pb-2 sm:pb-3 text-bone placeholder-bone/40 outline-none transition focus:border-gold-300/50 resize-none min-h-[120px] text-[clamp(0.875rem,2vw,1rem)]"
                  placeholder="Tell us about your project, space, or inquiry..."
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 min-h-[44px] rounded-sm border border-gold-300/40 bg-gold-300/10 text-bone text-[clamp(0.75rem,1.8vw,0.875rem)] uppercase tracking-editorial transition hover:bg-gold-300/20 hover:border-gold-300/60"
              >
                Send Inquiry on WhatsApp
              </motion.button>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            data-reveal
            className="mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-bone/10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <p className="text-[clamp(0.625rem,1.5vw,0.75rem)] uppercase tracking-editorial text-bone/55">
              Follow Our Work
            </p>
            <div className="flex gap-3 sm:gap-4">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;

                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1 }}
                    className="flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-bone/20 text-bone/60 transition hover:border-gold-300/50 hover:text-gold-300/80"
                  >
                    <Icon size={16} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

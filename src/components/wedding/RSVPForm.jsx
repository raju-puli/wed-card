const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Send, CheckCircle2, Heart } from 'lucide-react';

export default function RSVPForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', guests: 1, attending: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const steps = [
    {
      question: "What is your name?",
      field: 'name',
      type: 'text',
      placeholder: 'Your full name',
    },
    {
      question: "Will you be attending?",
      field: 'attending',
      type: 'select',
      options: [
        { value: 'yes', label: 'Joyfully Accepting' },
        { value: 'maybe', label: 'Hoping to Attend' },
        { value: 'no', label: 'Regretfully Declining' },
      ],
    },
    {
      question: "How many guests including yourself?",
      field: 'guests',
      type: 'number',
    },
    {
      question: "Any blessings for the couple?",
      field: 'message',
      type: 'textarea',
      placeholder: 'Your heartfelt message...',
    },
  ];

  const canProceed = () => {
    const current = steps[step];
    const val = form[current.field];
    if (current.field === 'name') return val.trim().length > 0;
    if (current.field === 'attending') return val !== '';
    if (current.field === 'guests') return val > 0;
    return true; // message is optional
  };

  const handleNext = async () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Submit
      setLoading(true);
      await db.entities.RSVP.create(form);
      setLoading(false);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <section className="py-20 md:py-28 flex flex-col items-center px-6 bg-charcoal relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-8 h-8 text-gold" />
          </div>
          <h3 className="text-gold font-serif text-2xl mb-3 gold-glow">Thank You, {form.name}</h3>
          <p className="text-silk/50 font-sans text-sm max-w-xs">
            Your response has been received. We look forward to celebrating with you!
          </p>
          <Heart className="w-5 h-5 text-rose mt-6" />
        </motion.div>
      </section>
    );
  }

  const current = steps[step];

  return (
    <section className="py-20 md:py-28 flex flex-col items-center px-6 bg-charcoal relative" id="rsvp">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-gold/40 uppercase tracking-[0.5em] text-[9px] md:text-[10px] font-sans font-light mb-3"
      >
        Respond
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-gold font-serif text-2xl md:text-3xl mb-12 gold-glow"
      >
        RSVP
      </motion.h2>

      <div className="w-full max-w-md">
        {/* Progress */}
        <div className="flex gap-2 mb-10">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-[2px] flex-1 rounded-full transition-colors duration-500 ${
                i <= step ? 'bg-gold' : 'bg-gold/10'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="bg-white/5 backdrop-blur-xl border border-gold/20 rounded-2xl p-8 gold-box-glow"
          >
            <p className="text-silk font-serif text-lg md:text-xl mb-6">{current.question}</p>

            {current.type === 'text' && (
              <input
                type="text"
                value={form[current.field]}
                onChange={(e) => setForm({ ...form, [current.field]: e.target.value })}
                placeholder={current.placeholder}
                className="w-full bg-transparent border-b border-gold/30 py-3 text-silk font-sans text-base focus:outline-none focus:border-gold transition-colors placeholder:text-silk/20"
                autoFocus
              />
            )}

            {current.type === 'select' && (
              <div className="space-y-3">
                {current.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setForm({ ...form, [current.field]: opt.value })}
                    className={`w-full text-left py-3 px-4 rounded-lg border transition-all font-sans text-sm ${
                      form[current.field] === opt.value
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-gold/10 text-silk/60 hover:border-gold/30'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {current.type === 'number' && (
              <div className="flex items-center gap-6 justify-center py-4">
                <button
                  onClick={() => setForm({ ...form, guests: Math.max(1, form.guests - 1) })}
                  className="w-10 h-10 rounded-full border border-gold/30 text-gold hover:bg-gold/10 transition-all flex items-center justify-center text-xl"
                >
                  −
                </button>
                <span className="text-3xl font-serif text-gold gold-glow min-w-[3ch] text-center">
                  {form.guests}
                </span>
                <button
                  onClick={() => setForm({ ...form, guests: Math.min(10, form.guests + 1) })}
                  className="w-10 h-10 rounded-full border border-gold/30 text-gold hover:bg-gold/10 transition-all flex items-center justify-center text-xl"
                >
                  +
                </button>
              </div>
            )}

            {current.type === 'textarea' && (
              <textarea
                value={form[current.field]}
                onChange={(e) => setForm({ ...form, [current.field]: e.target.value })}
                placeholder={current.placeholder}
                rows={4}
                className="w-full bg-transparent border border-gold/20 rounded-lg py-3 px-4 text-silk font-sans text-sm focus:outline-none focus:border-gold/40 transition-colors placeholder:text-silk/20 resize-none"
                autoFocus
              />
            )}

            <div className="flex items-center justify-between mt-8">
              {step > 0 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="text-silk/40 text-sm font-sans hover:text-silk/60 transition-colors"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={handleNext}
                disabled={!canProceed() || loading}
                className="flex items-center gap-2 py-2.5 px-6 rounded-lg bg-gold/10 border border-gold/30 text-gold hover:bg-gold/20 transition-all text-sm font-sans disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                ) : step === steps.length - 1 ? (
                  <>
                    <Send className="w-4 h-4" />
                    Send
                  </>
                ) : (
                  'Continue →'
                )}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
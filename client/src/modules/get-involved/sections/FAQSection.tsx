'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQS = [
  {
    question: 'Who can volunteer?',
    answer: 'Anyone who shares our vision for community development and has the dedication to serve can volunteer. We welcome students, professionals, retirees, and international volunteers to join our various initiatives.',
  },
  {
    question: 'How do I register?',
    answer: 'You can register by navigating to our Volunteer portal and filling out the interest form. Once submitted, our team will review your application and contact you regarding upcoming orientation sessions.',
  },
  {
    question: 'Do I receive a certificate?',
    answer: 'Yes, upon successful completion of a designated volunteer programme or workshop, the Foundation provides a formal certificate of appreciation and participation recognizing your contribution.',
  },
  {
    question: 'Can organizations partner?',
    answer: 'Absolutely. We actively seek institutional partnerships with educational bodies, healthcare providers, NGOs, and corporate CSR departments to create collaborative, large-scale impact.',
  },
  {
    question: 'How can I support Foundation initiatives?',
    answer: 'You can support us through direct donations, sponsoring specific events or students, participating in our fundraising campaigns, or offering in-kind contributions and professional expertise.',
  },
];

export const FAQSection: React.FC = () => {
  return (
    <section id="faq" className="py-20 lg:py-32 bg-institutional-light dark:bg-[#0D121B] border-b border-gray-200 dark:border-white/10 scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-[1000px] w-full mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold block mb-4">
            Common Questions
          </span>
          <h2 className="font-cormorant text-4xl lg:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <Accordion type="single" collapsible className="w-full bg-white dark:bg-white/5 rounded-sm border border-gray-200 dark:border-white/10 px-6 sm:px-8 lg:px-10 py-4">
            {FAQS.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-lg sm:text-xl py-6 font-cormorant font-bold text-institutional-dark dark:text-white hover:text-institutional-accent dark:hover:text-institutional-accent transition-colors text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="font-manrope text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl pb-2">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

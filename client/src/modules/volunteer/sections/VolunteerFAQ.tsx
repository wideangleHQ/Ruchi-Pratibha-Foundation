'use client';

import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

const FAQS = [
  {
    question: 'Who can volunteer?',
    answer: 'Anyone with a passion for social change can volunteer. We welcome students, working professionals, retired individuals, and subject matter experts from all walks of life.',
  },
  {
    question: 'Is prior experience required?',
    answer: 'No prior experience is necessary for most of our general volunteering opportunities. Specific technical or leadership roles may require relevant background, which will be communicated during orientation.',
  },
  {
    question: 'How long does the approval process take?',
    answer: 'Once you submit your application through the portal, our team reviews it within 48 to 72 hours. You will receive an email regarding the next steps and your virtual orientation schedule.',
  },
  {
    question: 'Will I receive a certificate?',
    answer: 'Yes, volunteers who successfully complete their designated hours or projects receive a formal institutional certificate acknowledging their contribution, which can be added to your professional portfolio.',
  },
  {
    question: 'Can students apply?',
    answer: 'Absolutely. We highly encourage students to participate. It provides a platform to learn leadership skills, understand grassroots challenges, and build a strong foundation in social responsibility.',
  },
];

export const VolunteerFAQ: React.FC = () => {
  return (
    <section className="py-20 lg:py-32 bg-institutional-light dark:bg-institutional-dark border-b border-gray-200 dark:border-white/10">
      <div className="max-w-[800px] w-full mx-auto px-6 sm:px-8">
        
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold block mb-4">
            Clarifications
          </span>
          <h2 className="font-cormorant text-4xl lg:text-5xl font-bold tracking-tight text-institutional-dark dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="w-full bg-white dark:bg-white/5 rounded-sm border border-gray-200 dark:border-white/10 px-6 sm:px-8 lg:px-10 py-4 shadow-sm">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`}>
                <AccordionTrigger className="text-lg sm:text-xl py-6 font-cormorant font-bold text-institutional-dark dark:text-white hover:text-institutional-accent dark:hover:text-institutional-accent transition-colors text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-manrope text-base text-gray-600 dark:text-gray-400 leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
    </section>
  );
};

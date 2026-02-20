"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

    import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
/** Simple FAQ Accordion (2 columns like your screenshot)
 * - No external UI lib needed
 * - Lorem ipsum answers included
 */

const FAQ_DATA = {
  general: {
    title: "General Question",
    left: [
      {
        q: "Can we supply other countries ?",
        a: "Yes. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc non blandit massa, vitae tincidunt lectus.",
      },
      {
        q: "Can you quote and manufacture from a drawing?",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        q: "Can I buy my materials from you directly?",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
      },
      {
        q: "Can natural stone be used on the exteriors of homes?",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.",
      },
      {
        q: "How to choose the suitable stone?",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet.",
      },
      {
        q: "What is the difference between granite and marble?",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor.",
      },
      {
        q: "What are some of the most commonly used granite colours?",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis.",
      },
      {
        q: "What are the different types of finishes in a natural stone?",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo. Vestibulum id ligula porta felis euismod semper.",
      },
    ],
    right: [
      { q: "What is Semi- Precious Stones (Slabs)?", a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum." },
      { q: "Are you insured?", a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum." },
      { q: "Is your work Guaranteed ?", a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet." },
      { q: "Can we choose our own slabs ?", a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus mollis interdum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros." },
      { q: 'Do you use “1st grade” material ?', a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere consectetur est at lobortis. Nulla vitae elit libero, a pharetra augue." },
      { q: "What is Quartzite?", a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor." },
      { q: "What is EQS (ENGINEERED QUARTZ STONE / AGGLOMERATED STONE)?", a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam." },
      { q: "What is Marble?", a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper. Nulla vitae elit libero, a pharetra augue." },
      { q: "What is Granite?", a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et." },
    ],
  },

  shipping: {
    title: "Shipping - Products - Installation",
    left: [
      {
        q: "What is the installation process of granite?",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere consectetur est at lobortis. Vestibulum id ligula porta felis euismod semper.",
      },
      {
        q: "How long does the shipping of products take?",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Donec ullamcorper nulla non metus auctor fringilla.",
      },
    ],
    right: [
      {
        q: "How do you package the stones while transporting to other?",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed consectetur. Donec ullamcorper nulla non metus auctor fringilla.",
      },
      {
        q: "What are the steps taken for Quality Control?",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Etiam porta sem malesuada magna mollis euismod.",
      },
    ],
  },
};

function Chevron({ open }) {
  return (
    <motion.span
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.2 }}
      className="inline-flex items-center justify-center"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 9l6 6 6-6"
          stroke="rgba(255,255,255,0.8)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.span>
  );
}

function FaqItem({ q, a, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/15">
      <button
        type="button"
        onClick={onToggle}
        className={`w-full flex items-center justify-between gap-6 py-5 text-left ${
          isOpen ? "text-white" : "text-white/85"
        }`}
      >
        <span className="text-[15px] md:text-[16px] leading-snug tracking-wide">
          {q}
        </span>
        <Chevron open={isOpen} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.21, 0.9, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 pr-8 text-white/65 text-[13px] md:text-[14px] leading-relaxed">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TwoColFaq({ left, right, defaultOpenKey = "0L" }) {
  const [openKey, setOpenKey] = React.useState(defaultOpenKey);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
      <div>
        {left.map((item, i) => {
          const key = `${i}L`;
          return (
            <FaqItem
              key={key}
              q={item.q}
              a={item.a}
              isOpen={openKey === key}
              onToggle={() => setOpenKey(openKey === key ? null : key)}
            />
          );
        })}
      </div>

      <div>
        {right.map((item, i) => {
          const key = `${i}R`;
          return (
            <FaqItem
              key={key}
              q={item.q}
              a={item.a}
              isOpen={openKey === key}
              onToggle={() => setOpenKey(openKey === key ? null : key)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function FAQSection() {


  return (
    <section className={`relative w-full overflow-hidden py-16 md:py-24 ${quicksand.className}`}>

      {/* background like your reference */}
      <div className="absolute inset-0 -z-10 bg-[#151515]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(65%_55%_at_50%_10%,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_20%_55%,rgba(255,255,255,0.06),transparent_65%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_80%_60%,rgba(255,255,255,0.05),transparent_70%)]" />

      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Heading */}
        <h2 className="text-center text-white text-[44px] md:text-[58px] leading-tight tracking-wide font-[500] [font-family:var(--journey-serif,ui-serif,Georgia,serif)]">
          FAQ
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-center text-white/60 text-[13px] md:text-[14px] leading-relaxed">
          Find answers to your questions about our products, shipping, and installation. This page covers general inquiries and provides clear
          information to assist you with your needs. For further assistance, please contact our support team.
        </p>

        {/* General */}
        <div className="mt-10 md:mt-14">
          <h3 className="text-center text-white text-[18px] md:text-[20px] font-[600] tracking-wide">
            {FAQ_DATA.general.title}
          </h3>
          <div className="mt-6">
            <TwoColFaq
              left={FAQ_DATA.general.left}
              right={FAQ_DATA.general.right}
              defaultOpenKey="0L"
            />
          </div>
        </div>

        {/* Shipping */}
        <div className="mt-14 md:mt-16">
          <h3 className="text-center text-white text-[18px] md:text-[20px] font-[600] tracking-wide">
            {FAQ_DATA.shipping.title}
          </h3>
          <div className="mt-6">
            <TwoColFaq
              left={FAQ_DATA.shipping.left}
              right={FAQ_DATA.shipping.right}
              defaultOpenKey={null}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

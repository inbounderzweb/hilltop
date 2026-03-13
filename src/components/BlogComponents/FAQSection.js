"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const FAQ_DATA = {
  general: {
    title: "General Questions",
    left: [
      {
        q: "Can we supply to other countries?",
        a: "Yes, Hilltop Surfaces is a global exporter. We have a robust international logistics network that allows us to supply our premium granite, marble, and quartz slabs to customers across the world, including frequent shipments to the USA and Europe.",
      },
      {
        q: "Can you quote and manufacture from a drawing?",
        a: "Absolutely. Our expert team specializes in bespoke manufacturing. If you provide a professional drawing or architectural plan, we can quote accurately and use our advanced machinery to cut and finish the stones to your exact specifications.",
      },
      {
        q: "Can I buy materials from you directly?",
        a: "Yes, we work with both trade professionals and individual homeowners. You can visit our experience centers or contact our sales team directly to select your slabs and finalize your purchase for your residential or commercial projects.",
      },
      {
        q: "Can natural stone be used on the exteriors of homes?",
        a: "Many natural stones like Granite and certain Quartzites are ideal for exteriors due to their durability and resistance to weather. They are commonly used for wall cladding, entryways, and outdoor landscaping to provide a timeless, elegant look.",
      },
      {
        q: "How to choose the suitable stone?",
        a: "The best stone depends on the application. For high-traffic kitchen counters, we recommend Granite or Quartz for their scratch resistance. For statement walls or bathrooms, Marble offers unparalleled luxury. Our consultants can guide you based on your lifestyle and aesthetic goals.",
      },
      {
        q: "What is the difference between granite and marble?",
        a: "Granite is a volcanic rock known for its extreme hardness and resistance to acid and scratches, making it perfect for heavy-duty use. Marble is a metamorphic rock prized for its unique veining and classic beauty, though it is softer and requires more care.",
      },
      {
        q: "What are some of the most commonly used granite colors?",
        a: "Popular choices include classic absolute blacks, sophisticated greys like Steel Grey, and iconic patterned stones like Colonial White or Alaska White. We offer a wide spectrum from neutral earth tones to vibrant, exotic patterns.",
      },
      {
        q: "What are the different types of finishes in a natural stone?",
        a: "We offer various finishes including Polished (high shine), Honed (matte/satin), Leathered (textured but soft), and Flamed (rough texture for slip resistance). Each finish completely changes the look and feel of the stone.",
      },
    ],
    right: [
      {
        q: "What are Semi-Precious Stones (Slabs)?",
        a: "Our semi-precious collection features rare minerals like Agate, Amethyst, and Quartz crystals bonded together to create translucent, jewel-like slabs. These are often backlit to create stunning, glowing feature walls in luxury interiors."
      },
      {
        q: "Are you insured?",
        a: "Yes, Hilltop Surfaces is a fully licensed and insured manufacturer. We adhere to all international safety and business standards to ensure that every transaction and project is handled with the highest level of professionalism and security."
      },
      {
        q: "Is your work Guaranteed?",
        a: "We stand by the quality of our craftsmanship. All our stones undergo rigorous quality checks. While natural stones have inherent variations, we guarantee that the slabs you receive meet our strict standards for integrity and finish."
      },
      {
        q: "Can we choose our own slabs?",
        a: "We encourage it! We believe every stone has its own personality. You are welcome to visit our warehouse or view high-resolution photos of specific slab bundles to hand-pick the exact piece of nature that will go into your home."
      },
      {
        q: 'Do you use “1st grade” material?',
        a: "Exclusively. We pride ourselves on sourcing top-tier blocks from the finest quarries. Our reputation is built on quality, so we never compromise by using sub-par materials for our clients' projects."
      },
      {
        q: "What is Quartzite?",
        a: "Quartzite is a natural stone that starts as sandstone and is transformed through heat and pressure into a very hard material. It often looks like marble but performs more like granite, offering a perfect blend of style and strength."
      },
      {
        q: "What is EQS (Engineered Quartz Stone)?",
        a: "EQS is a man-made surface created by combining approximately 90-93% crushed natural quartz with resins and pigments. It is non-porous, highly resistant to stains and bacteria, and offers consistent patterns unavailable in natural stone."
      },
      {
        q: "What is Marble?",
        a: "Marble is a classic natural stone formed from limestone. It is synonymous with luxury and has been used for centuries in the world's finest architecture. Its hallmark is its graceful veining and soft, luminous appearance."
      },
      {
        q: "What is Granite?",
        a: "Granite is an exceptionally hard natural igneous rock. Composed of minerals like quartz and fieldspar, it is one of the most durable materials on earth, making it the gold standard for kitchen countertops and flooring."
      },
    ],
  },

  shipping: {
    title: "Shipping - Products - Installation",
    left: [
      {
        q: "What is the installation process of granite?",
        a: "The process involves precision templating of your space, water-jet cutting the slabs to size, and expert edge profiling. Our specialized installers then carefully place the pieces, secure the seams with color-matched resin, and ensure a level, perfect fit.",
      },
      {
        q: "How long does shipping take?",
        a: "Shipping times vary by destination. For local orders, delivery is typically within a few days. For international exports, it generally takes 4-8 weeks depending on the shipping lanes and customs clearance processes.",
      },
    ],
    right: [
      {
        q: "How do you package the stones for transport?",
        a: "We use heavy-duty, internationally compliant wooden crates (ISPM 15 certified). Each slab is separated by protective layers to prevent scratching, and the crates are securely braced within shipping containers to ensure zero movement during transit.",
      },
      {
        q: "What steps are taken for Quality Control?",
        a: "Our QC process is multi-staged: from raw block inspection at the quarry to scanning slabs with advanced sensors during polishing. Every finished slab is manually inspected for vein consistency, thickness accuracy, and surface perfection before shipping.",
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
        className={`w-full flex items-center justify-between gap-6 py-5 text-left ${isOpen ? "text-white" : "text-white/85"
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
        <h2 className="text-center text-white text-[44px] md:text-[58px] leading-tight tracking-wide font-medium [font-family:var(--journey-serif,ui-serif,Georgia,serif)]">
          FAQ
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-center text-white/60 text-[13px] md:text-[14px] leading-relaxed">
          Find comprehensive answers to your questions about our premium product range, global shipping capabilities, and expert installation services. We are dedicated to providing clear information to ensure your experience with Hilltop Surfaces is seamless.
        </p>

        {/* General */}
        <div className="mt-10 md:mt-14">
          <h3 className="text-center text-white text-[18px] md:text-[20px] font-semibold tracking-wide">
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
          <h3 className="text-center text-white text-[18px] md:text-[20px] font-semibold tracking-wide">
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

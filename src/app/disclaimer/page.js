import React from 'react';

export const metadata = {
  title: "Disclaimer | Hilltop Surfaces",
  description: "General, product, application, and technical disclaimers for Hilltop Surfaces.",
};

export default function Disclaimer() {
  return (
    <div className="bg-[#1e1e1e] min-h-screen pt-32 pb-24 font-sans">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-white/80">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-white tracking-wide">Disclaimer</h1>
        
        <div className="space-y-10 text-base md:text-lg font-light leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">General Disclaimer</h2>
            <p className="mb-4">
              All information on this website is provided for general guidance and is subject to change without notice.
            </p>
            <p>
              This website may use third-party services (including Google) which operate under their own policies. Users are encouraged to review:{' '}
              <a href="https://policies.google.com/" target="_blank" rel="noreferrer" className="text-[#d7a447] hover:underline break-all">
                https://policies.google.com/
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Product Disclaimer</h2>
            <p className="mb-4">
              All materials including granite, marble, quartzite, quartz, SPC, and porcelain are either natural or manufactured products that may show variations.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Variations in color, texture, pattern, veining, and finish are natural and expected</li>
              <li>Samples, images, and displays are indicative only</li>
              <li>No two slabs or batches will be identical</li>
            </ul>
            <p className="mt-4">
              These variations are not defects but inherent characteristics of the material.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Application Disclaimer</h2>
            <p>
              Final performance depends on handling, fabrication, installation, and site conditions. We are not responsible for third-party workmanship.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Technical Disclaimer</h2>
            <p>
              Specifications may vary based on batch, source, or manufacturing process.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Liability Disclaimer</h2>
            <p className="mb-4">We are not liable for:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Indirect or consequential damages</li>
              <li>Installation or usage issues</li>
              <li>Decisions made based on website content</li>
            </ul>
            <p>
              Use of products and information is at your own discretion.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

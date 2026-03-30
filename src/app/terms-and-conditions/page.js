import React from 'react';

export const metadata = {
  title: "Terms & Conditions | Hilltop Surfaces",
  description: "Terms and conditions of use for Hilltop Surfaces website and services.",
};

export default function TermsAndConditions() {
  return (
    <div className="bg-[#1e1e1e] min-h-screen pt-32 pb-24 font-sans">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-white/80">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-white tracking-wide">Terms & Conditions</h1>
        
        <div className="space-y-10 text-base md:text-lg font-light leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Acceptance</h2>
            <p className="mb-4">
              By using this website, you agree to these Terms & Conditions and acknowledge compliance with third-party service policies where applicable, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 break-all">
              <li><a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="text-[#d7a447] hover:underline">https://policies.google.com/terms</a></li>
              <li><a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-[#d7a447] hover:underline">https://policies.google.com/privacy</a></li>
            </ul>
            <p>By using this website, you agree to these Terms & Conditions.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Products</h2>
            <p className="mb-4">
              We supply granite, marble, quartzite, quartz, SPC flooring, and porcelain.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Natural and manufactured variations are expected</li>
              <li>Exact match is not guaranteed</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Orders</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Orders are confirmed only upon written approval</li>
              <li>Once approved, cancellations may not be possible</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Pricing</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Prices are subject to change without notice</li>
              <li>Taxes, shipping, and installation are extra unless specified</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Delivery</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Timelines are indicative, not guaranteed</li>
              <li>Risk transfers upon dispatch/delivery</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Returns</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>No returns for variation-related reasons</li>
              <li>Claims must be reported within 48 hours of delivery</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Limitation of Liability</h2>
            <p className="mb-4">We are not liable for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Installation issues</li>
              <li>Third-party contractor errors</li>
              <li>Indirect or consequential losses</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Intellectual Property</h2>
            <p>
              All website content is owned by HillTopGranites and cannot be reused without permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Governing Law</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>India: Indian laws apply</li>
              <li>US: Applicable state laws apply</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Updates</h2>
            <p>We may update these terms at any time.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

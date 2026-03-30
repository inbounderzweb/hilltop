import React from 'react';

export const metadata = {
  title: "Privacy Policy | Hilltop Surfaces",
  description: "Learn about how Hilltop Surfaces collects, uses, and protects your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#1e1e1e] min-h-screen pt-32 pb-24 font-sans">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-white/80">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-white tracking-wide">Privacy Policy</h1>
        
        <div className="space-y-8 text-base md:text-lg font-light leading-relaxed">
          <p>
            HillTopGranites (“we”, “our”, “us”) operates in India and the United States and supplies granite, marble, quartzite, quartz, SPC flooring, and porcelain materials. We respect your privacy and are committed to protecting your personal information.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name, email, phone number</li>
              <li>Company/project details</li>
              <li>Website usage data (cookies, analytics)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to inquiries and provide quotations</li>
              <li>Process orders and business communication</li>
              <li>Improve website performance</li>
              <li>Marketing (only with consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Cookies & Tracking</h2>
            <p className="mb-4">
              We use cookies and tools like Google Analytics and Google Ads to improve user experience and marketing performance. You can learn more about how Google uses data from sites that use its services here:
            </p>
            <ul className="list-disc pl-6 space-y-2 break-all">
              <li><a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer" className="text-[#d7a447] hover:underline">How Google uses data</a></li>
              <li><a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-[#d7a447] hover:underline">Google Privacy Policy</a></li>
              <li><a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="text-[#d7a447] hover:underline">Google Cookies Policy</a></li>
              <li><a href="https://adssettings.google.com" target="_blank" rel="noreferrer" className="text-[#d7a447] hover:underline">Google Ads Settings</a></li>
              <li><a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="text-[#d7a447] hover:underline">Google Terms of Service</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Data Sharing</h2>
            <p className="mb-4">We do not sell your data. We may share it with:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Logistics & delivery partners</li>
              <li>Service providers</li>
              <li>Marketing and analytics providers (including Google services as per their policies)</li>
              <li>Legal authorities (if required)</li>
            </ul>
            <p>
              All data processing involving Google services complies with:{' '}
              <a href="https://business.safety.google/privacy/" target="_blank" rel="noreferrer" className="text-[#d7a447] hover:underline break-all">
                https://business.safety.google/privacy/
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">International Transfers</h2>
            <p>
              Your data may be processed in India and the United States with appropriate safeguards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
            <p>
              We take reasonable measures to protect your data, but no system is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access, correct, or delete your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact</h2>
            <p>
              Email: <a href="mailto:info@hilltopgranite.com" className="text-[#d7a447] hover:underline">info@hilltopgranite.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

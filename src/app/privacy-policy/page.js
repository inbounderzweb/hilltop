import React from 'react';
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Privacy Policy | Hilltop Surfaces",
  description: "Learn about how Hilltop Surfaces collects, uses, and protects your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#1e1e1e] min-h-screen pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h3 className="text-2xl md:text-3xl font-medium text-white tracking-widest uppercase text-center md:text-left">
          Privacy Policy
        </h3>

        <div className="text-white/90">
          <div className={`text-base md:text-lg font-light leading-relaxed text-center md:text-left ${quicksand.className} mb-8`}>
            <p>
              HillTopGranites (“we”, “our”, “us”) operates in India and the United States and supplies granite, marble, quartzite, quartz, SPC flooring, and porcelain materials. We respect your privacy and are committed to protecting your personal information.
            </p>
          </div>

          <h3 className="text-lg md:text-xl font-medium text-white tracking-wide uppercase text-center md:text-left">
            Information We Collect
          </h3>
          <div className={`text-base md:text-lg font-light leading-relaxed ${quicksand.className} mb-8`}>
            <ul className="list-disc pl-6">
              <li>Name, email, phone number</li>
              <li>Company/project details</li>
              <li>Website usage data (cookies, analytics)</li>
            </ul>
          </div>

          <h3 className="text-lg md:text-xl font-medium text-white tracking-wide uppercase text-center md:text-left">
            How We Use Your Information
          </h3>
          <div className={`text-base md:text-lg font-light leading-relaxed ${quicksand.className} mb-8`}>
            <ul className="list-disc pl-6">
              <li>Respond to inquiries and provide quotations</li>
              <li>Process orders and business communication</li>
              <li>Improve website performance</li>
              <li>Marketing (only with consent)</li>
            </ul>
          </div>

          <h3 className="text-lg md:text-xl font-medium text-white tracking-wide uppercase text-center md:text-left">
            Cookies & Tracking
          </h3>
          <div className={`text-base md:text-lg font-light leading-relaxed ${quicksand.className} mb-8`}>
            <p>
              We use cookies and tools like Google Analytics and Google Ads to improve user experience and marketing performance. You can learn more about how Google uses data from sites that use its services here:
            </p>
            <ul className="list-disc pl-6 break-all">
              <li><a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer" className="text-[#DA9C39] hover:underline">How Google uses data</a></li>
              <li><a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-[#DA9C39] hover:underline">Google Privacy Policy</a></li>
              <li><a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="text-[#DA9C39] hover:underline">Google Cookies Policy</a></li>
              <li><a href="https://adssettings.google.com" target="_blank" rel="noreferrer" className="text-[#DA9C39] hover:underline">Google Ads Settings</a></li>
              <li><a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="text-[#DA9C39] hover:underline">Google Terms of Service</a></li>
            </ul>
          </div>

          <h3 className="text-lg md:text-xl font-medium text-white tracking-wide uppercase text-center md:text-left">
            Data Sharing
          </h3>
          <div className={`text-base md:text-lg font-light leading-relaxed ${quicksand.className} mb-8`}>
            <p>We do not sell your data. We may share it with:</p>
            <ul className="list-disc pl-6">
              <li>Logistics & delivery partners</li>
              <li>Service providers</li>
              <li>Marketing and analytics providers (including Google services as per their policies)</li>
              <li>Legal authorities (if required)</li>
            </ul>
            <p>
              All data processing involving Google services complies with:{' '}
              <a href="https://business.safety.google/privacy/" target="_blank" rel="noreferrer" className="text-[#DA9C39] hover:underline break-all">
                https://business.safety.google/privacy/
              </a>
            </p>
          </div>

          <h3 className="text-lg md:text-xl font-medium text-white tracking-wide uppercase text-center md:text-left">
            International Transfers
          </h3>
          <div className={`text-base md:text-lg font-light leading-relaxed ${quicksand.className} mb-8`}>
            <p>
              Your data may be processed in India and the United States with appropriate safeguards.
            </p>
          </div>

          <h3 className="text-lg md:text-xl font-medium text-white tracking-wide uppercase text-center md:text-left">
            Data Security
          </h3>
          <div className={`text-base md:text-lg font-light leading-relaxed ${quicksand.className} mb-8`}>
            <p>
              We take reasonable measures to protect your data, but no system is 100% secure.
            </p>
          </div>

          <h3 className="text-lg md:text-xl font-medium text-white tracking-wide uppercase text-center md:text-left">
            Your Rights
          </h3>
          <div className={`text-base md:text-lg font-light leading-relaxed ${quicksand.className} mb-8`}>
            <ul className="list-disc pl-6">
              <li>Access, correct, or delete your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </div>

          <h3 className="text-lg md:text-xl font-medium text-white tracking-wide uppercase text-center md:text-left">
            Contact
          </h3>
          <div className={`text-base md:text-lg font-light leading-relaxed ${quicksand.className} mb-8`}>
            <p>
              Email: <a href="mailto:info@hilltopgranite.com" className="text-[#DA9C39] hover:underline">info@hilltopgranite.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

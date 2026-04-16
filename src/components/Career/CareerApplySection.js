"use client";

import React from "react";
import Image from "next/image";
import { Quicksand } from "next/font/google";
import careerimg from "../../assets/career/career.png";
import { COUNTRY_CODES } from "../../data/countryCodes";

function ChevronDown({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function CareerApplySection({
  illustrationSrc = careerimg, // put your image in /public/careers/
  jobs = ["Sales Executive", "Project Manager", "Architect Liaison", "Warehouse Supervisor"],
  onSubmit, // optional callback (form data)
}) {
  const [form, setForm] = React.useState({
    fullName: "",
    job: "",
    email: "",
    phone: "",
    resume: null,
  });

  const sortedCountries = React.useMemo(() => {
    return [...COUNTRY_CODES].sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  const [selectedCountry, setSelectedCountry] = React.useState(
    COUNTRY_CODES.find(c => c.label === "India") || COUNTRY_CODES[0]
  );

  const fileRef = React.useRef(null);

  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState(null);
  const [acceptTerms, setAcceptTerms] = React.useState(false);
  React.useEffect(() => {
    const detectLocation = async () => {
      try {
        const geoRes = await fetch('https://ipapi.co/json/').catch(() => null);
        if (geoRes) {
          const geoData = await geoRes.json();
          if (geoData && geoData.country_name) {
            const country = COUNTRY_CODES.find(c => 
              c.label.toLowerCase() === geoData.country_name.toLowerCase()
            );
            if (country) {
              setSelectedCountry(country);
            }
          }
        }
      } catch (err) {
        console.error("Failed to detect location", err);
      }
    };
    detectLocation();
  }, []);
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function handleFile(e) {
    const file = e.target.files?.[0] || null;
    setForm((p) => ({ ...p, resume: file }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.resume) {
      setStatus({ type: 'error', message: 'Please upload your resume in PDF format.' });
      return;
    }
    if (!acceptTerms) {
      setStatus({ type: 'error', message: 'Please accept the terms and conditions to proceed.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    const formData = new FormData();
    formData.append('fullName', form.fullName);
    formData.append('job', form.job);
    formData.append('email', form.email);
    formData.append('phone', `${selectedCountry.code} ${form.phone}`);
    formData.append('country', selectedCountry.label);
    formData.append('resume', form.resume);

    try {
      const response = await fetch('/api/enquiries/career', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setStatus({ type: 'success', message: 'Application submitted successfully! Our team will contact you soon.' });
        setForm({ fullName: "", job: "", email: "", phone: "", resume: null });
      } else {
        setStatus({ type: 'error', message: data.error || 'Something went wrong.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to submit application. Please try again later.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={`relative w-full overflow-hidden py-14 md:py-20 `}>
      {/* background */}
      <div className="absolute inset-0 -z-10 bg-[#151515]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(65%_55%_at_50%_10%,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_20%_55%,rgba(255,255,255,0.06),transparent_65%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_80%_60%,rgba(255,255,255,0.05),transparent_70%)]" />

      <div className="mx-auto w-full max-w-6xl px-6">
        {/* heading + copy */}
        <h2 className="text-center text-[#F4E0C2] text-[36px] md:text-[56px] font-light tracking-tight">
          Be Part of Our Mission
        </h2>

        <p className="mx-auto mt-5 max-w-5xl text-center text-white text-[16px] md:text-[18px] leading-relaxed">
          At HillTop, we craft more than just surfaces; we craft legacies. As a leader in the global luxury stone industry, we invite passionate and driven
          professionals to join our journey of innovation and excellence. Whether you&apos;re a seasoned expert or an ambitious newcomer, HillTop offers you
          the opportunity to work with rare, exquisite materials and be a part of creating timeless masterpieces for clients worldwide. Explore a career
          where luxury, creativity, and growth go hand in hand. Step into a world of possibilities and build your future with HillTop.
          <br />
          <span className="block mt-4 text-[#DA9C39] font-bold">Email your resume to: jobs@hilltopgranite.com</span>
        </p>

        {/* content */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* illustration */}
          <div className="relative w-full max-w-[560px] mx-auto lg:mx-0">
            <div className="relative w-full aspect-video">
              <Image
                src={illustrationSrc}
                alt="Career illustration"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 90vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full name */}
              <div className="md:col-span-1">
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full h-[54px] rounded-2xl bg-white/5 border border-white/10 px-5 text-white text-[15px] placeholder:text-white/35 outline-none focus:border-white/25 focus:bg-white/[0.07] transition"
                />
              </div>

              {/* Select job */}
              <div className="md:col-span-1 relative">
                <select
                  name="job"
                  value={form.job}
                  onChange={handleChange}
                  className="w-full h-[54px] appearance-none rounded-2xl bg-white/5 border border-white/10 px-5 pr-12 text-white/90 text-[15px] outline-none focus:border-white/25 focus:bg-white/[0.07] transition"
                >
                  <option value="" className="bg-[#151515] text-white/60">
                    Select Job
                  </option>
                  {jobs.map((j) => (
                    <option key={j} value={j} className="bg-[#151515] text-white">
                      {j}
                    </option>
                  ))}
                </select>

                {/* chevron */}
                <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-white/70">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="rgba(255,255,255,0.8)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email id"
                  type="email"
                  className="w-full h-[54px] rounded-2xl bg-white/5 border border-white/10 px-5 text-white text-[15px] placeholder:text-white/35 outline-none focus:border-white/25 focus:bg-white/[0.07] transition"
                />
              </div>

              {/* Phone with Country selector */}
              <div className="md:col-span-2">
                <div className="flex h-[68px] rounded-2xl bg-white/5 border border-white/10 overflow-hidden focus-within:border-white/25 focus-within:bg-white/[0.07] transition shadow-lg shadow-black/20">
                  <div className="relative flex items-center shrink-0 flex-1 min-w-[130px]">
                    <select
                      value={selectedCountry.label}
                      onChange={(e) => {
                        const country = COUNTRY_CODES.find(c => c.label === e.target.value);
                        setSelectedCountry(country);
                      }}
                      className="w-full h-full bg-transparent text-white text-[13px] sm:text-[15px] pl-3 sm:pl-4 pr-8 sm:pr-10 outline-none appearance-none cursor-pointer hover:bg-white/5 transition"
                    >
                      {sortedCountries.map((c, i) => (
                        <option key={i} value={c.label} className="bg-[#151515]">
                          {c.flag} {c.code} ({c.label})
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
                      <ChevronDown />
                    </div>
                  </div>
                  <div className="w-px bg-white/10 self-stretch" />
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    inputMode="numeric"
                    className="flex-3 px-5 bg-transparent text-white text-[19px] placeholder:text-white/35 outline-none"
                  />
                </div>
              </div>

              {/* Upload (spans 2 cols) */}
              <div className="md:col-span-2">
                <div className="h-[64px] rounded-2xl bg-white/5 border border-white/10 px-5 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-white/75">
                      {form.resume ? form.resume.name : "Upload Resume in pdf"}
                    </div>
                    <div className="text-[12px] text-white/45 mt-1">(max: 3MB)</div>
                  </div>

                  <input
                    ref={fileRef}
                    type="file"
                    accept="application/pdf"
                    onChange={handleFile}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="shrink-0 h-[38px] px-6 rounded-xl bg-white/80 text-black/80 text-[14px] font-semibold hover:bg-white transition"
                  >
                    Browse
                  </button>
                </div>
              </div>

              <div className="md:col-span-2 pt-2 pb-1">
                <label className="flex items-center gap-3 cursor-pointer text-white/80 w-max">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="w-5 h-5 accent-[#DA9C39] rounded cursor-pointer shrink-0"
                  />
                  <span className="text-[14px] md:text-[16px]">I accept the terms and conditions</span>
                </label>
              </div>

              {status && (
                <div className={`md:col-span-2 p-3 rounded-xl text-center text-sm font-medium ${status.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                  {status.message}
                </div>
              )}

              <div className="md:col-span-2 flex justify-center md:justify-end pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`h-[54px] w-full md:w-[280px] rounded-2xl bg-[#DA9C39] text-black font-bold text-[18px] tracking-wide transition ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:brightness-110'}`}
                >
                  {loading ? "Submitting..." : "Submit now"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

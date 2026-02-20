"use client";

import React from "react";
import Image from "next/image";
import { Quicksand } from "next/font/google";
import careerimg from "../../assets/career/career.png";

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

  const fileRef = React.useRef(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function handleFile(e) {
    const file = e.target.files?.[0] || null;
    setForm((p) => ({ ...p, resume: file }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = { ...form };
    if (onSubmit) onSubmit(payload);
    // demo behavior: you can remove this reset if you want
    // setForm({ fullName: "", job: "", email: "", phone: "", resume: null });
  }

  return (
    <section className={`relative w-full overflow-hidden py-14 md:py-20 ${quicksand.className}`}>
      {/* background */}
      <div className="absolute inset-0 -z-10 bg-[#151515]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(65%_55%_at_50%_10%,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_20%_55%,rgba(255,255,255,0.06),transparent_65%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_80%_60%,rgba(255,255,255,0.05),transparent_70%)]" />

      <div className="mx-auto w-full max-w-6xl px-6">
        {/* heading + copy */}
        <h2 className="text-center text-white text-[36px] md:text-[46px] font-[500] tracking-wide">
          Be Part of Our Mission
        </h2>

        <p className="mx-auto mt-5 max-w-5xl text-center text-white text-[14px] md:text-[16px] leading-relaxed">
          At HillTop, we craft more than just surfaces; we craft legacies. As a leader in the global luxury stone industry, we invite passionate and driven
          professionals to join our journey of innovation and excellence. Whether you&apos;re a seasoned expert or an ambitious newcomer, HillTop offers you
          the opportunity to work with rare, exquisite materials and be a part of creating timeless masterpieces for clients worldwide. Explore a career
          where luxury, creativity, and growth go hand in hand. Step into a world of possibilities and build your future with HillTop.
        </p>

        {/* content */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* illustration */}
          <div className="relative w-full max-w-[560px] mx-auto lg:mx-0">
            <div className="relative w-full aspect-[16/9]">
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
                  className="w-full h-[56px] rounded-2xl bg-white/5 border border-white/10 px-5 text-white placeholder:text-white/35 outline-none focus:border-white/25 focus:bg-white/[0.07] transition"
                />
              </div>

              {/* Select job */}
              <div className="md:col-span-1 relative">
                <select
                  name="job"
                  value={form.job}
                  onChange={handleChange}
                  className="w-full h-[56px] appearance-none rounded-2xl bg-white/5 border border-white/10 px-5 pr-12 text-white/90 outline-none focus:border-white/25 focus:bg-white/[0.07] transition"
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
              <div className="md:col-span-1">
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email id"
                  type="email"
                  className="w-full h-[56px] rounded-2xl bg-white/5 border border-white/10 px-5 text-white placeholder:text-white/35 outline-none focus:border-white/25 focus:bg-white/[0.07] transition"
                />
              </div>

              {/* Phone with +91 */}
              <div className="md:col-span-1">
                <div className="flex h-[56px] rounded-2xl bg-white/5 border border-white/10 overflow-hidden focus-within:border-white/25 focus-within:bg-white/[0.07] transition">
                  <div className="px-5 flex items-center text-white/80 border-r border-white/10">
                    +91
                  </div>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    inputMode="numeric"
                    className="flex-1 px-5 bg-transparent text-white placeholder:text-white/35 outline-none"
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
                    className="shrink-0 h-[38px] px-6 rounded-xl bg-white/80 text-black/80 text-[14px] font-[600] hover:bg-white transition"
                  >
                    Browse
                  </button>
                </div>
              </div>

              {/* Submit aligned right like screenshot */}
              <div className="md:col-span-2 flex justify-center md:justify-end pt-2">
                <button
                  type="submit"
                  className="h-[54px] w-full md:w-[280px] rounded-2xl bg-[#DA9C39] text-black font-[700] text-[18px] tracking-wide hover:brightness-110 transition"
                >
                  Submit now
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

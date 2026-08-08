import Image from "next/image";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";
import DDS from "@/components/img/Dds.png";
import { ShieldCheck, Award, Users, HeartHandshake, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      {/* Banner */}
      <PageBanner
        title="About Rajbiosis Private Limited"
        subtitle="Delivering trusted diagnostic analyzers, laboratory solutions, and biomedical technologies with innovation, precision, and healthcare excellence across India."
      />

      {/* Main About Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container-custom grid lg:grid-cols-2 gap-16 items-center relative z-10">

          {/* Left Image Frame */}
          <div className="relative">
            <div className="rounded-[36px] md:rounded-[44px] overflow-hidden bg-white border border-slate-100 shadow-[0_25px_80px_rgba(0,0,0,0.08)] relative flex items-center justify-center p-3 min-h-[480px]">
              <div className="relative w-full h-[460px] rounded-[28px] md:rounded-[36px] overflow-hidden bg-slate-50">
                <img
                  src="/images/about-biomedical.png"
                  alt="Rajbiosis Private Limited Clinical Laboratory"
                  className="w-full h-full object-cover rounded-[28px] md:rounded-[36px] hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Floating Stats Card 1 */}
            <div className="absolute -bottom-6 -right-4 bg-white p-5 md:p-6 rounded-[24px] shadow-2xl border border-slate-100 hidden sm:flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center font-bold">
                <Award size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 leading-none">
                  10+ Years
                </h3>
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  Healthcare Excellence
                </p>
              </div>
            </div>

            {/* Floating Stats Card 2 */}
            <div className="absolute -top-6 -left-4 bg-white p-4 md:p-5 rounded-[24px] shadow-2xl border border-slate-100 hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">100% Genuine</h4>
                <p className="text-[11px] text-slate-500 font-medium">Leading Brands</p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div>
            <SectionTitle
              badge="Who We Are"
              title="Your Trusted Partner in Biomedical & Clinical Diagnostics"
              description="Rajbiosis Private Limited is a premier supplier, distributor, and service provider of advanced biomedical equipment and diagnostic analyzers across India."
            />

            <p className="mt-6 text-slate-600 leading-8 text-base">
              At <strong className="text-slate-900">Rajbiosis Private Limited</strong>, we are dedicated to empowering hospitals, pathology laboratories, diagnostic centers, and medical institutions with high-precision instruments, original reagents, and comprehensive technical support.
            </p>

            <p className="mt-4 text-slate-600 leading-8 text-base">
              From fully automatic electrolyte analyzers and hematology systems to rapid diagnostic test kits and biochemistry instruments, our portfolio represents global quality, exceptional accuracy, and long-term operating efficiency.
            </p>

            {/* Core Feature Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex items-start gap-3">
                <CheckCircle2 className="text-red-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Genuine OEM Equipment</h4>
                  <p className="text-slate-500 text-xs mt-1 leading-5">Certified analyzers and testing devices backed by warranty.</p>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex items-start gap-3">
                <CheckCircle2 className="text-red-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Pan-India Support</h4>
                  <p className="text-slate-500 text-xs mt-1 leading-5">Fast express delivery, installation, and AMC maintenance services.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-slate-50 relative border-y border-slate-100">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[30px] shadow-sm border border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-6">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-600 text-sm leading-7">
                To deliver reliable diagnostic technologies, cutting-edge biomedical analyzers, and prompt technical services to healthcare providers across India.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[30px] shadow-sm border border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6">
                <Award size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
              <p className="text-slate-600 text-sm leading-7">
                To become India's most trusted partner for clinical laboratory equipment, turnkey diagnostic setups, and biomedical service excellence.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[30px] shadow-sm border border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <HeartHandshake size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Values</h3>
              <p className="text-slate-600 text-sm leading-7">
                Customer commitment, uncompromising quality assurance, rapid technical responsiveness, and transparent pricing in every partnership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </>
  );
}
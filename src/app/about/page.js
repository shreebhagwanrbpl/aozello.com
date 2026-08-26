import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";
import { ShieldCheck, Award, Users, HeartHandshake, CheckCircle2, Microscope, Wrench, PackageCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      {/* Banner */}
      <PageBanner
        title="About Rajbiosis Private Limited"
        subtitle="Empowering clinical laboratories, hospitals, and diagnostic institutions across India with high-precision analyzers, certified OEM reagents, and dedicated technical service excellence."
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
                  alt="Rajbiosis Private Limited Clinical Laboratory Solutions"
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
                  Healthcare & Diagnostic Excellence
                </p>
              </div>
            </div>

            {/* Floating Stats Card 2 */}
            <div className="absolute -top-6 -left-4 bg-white p-4 md:p-5 rounded-[24px] shadow-2xl border border-slate-100 hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">100% Genuine OEM</h4>
                <p className="text-[11px] text-slate-500 font-medium">Certified Equipment & Reagents</p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div>
            <SectionTitle
              badge="Who We Are"
              title="India's Premier Biomedical & Clinical Diagnostic Partner"
              description="Rajbiosis Private Limited is a trusted supplier, stocking distributor, and technical service specialist for clinical laboratory instruments and diagnostic systems across India."
            />

            <p className="mt-6 text-slate-600 leading-8 text-base">
              At <strong className="text-slate-900">Rajbiosis Private Limited</strong>, headquartered in Jaipur, Rajasthan, we bridge the gap between world-class medical innovation and healthcare providers. We supply hematology analyzers, biochemistry instruments, electrolyte machines, urine analyzers, and rapid diagnostic testing kits to pathology labs and hospitals nationwide.
            </p>

            <p className="mt-4 text-slate-600 leading-8 text-base">
              Beyond equipment sales, we provide turnkey pathology laboratory setups, routine Preventive Maintenance (PM), Comprehensive Maintenance Contracts (CMC), breakdown service response, and genuine OEM spare parts supply to ensure your lab never experiences downtime.
            </p>

            {/* Core Feature Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex items-start gap-3">
                <CheckCircle2 className="text-red-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Certified Global Brands</h4>
                  <p className="text-slate-500 text-xs mt-1 leading-5">Authorized supply of Mindray, Erba, Roche, Sysmex, Meril, Agappe & Transasia products.</p>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex items-start gap-3">
                <CheckCircle2 className="text-red-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Rapid Pan-India Support</h4>
                  <p className="text-slate-500 text-xs mt-1 leading-5">On-site engineer visits, emergency breakdown assistance, and prompt reagent delivery.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Corporate Pillars / Why Partner With Us */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="bg-red-50 text-red-600 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full border border-red-100">
              Our Core Strengths
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
              What Sets Rajbiosis Private Limited Apart
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-5">
                <Microscope size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">High Precision Equipment</h3>
              <p className="text-slate-600 text-xs leading-6">
                Engineered for accurate testing, consistent calibration, and minimal reagent consumption.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-5">
                <PackageCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Stock & Reagent Supply</h3>
              <p className="text-slate-600 text-xs leading-6">
                Always-stocked warehouse ensuring timely delivery of biochemistry, hematology, and rapid test consumables.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5">
                <Wrench size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Expert Field Engineers</h3>
              <p className="text-slate-600 text-xs leading-6">
                Trained biomedical engineers equipped for immediate on-site repair and preventive maintenance.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-5">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Warranty & AMC Contracts</h3>
              <p className="text-slate-600 text-xs leading-6">
                Transparent maintenance packages giving lab operators operational peace of mind and cost control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="py-16 bg-slate-50 relative border-y border-slate-100">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[30px] shadow-sm border border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-6">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-600 text-sm leading-7">
                To empower healthcare providers across India with reliable diagnostic technologies, cutting-edge biomedical instruments, and rapid, accessible technical support.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[30px] shadow-sm border border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6">
                <Award size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
              <p className="text-slate-600 text-sm leading-7">
                To be recognized as India's most dependable and preferred partner for clinical laboratory equipment, turnkey diagnostic setups, and biomedical service excellence.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[30px] shadow-sm border border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <HeartHandshake size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Values</h3>
              <p className="text-slate-600 text-sm leading-7">
                Uncompromising diagnostic quality, absolute customer commitment, rapid technical responsiveness, and honest, transparent pricing in every transaction.
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
"use client";

import { useEffect, useState } from "react";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  Wrench,
  Activity,
  Award,
  Clock,
  CheckCircle2,
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const defaultServices = [
  {
    title: "Clinical Diagnostic Equipment Supply",
    desc: "Supply of advanced automated hematology 3-part & 5-part cell counters, clinical chemistry biochemistry analyzers, electrolyte analyzers, urine chemistry instruments, and ELISA readers for labs and hospitals.",
  },
  {
    title: "Annual & Comprehensive Maintenance (AMC / CMC)",
    desc: "Customized Annual Maintenance Contracts (AMC) and Comprehensive Maintenance Contracts (CMC) including preventive maintenance visits, emergency breakdown repairs, and routine instrument recalibrations.",
  },
  {
    title: "Equipment Installation, Calibration & Training",
    desc: "Precision installation, technical site validation, quality control benchmarking, and operational training for laboratory technicians and pathologists across India.",
  },
  {
    title: "OEM Reagents, Diluents & Rapid Test Kits",
    desc: "Always-in-stock supply of original biochemistry reagents, hematology diluents, electrolyte packs, calibrators, controls, and rapid diagnostic screening kits with pan-India express logistics.",
  },
  {
    title: "Turnkey Pathology Laboratory Consultancy",
    desc: "End-to-end consulting for new diagnostic setups, lab space layout design, instrument workflow optimization, NABL alignment guidance, and cost-effective equipment procurement.",
  },
  {
    title: "24/7 Technical Helpline & Emergency Breakdown Response",
    desc: "Dedicated technical phone support, quick engineer on-site dispatch, rapid troubleshooting, and replacement of genuine OEM spare parts to guarantee zero operational downtime.",
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState(defaultServices);
  const [loading, setLoading] = useState(true);

  const icons = [
    <Microscope key={0} size={30} className="text-red-600" />,
    <Wrench key={1} size={30} className="text-orange-500" />,
    <ShieldCheck key={2} size={30} className="text-emerald-600" />,
    <FlaskConical key={3} size={30} className="text-blue-600" />,
    <Activity key={4} size={30} className="text-purple-600" />,
    <Stethoscope key={5} size={30} className="text-red-500" />,
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const snap = await getDoc(
          doc(db, "websites", "aozellocom", "pages", "services")
        );

        if (snap.exists() && snap.data().services?.length > 1) {
          setServices(snap.data().services);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Our Services"
        subtitle="Delivering trusted biomedical, diagnostic analyzer, and laboratory services with innovation, precision, and healthcare excellence."
      />

      {/* Services Grid */}
      <section className="section-padding bg-white relative">
        <div className="container-custom">
          <SectionTitle
            badge="What We Offer"
            title="Premium Biomedical & Diagnostic Services"
            description="We provide innovative healthcare and biomedical solutions tailored for modern clinical diagnostics, pathology laboratories, and hospital excellence."
            center
          />

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-16">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-[30px] p-10 card-shadow border border-slate-100 animate-pulse"
                  >
                    <div className="w-20 h-20 rounded-3xl bg-slate-200 mb-8" />
                    <div className="h-8 bg-slate-200 rounded mb-6" />
                    <div className="space-y-3">
                      <div className="h-4 bg-slate-200 rounded" />
                      <div className="h-4 bg-slate-200 rounded w-11/12" />
                      <div className="h-4 bg-slate-200 rounded w-8/12" />
                    </div>
                  </div>
                ))
              : services.map((service, index) => (
                  <ServiceCard
                    key={index}
                    icon={icons[index % icons.length]}
                    title={service.title}
                    description={service.desc || service.description}
                  />
                ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services Grid */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="bg-red-500/20 text-red-400 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full border border-red-500/30">
              Why Choose Rajbiosis
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4">
              Healthcare Excellence You Can Rely On
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/80 border border-slate-700/60 p-8 rounded-3xl backdrop-blur-xl">
              <div className="w-14 h-14 rounded-2xl bg-red-600/20 text-red-400 flex items-center justify-center mb-6">
                <Award size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                100% Certified Genuine Parts
              </h3>
              <p className="text-slate-400 text-sm leading-7">
                All diagnostic analyzers, reagents, and spare parts supplied by Rajbiosis Private Limited meet strict ISO and medical compliance standards.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/60 p-8 rounded-3xl backdrop-blur-xl">
              <div className="w-14 h-14 rounded-2xl bg-orange-600/20 text-orange-400 flex items-center justify-center mb-6">
                <Clock size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Rapid On-Site Technical Response
              </h3>
              <p className="text-slate-400 text-sm leading-7">
                Our trained biomedical service engineers are available for fast on-site breakdown resolution and maintenance across all cities in India.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/60 p-8 rounded-3xl backdrop-blur-xl">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-6">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Comprehensive AMC / CMC Plans
              </h3>
              <p className="text-slate-400 text-sm leading-7">
                Flexible annual and comprehensive maintenance contracts designed to extend instrument lifespan and eliminate costly lab downtime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Working Process */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <SectionTitle
            badge="How We Work"
            title="Simple & Professional Process"
            description="We follow a streamlined 3-step process to deliver reliable biomedical and healthcare solutions."
            center
          />

          <div className="grid lg:grid-cols-3 gap-8 mt-16">
            {[
              {
                step: "01",
                title: "Consultation & Requirement Analysis",
                desc: "Understanding hospital and laboratory requirements, workload, instrument specifications, and budget guidelines.",
              },
              {
                step: "02",
                title: "Procurement & Professional Setup",
                desc: "Delivering genuine biomedical equipment, site preparation, precision calibration, and staff operational training.",
              },
              {
                step: "03",
                title: "Lifetime Maintenance & Support",
                desc: "Providing continuous technical assistance, preventive servicing, AMC support, and genuine reagent supply.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-[30px] p-8 card-shadow border border-slate-100 hover:shadow-xl transition-all duration-300"
              >
                <span className="text-5xl font-black text-red-100 block">
                  {item.step}
                </span>

                <h3 className="text-xl font-bold mt-5 text-slate-900">
                  {item.title}
                </h3>

                <p className="text-slate-600 mt-4 leading-7 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}
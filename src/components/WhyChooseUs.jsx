"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Microscope,
  HeartPulse,
  BadgeCheck,
} from "lucide-react";

import SectionTitle from "./SectionTitle";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Microscope size={30} />,
      title: "100% Genuine OEM Equipment",
      description:
        "Certified diagnostic analyzers and diagnostic kits direct from leading global medical equipment manufacturers.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Pan-India Service Support",
      description:
        "Fast on-site engineer dispatch, routine preventive maintenance, and express replacement spare parts.",
    },
    {
      icon: <HeartPulse size={30} />,
      title: "Diagnostic Precision",
      description:
        "Rigorous quality control and standard calibrations ensuring precise, reliable laboratory test results.",
    },
    {
      icon: <BadgeCheck size={30} />,
      title: "Transparent & Fair Pricing",
      description:
        "Competitive pricing models on equipment, reagents, and maintenance contracts with zero hidden charges.",
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">

        {/* Section Title */}
        <SectionTitle
          badge="Why Choose Rajbiosis"
          title="Your Trusted Partner in Clinical Diagnostics"
          description="We empower healthcare facilities and clinical laboratories across India with high-precision instruments, original reagents, and fast technical support."
          center
        />

        {/* Cards */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-16">

          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{
                once: true,
              }}
              className="bg-slate-50 p-8 rounded-[28px] border border-slate-100 hover:-translate-y-2 transition-all duration-300 card-shadow"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-6">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-4 text-slate-900">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 leading-7">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
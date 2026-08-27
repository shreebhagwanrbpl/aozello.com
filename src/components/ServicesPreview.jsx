"use client";

import { motion } from "framer-motion";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import SectionTitle from "./SectionTitle";
import ServiceCard from "./ServiceCard";

export default function ServicesPreview() {
  const services = [
    {
      icon: <Microscope size={30} />,
      title: "Diagnostic Equipment Supply",
      description:
        "Fully automated hematology counters, biochemistry analyzers, and electrolyte testing instruments engineered for clinical precision.",
    },
    {
      icon: <FlaskConical size={30} />,
      title: "OEM Reagents & Supplies",
      description:
        "High-grade biochemistry reagents, diluents, calibrators, and rapid diagnostic test kits with fast pan-India express dispatch.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "AMC / CMC Maintenance",
      description:
        "Flexible Annual & Comprehensive Maintenance Contracts to eliminate laboratory downtime and extend instrument lifespan.",
    },
    {
      icon: <Stethoscope size={30} />,
      title: "Turnkey Lab Consultancy",
      description:
        "End-to-end consulting, spatial layout planning, equipment procurement, and technician operational training for new labs.",
    },
  ];

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-orange-50">

      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-red-500/10 blur-3xl"></div>
      <div className="absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-red-400/10 blur-3xl"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ef444415_1px,transparent_1px),linear-gradient(to_bottom,#ef444415_1px,transparent_1px)] bg-[size:48px_48px]"></div>

      <div className="container-custom relative z-10">

        {/* Title */}
        <SectionTitle
          badge="Our Services"
          title="Everything Your Laboratory Needs"
          description="From essential laboratory supplies to specialized diagnostic equipment, we help healthcare facilities source the products they need from one place. Our solutions are selected to support everyday testing, laboratory efficiency, and dependable clinical operations.
        Medical Equipment • Lab Consumables • Diagnostic Products • Technical Assistance"
          center
        />

        {/* Services */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-16">

          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 60,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              whileHover={{
                y: -12,
                scale: 1.03,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
              }}
              viewport={{
                once: true,
              }}
              className="group relative overflow-hidden rounded-3xl"
            >

              {/* Animated Top Border */}
              <div className="absolute left-0 top-0 z-20 h-1 w-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400"></div>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/10 via-transparent to-orange-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

              {/* Card */}
              <div className="relative rounded-3xl border border-red-100 bg-white backdrop-blur-xl shadow-xl shadow-red-100/30 transition-all duration-500 group-hover:border-red-300 group-hover:shadow-2xl group-hover:shadow-red-200/40">

                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                />

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}
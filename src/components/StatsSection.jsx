"use client";

import { motion } from "framer-motion";
import {
  Users,
  FlaskConical,
  BadgeCheck,
  Building2,
} from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      icon: <Building2 size={34} />,
      number: "10+",
      label: "Years Experience",
    },
    {
      icon: <FlaskConical size={34} />,
      number: "500+",
      label: "Biomedical Products",
    },
    {
      icon: <Users size={34} />,
      number: "200+",
      label: "Trusted Clients",
    },
    {
      icon: <BadgeCheck size={34} />,
      number: "100%",
      label: "Quality Assurance",
    },
  ];

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-rose-50 via-white to-orange-50">

      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-red-300/10 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-orange-300/10 blur-3xl"></div>

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:45px_45px]"></div>

      <div className="container-custom relative z-10">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">

          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -12,
                scale: 1.04,
              }}
              transition={{
                duration: 0.45,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-[30px] border border-red-100 bg-white/80 backdrop-blur-xl p-10 shadow-xl transition-all duration-300 hover:border-red-300 hover:shadow-2xl"
            >

              {/* Gradient Border */}
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400"></div>

              {/* Decorative Circle */}
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br from-red-100 to-orange-100 opacity-50 transition-all duration-500 group-hover:scale-125"></div>

              {/* Icon */}
              <div className="relative mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-red-600 via-red-500 to-orange-500 text-white shadow-xl transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                {item.icon}
              </div>

              {/* Number */}
              <h3 className="text-center text-5xl font-black bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                {item.number}
              </h3>

              {/* Label */}
              <p className="mt-4 text-center text-lg font-medium text-slate-600">
                {item.label}
              </p>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}
"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

export default function Testimonials() {
  const reviews = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Senior Consultant Pathologist",
      review:
        "Rajbiosis Private Limited has been our trusted partner for automated biochemistry analyzers and electrolyte reagents. Their prompt technical response and original OEM quality give us total confidence.",
    },
    {
      name: "Amit Sharma",
      role: "Diagnostic Lab Director",
      review:
        "Outstanding AMC support and super fast delivery of hematology reagents. Their engineers solved our analyzer breakdown on the very same day. Highly recommended across Rajasthan and beyond!",
    },
    {
      name: "Dr. Neha Verma",
      role: "Head of Hospital Diagnostics",
      review:
        "Setting up our clinical pathology lab with Rajbiosis was smooth and hassle-free. From instrument installation to staff operational training, their team delivered 100% professionalism.",
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-rose-50 via-white to-orange-50 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-80 w-80 rounded-full bg-red-300/10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-orange-300/10 blur-3xl"></div>

      <div className="container-custom relative z-10">

        <SectionTitle
          badge="Client Testimonials"
          title="Trusted by Healthcare Leaders Across India"
          description="Hear what pathologists, lab directors, and hospital administrators say about Rajbiosis Private Limited."
          center
        />

        <div className="grid lg:grid-cols-3 gap-8 mt-16">

          {reviews.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="group relative overflow-hidden rounded-3xl border border-red-100 bg-white/90 backdrop-blur-xl p-8 shadow-xl shadow-red-100/30 transition-all duration-300 hover:border-red-200 hover:shadow-2xl"
            >

              {/* Top Gradient Line */}
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-400"></div>

              {/* Quote Icon */}
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-orange-500 text-2xl text-white shadow-lg">
                ❝
              </div>

              {/* Stars */}
              <div className="mb-5 flex gap-1 text-xl text-amber-400">
                ★★★★★
              </div>

              {/* Review */}
              <p className="leading-8 text-slate-600 italic">
                "{item.review}"
              </p>

              {/* Divider */}
              <div className="my-6 h-px bg-gradient-to-r from-transparent via-red-200 to-transparent"></div>

              {/* User */}
              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-orange-500 text-lg font-bold text-white">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-900">
                    {item.name}
                  </h4>

                  <p className="text-sm text-red-600 font-medium">
                    {item.role}
                  </p>
                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
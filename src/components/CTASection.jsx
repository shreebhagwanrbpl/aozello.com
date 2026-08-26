"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PhoneCall,
} from "lucide-react";

export default function CTASection({ city }) {

  const pathname = usePathname();

  const staticRoutes = [
    "about",
    "services",
    "products",
    "contact",
    "items",
    "enquiry",
  ];

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const urlDistrict =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : urlDistrict;

  const makeLink = (path) => {
    if (!districtSlug) return path;

    if (path === "/") {
      return `/${districtSlug}`;
    }

    return `/${districtSlug}${path}`;
  };

  return (
    <section className="section-padding bg-gradient-to-br from-rose-50 via-white to-orange-50">
      <div className="container-custom">

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          viewport={{
            once: true,
          }}
          className="relative overflow-hidden rounded-[42px]  p-10 lg:p-20 text-red-400 shadow-2xl"
        >

          {/* Background Glow */}
          <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-[120px]" />

          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-yellow-300/10 blur-[120px]" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div>

              <span className="inline-flex items-center rounded-full border text-white border-white/20 bg-slate-900/80 px-5 py-2 text-sm font-semibold backdrop-blur-lg">
                Get In Touch With Experts
              </span>

              <h2 className="mt-6 text-4xl lg:text-5xl font-black leading-tight text-slate-900">
                Ready to Upgrade Your Laboratory Setup?
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Partner with Rajbiosis Private Limited for advanced clinical analyzers, OEM testing reagents, and fast breakdown service support.
              </p>

            </div>

            {/* Right Card */}
            <div className="flex lg:justify-end">

              <div className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-2xl border border-slate-100">

                {/* Icon */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                  <PhoneCall size={30} />
                </div>

                {/* Heading */}
                <h3 className="text-3xl font-bold text-slate-900">
                  Speak With Our Specialists
                </h3>

                {/* Text */}
                <p className="mt-4 leading-7 text-slate-600">
                  Call our technical team for instant equipment pricing, AMC quotes, or reagent availability.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-col gap-4">

                  <Link
                    href={makeLink("/contact")}
                    className="w-full"
                  >
                    <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 px-6 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
                      Send An Inquiry
                      <ArrowRight size={18} />
                    </button>
                  </Link>

                  <a
                    href="tel:+919983123469"
                    className="rounded-2xl border-2 border-red-200 px-6 py-4 text-center font-semibold text-red-600 transition-all duration-300 hover:bg-red-50 flex items-center justify-center gap-2"
                  >
                    Call Now (+91 9983123469)
                  </a>

                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
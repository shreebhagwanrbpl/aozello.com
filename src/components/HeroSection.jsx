"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import {
  ArrowRight,
  ShieldCheck,
  BadgeCheck,
  Microscope,
} from "lucide-react";

export default function  HeroSection({ city }) {
  const [loading, setLoading] = useState(true);

  const [heroData, setHeroData] = useState({
    title: "",
    description: "",
    button1Text: "",
    button2Text: "",
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const snap = await getDoc(
          doc(db, "websites", "aozellocom", "pages", "home")
        );

        if (snap.exists()) {
          setHeroData(snap.data());
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // District routing
  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : "";

  const makeLink = (path) => {
    return districtSlug ? `/${districtSlug}${path}` : path;
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-red-50/30 to-orange-50/40">
      {/* Soft Background */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-red-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-orange-400/10 blur-3xl" />

      <div className="container-custom relative z-10 grid min-h-[68vh] items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-12">
        {/* ================= LEFT ================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-2xl"
        >
          {/* Small Trust Label */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-red-100 bg-white px-4 py-2 shadow-sm">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-orange-500 text-white">
              <ShieldCheck size={16} />
            </span>

            <span className="text-sm font-semibold text-slate-700">
              Trusted Biomedical Systems
            </span>
          </div>

          {/* Heading */}
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-12 w-[90%] rounded-xl bg-red-100" />
              <div className="h-12 w-[72%] rounded-xl bg-red-100" />
            </div>
          ) : (
            <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-[56px] xl:text-[60px]">
              {heroData.title}

              {city && (
                <span className="mt-2 block text-3xl font-extrabold sm:text-4xl">
                  <span className="bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                    in {city}
                  </span>
                </span>
              )}
            </h1>
          )}


          {/* Accent — Only on district/city pages */}
          {city && (
            <div className="mt-5 flex items-center gap-2">
              <span className="h-1 w-10 rounded-full bg-red-600" />
              <span className="h-1 w-4 rounded-full bg-orange-400" />
            </div>
          )}

          {/* Description */}
          {loading ? (
            <div className="mt-6 animate-pulse space-y-3">
              <div className="h-4 w-full rounded bg-red-100" />
              <div className="h-4 w-[90%] rounded bg-red-100" />
              <div className="h-4 w-[70%] rounded bg-red-100" />
            </div>
          ) : (
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              {heroData.description}

              {city && (
                <>
                  {" "}
                  Serving healthcare facilities and laboratories across{" "}
                  <span className="font-semibold text-slate-800">
                    {city}
                  </span>
                  .
                </>
              )}
            </p>
          )}

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            {loading ? (
              <>
                <div className="h-12 w-44 animate-pulse rounded-xl bg-red-100" />
                <div className="h-12 w-36 animate-pulse rounded-xl bg-red-100" />
              </>
            ) : (
              <>
                <Link href={makeLink("/items")}>
                  <button className="group inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 px-6 font-semibold text-white shadow-lg shadow-red-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    {heroData.button1Text || "Explore Products"}

                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </Link>

                <Link href={makeLink("/contact")}>
                  <button className="h-11 rounded-xl border border-slate-200 bg-white px-6 font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:bg-red-50 hover:text-red-600">
                    {heroData.button2Text || "Contact Us"}
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Compact Trust Points */}
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-slate-200 pt-5">
            <div className="flex items-center gap-2">
              <BadgeCheck size={18} className="text-red-600" />
              <span className="text-sm font-medium text-slate-600">
                Quality-focused solutions
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Microscope size={18} className="text-red-600" />
              <span className="text-sm font-medium text-slate-600">
                Biomedical & Diagnostic
              </span>
            </div>
          </div>
        </motion.div>

        {/* ================= RIGHT ================= */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[460px]">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-[32px] border border-white bg-white p-2.5 shadow-2xl shadow-slate-300/40">
              <div className="relative aspect-[4/4.1] overflow-hidden rounded-[26px] bg-slate-100">
                <img
                  src="/images/hero-biomedical.png"
                  alt="Rajbiosis Private Limited Biomedical Equipment"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />

                {/* Image Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/40 to-transparent p-6">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-slate-800 shadow-lg">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    Biomedical & Diagnostic Solutions
                  </div>
                </div>
              </div>
            </div>

            {/* Small Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -left-4 top-10 hidden rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl sm:block lg:-left-8"
            >
              <div className="text-xl font-black text-red-600">500+</div>
              <div className="text-xs font-medium text-slate-500">
                Products Delivered
              </div>
            </motion.div>

            {/* Bottom Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="absolute -bottom-4 right-4 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl lg:-right-6"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <ShieldCheck size={16} />
                </div>

                <div>
                  <div className="text-sm font-bold text-slate-800">
                    Trusted Solutions
                  </div>
                  <div className="text-xs text-slate-500">
                    Healthcare focused
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import CBG from "../components/img/CBG.png";

import {
  ArrowRight,
  ShieldCheck,
  Microscope,
  BadgeCheck,
} from "lucide-react";

export default function HeroSection({ city }) {
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

  // District Routing
  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : "";

  const makeLink = (path) => {
    return districtSlug ? `/${districtSlug}${path}` : path;
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-orange-50">

      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-red-400/15 blur-3xl"></div>

      <div className="absolute top-10 right-[-8rem] h-[24rem] w-[24rem] rounded-full bg-orange-400/15 blur-3xl"></div>

      <div className="absolute bottom-[-8rem] left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-amber-300/20 blur-3xl"></div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:48px_48px]"></div>

      {/* Decorative Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.08),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.08),transparent_45%)]"></div>

      <div className="container-custom relative z-10 min-h-[85vh] py-20 lg:py-0 grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >

          {/* Premium Badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-red-200 bg-white/90 backdrop-blur-xl px-5 py-3 shadow-xl shadow-red-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-red-200">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-600 via-red-500 to-orange-500 text-white shadow-lg">
              <ShieldCheck size={18} />
            </div>

            <span className="text-sm font-semibold tracking-wide text-slate-800">
              Trusted Biomedical Systems
            </span>

          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.02] tracking-tight text-slate-900">
            {loading ? (
              <div className="animate-pulse space-y-5">
                <div className="h-12 bg-red-100 rounded-xl w-[85%]"></div>
                <div className="h-12 bg-red-100 rounded-xl w-[70%]"></div>
                <div className="h-12 bg-red-100 rounded-xl w-[60%]"></div>
              </div>
            ) : (
              <>
                {heroData.title}

                {city && (
                  <>
                    <br />

                    <span className="mt-3 inline-block bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 bg-clip-text text-transparent text-3xl lg:text-5xl font-extrabold">
                      in {city}
                    </span>
                  </>
                )}
              </>
            )}
          </h1>

          {/* Description */}
          {loading ? (
            <div className="animate-pulse mt-8 space-y-3">
              <div className="h-4 bg-red-100 rounded-full w-full"></div>
              <div className="h-4 bg-red-100 rounded-full w-[90%]"></div>
              <div className="h-4 bg-red-100 rounded-full w-[75%]"></div>
            </div>
          ) : (
            <p className="mt-8 text-lg md:text-xl leading-9 text-slate-600">
              {heroData.description}

              {city && (
                <>
                  {" "}
                  across{" "}
                  <span className="font-semibold text-red-600">
                    {city}
                  </span>
                </>
              )}
            </p>
          )}

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-5">
            {loading ? (
              <>
                <div className="animate-pulse h-14 w-48 rounded-xl bg-red-100"></div>
                <div className="animate-pulse h-14 w-40 rounded-xl bg-red-100"></div>
              </>
            ) : (
              <>
                <Link href={makeLink("/services")}>
                  <button className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-orange-500 px-8 py-4 font-semibold text-white shadow-xl shadow-red-300/40 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-red-400/50">
                    {heroData.button1Text || "Explore Services"}

                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1.5"
                    />
                  </button>
                </Link>

                <Link href={makeLink("/contact")}>
                  <button className="rounded-xl border border-red-200 bg-white/90 backdrop-blur-xl px-8 py-4 font-semibold text-slate-700 shadow-lg transition-all duration-300 hover:border-red-500 hover:bg-red-50 hover:text-red-600 hover:-translate-y-1">
                    {heroData.button2Text || "Contact Us"}
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-5">

            <div className="rounded-3xl border border-red-100 bg-white/90 backdrop-blur-xl p-6 shadow-xl shadow-red-100/40 transition-all duration-300 hover:-translate-y-2 hover:border-red-200 hover:shadow-red-200">
              <h3 className="text-4xl font-black bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                10+
              </h3>

              <p className="mt-2 text-sm font-medium text-slate-500">
                Years Experience
              </p>
            </div>

            <div className="rounded-3xl border border-red-100 bg-white/90 backdrop-blur-xl p-6 shadow-xl shadow-red-100/40 transition-all duration-300 hover:-translate-y-2 hover:border-red-200 hover:shadow-red-200">
              <h3 className="text-4xl font-black bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                500+
              </h3>

              <p className="mt-2 text-sm font-medium text-slate-500">
                Products Delivered
              </p>
            </div>

            <div className="rounded-3xl border border-red-100 bg-white/90 backdrop-blur-xl p-6 shadow-xl shadow-red-100/40 transition-all duration-300 hover:-translate-y-2 hover:border-red-200 hover:shadow-red-200">
              <h3 className="text-4xl font-black bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                100%
              </h3>

              <p className="mt-2 text-sm font-medium text-slate-500">
                Quality Assurance
              </p>
            </div>

          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex justify-center items-center"
        >

          <div className="relative">

            {/* Main Rounded Frame with Brand New Photorealistic Image */}
            <div className="h-[480px] w-[500px] rounded-[36px] overflow-hidden bg-white shadow-2xl border border-slate-100 relative flex items-center justify-center p-3">
              <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-slate-50">
                <img
                  src="/images/hero-biomedical.png"
                  alt="Rajbiosis Private Limited Biomedical Equipment"
                  className="w-full h-full object-cover rounded-[28px] hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Floating Card 1 */}
            <div className="absolute -left-10 top-20 rounded-2xl bg-white p-5 shadow-xl">
              <h4 className="text-red-600 font-bold">500+</h4>
              <p className="text-sm text-gray-500">Installations</p>
            </div>

            {/* Floating Card 2 */}
            <div className="absolute -right-10 bottom-20 rounded-2xl bg-white p-5 shadow-xl">
              <h4 className="text-red-600 font-bold">ISO</h4>
              <p className="text-sm text-gray-500">Certified</p>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
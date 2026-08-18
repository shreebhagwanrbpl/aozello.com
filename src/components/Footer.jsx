"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  const [contactInfo, setContactInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] = useState(null);

  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);

  const staticRoutes = [
    "about",
    "services",
    "products",
    "contact",
    "items",
  ];

  const district =
    pathParts.length > 0 && !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  useEffect(() => {
    const loadContact = async () => {
      try {
        const snap = await getDoc(
          doc(db, "websites", "aozellocom", "pages", "contact")
        );

        if (snap.exists()) {
          setContactInfo(snap.data().contactInfo || []);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    loadContact();
  }, []);

  useEffect(() => {
    const loadDistrict = async () => {
      if (!district) return;

      try {
        const snap = await getDoc(
          doc(db, "websites", "aozellocom", "districts", district)
        );

        if (snap.exists()) {
          setDistrictData(snap.data());
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadDistrict();
  }, [district]);

  const displayPhone = "9983123469";
  const telNumber = "+919983123469";
  const email = "rajbiosis@yahoo.in";
  const defaultAddress =
    "F-4, 1st Floor, Plot No. 16, D-Block Tagor Nagar, on Ajmer-Delhi, 200 Feet Bypass Rd, Jaipur, Rajasthan 302021";

  const dynamicAddress = districtData
    ? `${districtData.district}, ${districtData.state}, India`
    : defaultAddress;

  const makeLink = (path) => {
    if (!district) return path;
    if (path === "/") return `/${district}`;
    return `/${district}${path}`;
  };

  const footerCategories = [
    "Electrolyte Reagents",
    "Rapid Test Kits",
    "Hematology",
    "Biochemistry",
    "Diagnostic Equipment",
  ];

  if (loading) {
    return (
      <footer className="bg-white border-t border-slate-200">
        <div className="container-custom py-16">
          <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-10">
            {[...Array(5)].map((_, i) => (
              <div key={i}>
                <div className="h-8 w-40 bg-slate-200 rounded animate-pulse mb-6" />
                {[...Array(5)].map((_, j) => (
                  <div
                    key={j}
                    className="h-5 bg-slate-200 rounded animate-pulse mb-4"
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="border-t border-slate-200 mt-12 pt-6">
            <div className="h-5 w-72 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-8">
          {/* Company Brand Column */}
          <div className="lg:col-span-1">
            <Link href={makeLink("/")} className="flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="Rajbiosis Private Limited"
                className="h-10 w-auto object-contain"
              />
              <span className="text-base font-bold text-slate-900 leading-tight">
                Rajbiosis <span className="text-red-600">Private Limited</span>
              </span>
            </Link>

            <p className="mt-4 text-slate-600 text-sm leading-6">
              Delivering trusted diagnostic and biomedical solutions with
              innovation, quality, and precision healthcare support.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://www.instagram.com/rajbiosisindia/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/rajbiosispvtltd/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                <FaFacebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-slate-900">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-sm text-slate-600">
              <Link href={makeLink("/")} className="hover:text-red-600 transition">
                Home
              </Link>
              <Link href={makeLink("/about")} className="hover:text-red-600 transition">
                About
              </Link>
              <Link href={makeLink("/services")} className="hover:text-red-600 transition">
                Services
              </Link>
              <Link href={makeLink("/items")} className="hover:text-red-600 transition">
                Products
              </Link>
              <Link href={makeLink("/contact")} className="hover:text-red-600 transition">
                Contact
              </Link>
            </div>
          </div>

          {/* Product Categories Column */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-slate-900">
              Product Categories
            </h3>

            <div className="flex flex-col gap-3 text-sm text-slate-600">
              {footerCategories.map((cat) => {
                const catSlug = cat.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
                return (
                  <Link
                    key={cat}
                    href={`/category/${catSlug}`}
                    className="hover:text-red-600 transition"
                  >
                    {cat}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-slate-900">
              Services
            </h3>

            <div className="flex flex-col gap-3 text-sm text-slate-600">
              <p>Diagnostic Equipment</p>
              <p>Laboratory Solutions</p>
              <p>Biomedical Instruments</p>
              <p>Maintenance Support</p>
            </div>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-slate-900">
              Contact Info
            </h3>

            <div className="space-y-4 text-sm text-slate-600">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 text-white flex items-center justify-center shadow-md flex-shrink-0 mt-0.5">
                  <MapPin size={16} />
                </div>
                <p className="leading-6 text-xs text-slate-700">
                  {dynamicAddress}
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 text-white flex items-center justify-center shadow-md flex-shrink-0">
                  <Phone size={16} />
                </div>
                <a
                  href={`tel:${telNumber}`}
                  className="hover:text-red-600 transition font-bold text-slate-800 text-sm"
                >
                  +91 {displayPhone}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 text-white flex items-center justify-center shadow-md flex-shrink-0">
                  <Mail size={16} />
                </div>
                <a
                  href={`mailto:${email}`}
                  className="hover:text-red-600 transition font-medium text-slate-700 text-xs"
                >
                  {email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© 2026 Rajbiosis Private Limited. All rights reserved.</p>
          <p className="mt-3 md:mt-0">
            Designed with precision for modern diagnostics.
          </p>
        </div>
      </div>
    </footer>
  );
}
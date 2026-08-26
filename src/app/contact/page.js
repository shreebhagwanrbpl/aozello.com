"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin, Clock3 } from "lucide-react";

import PageBanner from "@/components/PageBanner";
import CTASection from "@/components/CTASection";

export default function ContactPage() {
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);
  const currentDistrict = pathParts.length > 0 ? pathParts[0] : null;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!form.name.trim()) {
      return toast.error("Name is required");
    }

    if (!emailRegex.test(form.email)) {
      return toast.error("Enter valid email");
    }

    if (!phoneRegex.test(form.phone)) {
      return toast.error("Enter valid mobile number");
    }

    if (!form.message.trim()) {
      return toast.error("Message is required");
    }

    try {
      setSubmitting(true);

      await addDoc(
        collection(db, "websitesQueries", "aozellocom", "contactQueries"),
        {
          ...form,
          createdAt: new Date(),
        }
      );

      toast.success("Message submitted successfully");

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const loadDistrict = async () => {
      if (!currentDistrict) return;

      try {
        const snap = await getDoc(
          doc(db, "websites", "aozellocom", "districts", currentDistrict)
        );

        if (snap.exists()) {
          setDistrictData(snap.data());
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadDistrict();
    setLoading(false);
  }, [currentDistrict]);

  const phone = "9983123469";
  const telNumber = "+919983123469";
  const email = "rajbiosis@yahoo.in";
  const defaultAddress =
    "F-4, 1st Floor, Plot No. 16, D-Block Tagor Nagar, on Ajmer-Delhi, 200 Feet Bypass Rd, Jaipur, Rajasthan 302021";
  const workingHours = "9:00 AM - 9:00 PM";

  const dynamicAddress = districtData
    ? `${districtData.district}, ${districtData.state}, India`
    : defaultAddress;

  const mapAddress = encodeURIComponent(defaultAddress);

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="h-12 w-64 bg-slate-200 rounded animate-pulse mb-8" />
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-28 bg-slate-200 rounded-3xl animate-pulse mb-6"
                />
              ))}
            </div>
            <div className="bg-white p-10 rounded-3xl">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-14 bg-slate-200 rounded-2xl animate-pulse mb-5"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Contact Rajbiosis Private Limited"
        subtitle="Get in touch with our biomedical specialists for equipment inquiries, reagent orders, AMC support, or turnkey laboratory consultancy."
      />

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="container-custom grid lg:grid-cols-2 gap-14">
          {/* Left Info */}
          <div>
            <span className="inline-block bg-red-50 text-red-700 px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider mb-5 border border-red-100">
              Get In Touch
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              Connect With Our Biomedical Experts
            </h2>

            <p className="text-slate-600 mt-4 text-base leading-8">
              Whether you need urgent breakdown assistance, price quotations for diagnostic analyzers, OEM reagent supplies, or advice on setting up a new lab, our experienced team is here to assist you.
            </p>

            {/* Contact Cards */}
            <div className="space-y-5 mt-8">
              {/* Phone Card */}
              <div className="flex items-start gap-5 bg-slate-50 p-6 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-md transition duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-red-500/20 flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900">Phone Number</h4>
                  <a
                    href={`tel:${telNumber}`}
                    className="text-slate-700 hover:text-red-600 transition font-bold text-lg mt-1 inline-block">
                    +91 {phone}
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="flex items-start gap-5 bg-slate-50 p-6 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-md transition duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-red-500/20 flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900">Email Address</h4>
                  <a
                    href={`mailto:${email}`}
                    className="text-slate-700 hover:text-red-600 transition font-medium mt-1 inline-block text-base"
                  >
                    {email}
                  </a>
                </div>
              </div>

              {/* Office Address Card */}
              <div className="flex items-start gap-5 bg-slate-50 p-6 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-md transition duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-red-500/20 flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900">Office Address</h4>
                  <p className="text-slate-600 mt-1 text-sm leading-6">
                    {dynamicAddress}
                  </p>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="flex items-start gap-5 bg-slate-50 p-6 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-md transition duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-red-500/20 flex-shrink-0">
                  <Clock3 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900">Working Hours</h4>
                  <p className="text-slate-700 font-semibold mt-1 text-base">
                    {workingHours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-white rounded-[36px] p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-slate-100">
            <h3 className="text-3xl font-extrabold text-slate-900">
              Send Us Message
            </h3>
            <p className="text-slate-500 mt-2 text-sm">
              Fill out the form and our team will contact you soon.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 text-sm transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 text-sm transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 text-sm transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Inquiry subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 text-sm transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Message *
                </label>
                <textarea
                  rows={4}
                  name="message"
                  placeholder="Your message details..."
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 text-sm transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-4 rounded-xl font-bold text-base shadow-lg shadow-red-500/20 transition cursor-pointer disabled:opacity-50 mt-2"
              >
                {submitting ? "Submitting..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="pb-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-slate-900">Locate Our Office</h3>
            <p className="text-slate-500 text-sm mt-1">Visit our office on Ajmer-Delhi 200 Feet Bypass Road, Jaipur, Rajasthan</p>
          </div>
          <div className="rounded-[36px] overflow-hidden border border-slate-200 shadow-xl">
            <iframe
              src={`https://maps.google.com/maps?q=${mapAddress}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="480"
              loading="lazy"
              className="border-0 w-full"
              title="Rajbiosis Private Limited Office Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}
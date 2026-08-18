import Home from "@/app/page";
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from "@/lib/seo-utils";
import Link from "next/link";
import { MAIN_CATEGORIES, FEATURED_BRANDS } from "@/lib/constants";

export default async function DistrictPage({ params }) {
  const { district = "jaipur" } = await params;

  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const localBusinessSchema = generateLocalBusinessSchema(districtName);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: `${districtName} Biomedical Hub`, url: `/${district}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Location Service Banner Notice */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 border-b border-red-700">
        <div className="container-custom flex items-center justify-between text-xs md:text-sm font-semibold">
          <span>📍 Serving Hospitals & Pathology Labs in {districtName} & Nearby Regions</span>
          <a href="tel:+919983123469" className="underline hover:text-amber-200">
            Helpline: +91 9983123469
          </a>
        </div>
      </div>

      <Home city={districtName} />

      {/* Location Entity SEO Information & Internal Link Hub */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="container-custom">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Biomedical & Laboratory Equipment Supply in {districtName}
              </h2>
              <p className="text-slate-600 mt-2 text-sm leading-relaxed">
                Rajbiosis Private Limited provides dedicated sales, distribution, express reagent supply, and technical maintenance services for medical facilities throughout {districtName}. We empower pathology laboratories, diagnostic centers, government and private hospitals with certified hematology cell counters, biochemistry analyzers, electrolyte devices, and rapid screening test kits.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-4 border-t border-slate-100 text-xs md:text-sm">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-1">Local Installation & AMC</h3>
                <p className="text-slate-600">On-site engineer support, preventive maintenance, and calibration across {districtName}.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-1">OEM Reagents & Supplies</h3>
                <p className="text-slate-600">Original reagents, controls, calibrators, and rapid test kits delivered with fast turnaround.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-1">Quotations & Pricing</h3>
                <p className="text-slate-600">Transparent pricing, formal quotations, and tender assistance for healthcare setup in {districtName}.</p>
              </div>
            </div>

            {/* Quick Links for Category and Brand Intent */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-base font-bold text-slate-900 mb-3">
                Biomedical Equipment Categories Available in {districtName}
              </h3>
              <div className="flex flex-wrap gap-2">
                {MAIN_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium hover:bg-red-50 hover:text-red-600 transition"
                  >
                    {cat.name} in {districtName}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
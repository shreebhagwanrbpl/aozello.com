export default function SeoContent({ city = "" }) {
    const location = city || "India";

    return (
        <section className="py-20 bg-white">
            <div className="container-custom">

                <h2 className="text-4xl font-bold text-slate-900 mb-8">
                    Biomedical & Clinical Diagnostic Equipment Supplier in {location}
                </h2>

                <div className="space-y-6 text-slate-600 leading-8 text-lg">

                    <p>
                        <strong className="text-slate-900">Rajbiosis Private Limited</strong> is a leading supplier, distributor, and service provider of advanced biomedical equipment and diagnostic analyzers in {location}. We specialize in fully automated Hematology Analyzers (3-Part & 5-Part CBC machines), Biochemistry Analyzers, Electrolyte Analyzers, Urine Analyzers, ELISA Readers, and rapid diagnostic test kits for hospitals, pathology labs, and clinical diagnostic centers.
                    </p>

                    <p>
                        Our mission is to deliver dependable, high-precision laboratory instruments and original OEM reagents to healthcare professionals across India. Partnering with global leaders such as Mindray, Erba, Roche, Sysmex, Meril, Agappe, and Transasia, we ensure superior diagnostic accuracy and seamless laboratory workflows.
                    </p>

                    <p>
                        We offer comprehensive technical support including on-site equipment installation, precision calibration, Annual Maintenance Contracts (AMC), Comprehensive Maintenance Contracts (CMC), breakdown repair, and technician operational training.
                    </p>

                    <p>
                        Whether setting up a new diagnostic lab or upgrading your existing clinical instruments, Rajbiosis Private Limited provides tailored, cost-effective solutions backed by pan-India express logistics.
                    </p>

                </div>

                {/* FAQ Section */}

                <div className="mt-16 border-t border-slate-100 pt-12">

                    <h2 className="text-3xl font-bold text-slate-900 mb-8">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-6">

                        <div>
                            <h3 className="font-semibold text-xl text-slate-900">
                                Do you supply diagnostic analyzers and reagents across India?
                            </h3>

                            <p className="text-slate-600 mt-2">
                                Yes, Rajbiosis Private Limited supplies biomedical instruments, OEM reagents, and diagnostic consumables across all states and districts in India with fast express delivery.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-xl text-slate-900">
                                Which clinical laboratory instruments do you supply?
                            </h3>

                            <p className="text-slate-600 mt-2">
                                We supply CBC Hematology Analyzers, Semi & Fully Automated Biochemistry Analyzers, Electrolyte Analyzers, Urine Chemistry Analyzers, Rapid Diagnostic Kits, and ELISA Readers.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-xl text-slate-900">
                                Do you provide AMC / CMC maintenance and breakdown support?
                            </h3>

                            <p className="text-slate-600 mt-2">
                                Yes, we provide Annual Maintenance Contracts (AMC), Comprehensive Maintenance Contracts (CMC), rapid engineer dispatch, emergency breakdown repairs, and genuine replacement spare parts.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-xl text-slate-900">
                                Can you assist in setting up a new pathology laboratory?
                            </h3>

                            <p className="text-slate-600 mt-2">
                                Absolutely. We offer end-to-end turnkey lab setup consulting, space layout planning, equipment selection, installation, calibration, and operational training for your lab technicians.
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}
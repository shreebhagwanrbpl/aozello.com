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
        Need to Know More?
    </h2>

    <div className="space-y-6">

        <div>
            <h3 className="font-semibold text-xl text-slate-900">
                What types of laboratory products can I purchase from you?
            </h3>

            <p className="text-slate-600 mt-2">
                We offer a wide range of laboratory and diagnostic products, including
                hematology analyzers, biochemistry systems, electrolyte analyzers,
                urine analyzers, diagnostic kits, reagents, consumables, and other
                essential laboratory equipment.
            </p>
        </div>

        <div>
            <h3 className="font-semibold text-xl text-slate-900">
                Are your products suitable for hospitals and diagnostic laboratories?
            </h3>

            <p className="text-slate-600 mt-2">
                Yes. Our product range is suitable for hospitals, pathology labs,
                diagnostic centers, clinics, medical institutions, and other
                healthcare facilities with different testing requirements.
            </p>
        </div>

        <div>
            <h3 className="font-semibold text-xl text-slate-900">
                Do you offer support after the purchase?
            </h3>

            <p className="text-slate-600 mt-2">
                We provide product guidance and technical assistance to help customers
                with equipment installation, operation, maintenance, troubleshooting,
                and other service requirements.
            </p>
        </div>

        <div>
            <h3 className="font-semibold text-xl text-slate-900">
                Can you help us choose the right equipment for our laboratory?
            </h3>

            <p className="text-slate-600 mt-2">
                Certainly. Our team can understand your laboratory requirements,
                testing volume, workflow, and application needs to help you identify
                suitable instruments, reagents, and supporting laboratory products.
            </p>
        </div>

    </div>
</div>

            </div>
        </section>
    );
}
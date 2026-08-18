import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { generateOrganizationSchema } from "@/lib/seo-utils";

export const metadata = {
  metadataBase: new URL("https://aozello.com"),

  title: {
    default: "Biomedical Equipment Supplier in India | Rajbiosis Private Limited",
    template: "%s | Rajbiosis Private Limited"
  },

  description:
    "Rajbiosis Private Limited is a trusted supplier and distributor of CBC Machines, Hematology Analyzers, Biochemistry Analyzers, ELISA Readers, Reagents and diagnostic laboratory equipment across India.",

  keywords: [
    "Biomedical Equipment Supplier",
    "Laboratory Equipment Supplier",
    "CBC Machine Supplier",
    "Hematology Analyzer Supplier",
    "Biochemistry Analyzer Supplier",
    "Diagnostic Equipment Supplier",
    "Medical Equipment Supplier India",
    "Pathology Laboratory Equipment",
    "Rajbiosis Private Limited"
  ],

  authors: [{ name: "Rajbiosis Private Limited", url: "https://aozello.com" }],
  creator: "Rajbiosis Private Limited",
  publisher: "Rajbiosis Private Limited",

  openGraph: {
    title: "Biomedical Equipment Supplier in India | Rajbiosis Private Limited",
    description: "Leading supplier and distributor of biomedical and laboratory equipment across India.",
    url: "https://aozello.com",
    siteName: "Rajbiosis Private Limited",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Rajbiosis Private Limited Biomedical Equipment",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Biomedical Equipment Supplier in India | Rajbiosis Private Limited",
    description: "Supplier of biomedical and laboratory equipment across India.",
    images: ["/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://aozello.com",
  },
};

export default function RootLayout({ children }) {
  const orgSchema = generateOrganizationSchema();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="antialiased">
        <Navbar />

        <main>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
            }}
          />

          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
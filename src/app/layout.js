import localFont from "next/font/local";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";



// import Footer from "@/components/Footer/Footer";

/*
|--------------------------------------------------------------------------
| Local APPOLO Font
|--------------------------------------------------------------------------
*/

const appolo = localFont({
  src: [
    {
      path: "../../public/fonts/APOLLO.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/APOLLOItalic.otf",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
});

/*
|--------------------------------------------------------------------------
| Metadata
|--------------------------------------------------------------------------
*/

export const metadata = {
  title: "Hilltop Surfaces | Premium Marble, Granite & Engineered Stones",
  description: "Discover the finest collection of premium marble, granite, and engineered surfaces at Hilltop Surfaces. We provide luxury natural stones and quartz for architectural excellence and elegant interior design.",
  keywords: "Hilltop Surfaces, premium marble, luxury granite, engineered stones, Italian marble, quartz countertops, natural stone slabs, architectural surfaces, kitchen countertops, bathroom vanities, marble suppliers",
  openGraph: {
    title: "Hilltop Surfaces | Luxury Natural Stones & Surfaces",
    description: "Experience the timeless beauty of natural stones with Hilltop Surfaces. Our curated collection brings elegance to your space.",
    type: "website",
    locale: "en_US",
    url: "https://hilltopsurfaces.com", // Assuming the domain
    siteName: "Hilltop Surfaces",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hilltop Surfaces | Premium Marble & Granite",
    description: "The ultimate destination for luxury natural and engineered stone surfaces.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/*
|--------------------------------------------------------------------------
| Layout
|--------------------------------------------------------------------------
*/

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={appolo.className}>
      <body className="antialiased">
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}

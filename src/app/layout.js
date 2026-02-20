import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";



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
  title: "Hilltop",
  description: "Hilltop Website",
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
    <Header />
        {children}
    <Footer/>




      </body>
    </html>
  );
}

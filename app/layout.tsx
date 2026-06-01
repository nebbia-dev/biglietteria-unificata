import type { Metadata } from "next";
import {Lato, Poppins} from "next/font/google";
import "./globals.css";
import Menu from "@/app/_components/Menu";
import Footer from "@/app/_components/Footer";
import Script from "next/script";

const poppins = Poppins({
  weight: [ "100", "200", "300", "400", "500", "600", "700", "800", "900" ],
  subsets: ["latin-ext"],
});

const lato = Lato({
    weight: [ "100", "300", "400", "700", "900" ],
    subsets: ["latin-ext"],
    variable: '--font-lato',
});


export const metadata: Metadata = {
  title: "Musei Civici di Cremona",
  description: "Biglietteria unificata per i Musei Civici di Cremona",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="bg-white text-black">
      <body
        className={`${poppins.className} ${lato.variable} antialiased`}
      >
      {/*<a href="#main" className="skip-link">Salta al contenuto principale</a>*/}
      <Menu/>
      <main id="main" tabIndex={-1}>
          {children}
      </main>
      <Footer/>
      <Script src="https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js" defer />
      </body>
    </html>
  );
}

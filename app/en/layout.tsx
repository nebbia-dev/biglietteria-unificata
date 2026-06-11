import type { Metadata } from "next";
import {Lato, Poppins} from "next/font/google";
import "../globals.css";
import Script from "next/script";
import FooterEn from "@/app/_components/FooterEn";
import MenuEn from "@/app/_components/MenuEn";

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
  title: "Cremona Civic Museums",
  description: "Unified ticketing for the Cremona Civic Museums",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white text-black">
      <body
        className={`${poppins.className} ${lato.variable} antialiased`}
      >
      {/*<a href="#main" className="skip-link">Skip to main content</a>*/}
      <MenuEn/>
      <main id="main" tabIndex={-1}>
          {children}
      </main>
      <FooterEn/>
      <Script src="https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js" defer />
      </body>
    </html>
  );
}

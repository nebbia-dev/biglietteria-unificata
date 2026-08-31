import type { Metadata } from "next";
import {Lato, Poppins} from "next/font/google";
import "./globals.css";

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
  title: {
    default: "Musei Civici di Cremona",
    template: "%s | Musei Civici di Cremona",
  },
  description: "Biglietteria unificata per i Musei Civici di Cremona",
  icons: {
    icon: "/favicon.svg",
  },
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
    <main id="main" tabIndex={-1}>
        {children}
    </main>
    </body>
    </html>
  );
}

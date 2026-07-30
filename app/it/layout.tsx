import type { Metadata } from "next";
import {Lato, Poppins} from "next/font/google";
import "../globals.css";
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
      {/*<a href="#main" className="skip-link">Salta al contenuto principale</a>*/}
      <Menu/>
      <main id="main" tabIndex={-1}>
          {children}
      </main>
      <Footer/>
      <Script src="https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js" defer />
      <Script id="sienna-accessibility-it-label" strategy="afterInteractive">
        {`
          (() => {
            const label = 'Apri il menu accessibilità';

            const updateAccessibilityWidgetLabel = () => {
              document
                .querySelectorAll('button[aria-label="Open Accessibility Menu"], .asw-menu-btn')
                .forEach((button) => {
                  if (button.getAttribute('aria-label') !== label) {
                    button.setAttribute('aria-label', label);
                  }

                  if (button.getAttribute('title') !== label) {
                    button.setAttribute('title', label);
                  }
                });
            };

            updateAccessibilityWidgetLabel();

            const observer = new MutationObserver(updateAccessibilityWidgetLabel);
            observer.observe(document.body, {
              attributes: true,
              attributeFilter: ['aria-label', 'title'],
              childList: true,
              subtree: true,
            });
          })();
        `}
      </Script>
      </body>
    </html>
  );
}

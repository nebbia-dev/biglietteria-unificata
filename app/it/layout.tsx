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

    {/*<Script src="https://embeds.iubenda.com/widgets/2a2c9c05-4bfb-48fe-a72e-efd7bde2d82c.js"/>*/}

    <Script id="cookie-privacy-solution" strategy="afterInteractive">
      {
        `
          var _iub = _iub || [];
          _iub.csConfiguration = {
            "enableRemoteConsent": true,
            "askConsentAtCookiePolicyUpdate":true,
            "emailMarketing":{"theme":"dark"},
            "floatingPreferencesButtonDisplay":"bottom-right",
            "perPurposeConsent":true,
            "preferenceCookie":{"expireAfter":180},
            "siteId":4651805,
            "storage":{"type":"local_storage","useSiteId":true},
            "usPreferencesWidgetDisplay":"inline-center",
            "whitelabel":false,
            "cookiePolicyId":64206165,
            "callback":{"onBeforePreload": function () { 
              if (window.location.hostname !== "shopbiglietteriamusei.comune.cremona.it") return; 
              var styleId = "iubenda-shop-widget-position"; if (document.getElementById(styleId)) return; 
              var style = document.createElement("style"); 
              style.id = styleId; 
              style.textContent = "body{flex-direction:column!important}.iub__us-widget{position:static!important;top:auto!important;right:auto!important;bottom:auto!important;left:auto!important;flex:none!important;align-self:stretch!important;width:100%!important;max-width:100%!important;box-sizing:border-box!important;min-width:0!important;height:auto!important;max-height:none!important;margin:0!important;padding:16px 72px 16px 16px!important;overflow:visible!important;z-index:auto!important;background:#0a0a0a!important;color:#fafafa!important;border-radius:0!important;box-shadow:none!important}.iub__us-widget__wrapper{max-width:100%!important;min-width:0!important;flex-wrap:wrap!important}.iub__us-widget__link{min-width:0!important;white-space:normal!important;overflow-wrap:anywhere!important}.iub__us-widget__wrapper{background:#0a0a0a!important;color:#fafafa!important;border-color:#fafafa!important}.iub__us-widget__link{background:transparent!important;color:#fafafa!important;border-color:#fafafa!important}.iub__us-widget__link:hover,.iub__us-widget__link:focus-visible{background:#252525!important;color:#fff!important}.iub__us-widget__link:focus-visible{outline:2px solid #fff!important;outline-offset:2px!important}"; 
              (document.head || document.documentElement).appendChild(style); 
              }},
              "banner":{"acceptButtonDisplay":true,"closeButtonDisplay":false,"customizeButtonDisplay":true,"explicitWithdrawal":true,"listPurposes":true,"ownerName":"biglietteriamusei.comune.cremona.it/","position":"float-top-center","rejectButtonDisplay":true,"showTitle":false,"showTotalNumberOfProviders":true}};
            _iub.csLangConfiguration = {"it":{"cookiePolicyId":64206165}};
        `
      }
    </Script>

    <Script type="text/javascript" src="https://cs.iubenda.com/autoblocking/4651805.js"/>
    <Script type="text/javascript" src="//cdn.iubenda.com/cs/iubenda_cs.js" async/>

    <Script src="https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js" defer/>
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

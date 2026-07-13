import Link from "next/link";

type FooterContactFormLang = "it" | "en";

const footerContactFormCopy = {
    it: {
        eyebrow: "Newsletter dei Musei Civici di Cremona",
        title: "Vuoi rimanere sempre aggiornato?",
        text: "Iscriviti alla newsletter e non perderti un evento!",
        cta: "Iscriviti",
        href: "/it/newsletter",
    },
    en: {
        eyebrow: "Cremona Civic Museums Newsletter",
        title: "Stay up to date!",
        text: "Subscribe to the newsletter and don't miss a single event!",
        cta: "Subscribe",
        href: "/en/newsletter",
    },
};

export default function FooterContactForm({lang}: {lang: FooterContactFormLang}) {
    const copy = footerContactFormCopy[lang];

    return (
        <section className="w-full mt-8 prime-bg">
            <div className="w-[90%] md:w-[85%] mx-auto py-8 md:flex md:items-center md:justify-between md:gap-8">
                <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-wide text-[#3E5155]">{copy.eyebrow}</p>
                    <h2 className="mt-1 text-3xl font-semibold uppercase md:text-5xl">{copy.title}</h2>
                    <p className="mt-2 max-w-2xl text-base md:text-lg">{copy.text}</p>
                </div>

                <Link
                    href={copy.href}
                    className="mt-6 inline-flex w-full items-center justify-center rounded-full seco-bg px-6 py-3 text-center text-sm font-medium text-white md:mt-0 md:w-fit"
                >
                    {copy.cta}
                </Link>
            </div>
        </section>
    )
}

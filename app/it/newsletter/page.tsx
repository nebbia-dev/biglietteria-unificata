import type { Metadata } from "next";

import NewsletterRegistrationForm from "@/app/_components/NewsletterRegistrationForm";

export const metadata: Metadata = {
    title: "Newsletter",
    description: "Iscrizione alla newsletter US Cremonese con sconto del 10%.",
};

export default function NewsletterPage() {
    return (
        <section className="w-[90%] md:w-[85%] mx-auto pt-[128px] pb-12 md:pt-[148px]">
            <div className="mb-8">
                <p className="text-sm mb-8 font-light">Home / Newsletter</p>
                <h1 className="text-4xl mb-4 font-semibold">Newsletter dei Musei Civici di Cremona</h1>
                <p className="max-w-3xl lato text-lg">
                    Iscriviti alla newsletter e non perderti nemmeno un evento!
                </p>
            </div>

            <div>
                <NewsletterRegistrationForm lang="it" />
            </div>
        </section>
    );
}

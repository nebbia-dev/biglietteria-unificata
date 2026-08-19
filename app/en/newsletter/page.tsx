import type { Metadata } from "next";

import NewsletterRegistrationForm from "@/app/_components/NewsletterRegistrationForm";

export const metadata: Metadata = {
    title: "Cremona Civic Museums Newsletter",
    description: "Cremona Civic Museums newsletter subscription.",
};

export default function NewsletterPage() {
    return (
        <section className="w-[90%] md:w-[85%] mx-auto pt-[128px] pb-12 md:pt-[148px]">
            <div className="mb-8">
                <p className="text-sm mb-8 font-light">Home / Newsletter</p>
                <h1 className="text-4xl mb-4 font-semibold">Cremona Civic Museums Newsletter</h1>
                <p className="max-w-3xl lato text-lg">
                    Subscribe to the newsletter and don't miss a single event!
                </p>
            </div>

            <div>
                <NewsletterRegistrationForm lang="en" />
            </div>
        </section>
    );
}

import type { Metadata } from "next";

import NewsletterRegistrationForm from "@/app/_components/NewsletterRegistrationForm";

export const metadata: Metadata = {
    title: "US Cremonese Newsletter | Cremona Civic Museums",
    description: "US Cremonese newsletter subscription with a 10% discount.",
};

export default function NewsletterPage() {
    return (
        <section className="w-[90%] md:w-[85%] mx-auto pt-[128px] pb-12 md:pt-[148px]">
            <div className="mb-8">
                <p className="text-sm mb-8 font-light">Home / Newsletter</p>
                <h1 className="text-4xl mb-4 font-semibold">US Cremonese Newsletter</h1>
                <p className="max-w-3xl lato text-lg">
                    Subscribe to the newsletter and show the confirmation at checkout to redeem your 10% discount.
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
                <aside className="seco-bg p-6 text-white md:p-8">
                    <div className="h-2 w-32 bg-[#D80900]" aria-hidden="true" />
                    <p className="mt-8 text-sm font-semibold uppercase text-[#FFA353]">Newsletter benefit</p>
                    <h2 className="mt-2 text-4xl font-semibold uppercase md:text-6xl">10% discount</h2>
                    <p className="mt-4 lato text-lg">
                        Fill in the form with your details and keep the subscription confirmation.
                    </p>
                </aside>

                <NewsletterRegistrationForm lang="en" />
            </div>
        </section>
    );
}

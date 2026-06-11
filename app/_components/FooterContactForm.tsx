'use client'
import send from "@/lib/send";
import {type FormEvent, useState} from "react";

type FooterContactFormLang = "it" | "en";

const footerContactFormCopy = {
    it: {
        title: "Iscriviti alla nostra newsletter",
        labels: {
            name: "Nome e cognome obbligatori",
            email: "Indirizzo email obbligatorio",
            newsletterConsent: "Sì, acconsento a ricevere la newsletter periodica via email",
            marketingConsent: "Autorizzo l'invio di materiale marketing promozionale e offerte speciali tramite email",
        },
        screenReaderLabels: {
            name: "Nome e cognome",
            email: "Email",
        },
        placeholders: {
            name: "Nome e cognome (obbligatorio)",
            email: "Email (obbligatorio)",
        },
        errors: {
            name: "Inserisci il nome",
            email: "Inserisci l'indirizzo email",
            consent: "Per iscriverti alla newsletter devi prima dare il tuo consenso",
        },
        submit: "Invia",
    },
    en: {
        title: "Subscribe to our newsletter",
        labels: {
            name: "Full name required",
            email: "Email address required",
            newsletterConsent: "Yes, I agree to receive the periodic newsletter by email",
            marketingConsent: "I authorize the sending of promotional marketing material and special offers by email",
        },
        screenReaderLabels: {
            name: "Full name",
            email: "Email",
        },
        placeholders: {
            name: "Full name (required)",
            email: "Email (required)",
        },
        errors: {
            name: "Enter your name",
            email: "Enter your email address",
            consent: "To subscribe to the newsletter, you must first give your consent",
        },
        submit: "Send",
    },
};

export default function FooterContactForm({lang}: {lang: FooterContactFormLang}) {

    const [error, setError] = useState<boolean>(false);
    const copy = footerContactFormCopy[lang];

    function checkAndSend(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const error = document.getElementById('errors-footer')!;
        const formData = new FormData(e.currentTarget);
        if(!formData.get('name')) {
            error.textContent = copy.errors.name;
            setError(true);
            return;
        }
        if(!formData.get('email')) {
            error.textContent = copy.errors.email;
            setError(true);
            return;
        }

        if(!formData.get('newsletter-consent') || !formData.get('marketing-consent')) {
            error.textContent = copy.errors.consent;
            setError(true);
            return;
        }

        send(formData);
    }

    return (
        <section className="w-full mt-8 prime-bg">
            <div className="w-[90%] md:w-[85%] mx-auto">
                <h2 className="text-3xl font-semibold pt-8 mb-2">{copy.title}</h2>

                <form method="post" onSubmit={checkAndSend} className="flex flex-col gap-4 py-4">
                    <input name="newsletter" type="hidden" value='true'/>
                    <div className="flex md:flex-row flex-col gap-4">
                        <label aria-label={copy.labels.name} className="text-sm w-full md:w-2/4"
                               htmlFor="name">
                            <span className="sr-only">{copy.screenReaderLabels.name}</span>
                            <input type="text" id="name" name="name" placeholder={copy.placeholders.name}
                                   className="w-full rounded-xl bg-[#ecf0f2] h-[48px] p-2"/>
                        </label>
                        <label aria-label={copy.labels.email} className="text-sm w-full md:w-2/4"
                               htmlFor="email">
                            <span className="sr-only">{copy.screenReaderLabels.email}</span>
                            <input type="email" id="email" name="email" placeholder={copy.placeholders.email}
                                   autoComplete="email"
                                   className="w-full rounded-xl bg-[#ecf0f2] h-[48px] p-2"/>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="newsletter-consent" className="text-sm flex gap-2 items-start">
                            <input type="checkbox" id="newsletter-consent" name="newsletter-consent"
                                   className="mt-[3px]"/>
                            {copy.labels.newsletterConsent}
                        </label>
                        <label htmlFor="marketing-consent" className="text-sm flex gap-2 items-start mt-2">
                            <input type="checkbox" id="marketing-consent" name="marketing-consent"
                                   className="mt-[3px]"/>
                            {copy.labels.marketingConsent}
                        </label>
                    </div>
                    <div className="text-white w-full md:flex md:justify-end font-medium text-sm pb-6">
                        <button type="submit"
                                className="md:w-fit w-full text-center seco-bg rounded-full px-4 py-2">{copy.submit}
                        </button>
                    </div>
                </form>
                <p id="errors-footer" role="alert" aria-atomic="true"
                   className={`${error ? 'block' : 'hidden'} p-4 border-red-500 bg-red-200 text-black rounded-xl`}
                ></p>
            </div>
        </section>
    )
}

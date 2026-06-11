'use client'
import send from "@/lib/send";
import {type FormEvent, useState} from "react";

type ContactFormLang = "it" | "en";

const contactFormCopy = {
    it: {
        labels: {
            name: "Nome *",
            lastname: "Cognome *",
            email: "Email *",
            message: "Messaggio *",
        },
        placeholders: {
            name: "Nome (obbligatorio)",
            lastname: "Cognome (obbligatorio)",
            email: "Indirizzo email (obbligatorio)",
            message: "Messaggio (obbligatorio)",
        },
        errors: {
            name: "Inserisci il nome",
            lastname: "Inserisci il cognome",
            email: "Inserisci l'indirizzo email",
            message: "Inserisci il testo della tua richiesta",
        },
        submit: "Invia",
    },
    en: {
        labels: {
            name: "Name *",
            lastname: "Last name *",
            email: "Email *",
            message: "Message *",
        },
        placeholders: {
            name: "Name (required)",
            lastname: "Last name (required)",
            email: "Email address (required)",
            message: "Message (required)",
        },
        errors: {
            name: "Enter your name",
            lastname: "Enter your last name",
            email: "Enter your email address",
            message: "Enter your message",
        },
        submit: "Send",
    },
};

export default function ContactForm({text, lang}:{text:string, lang: ContactFormLang}) {

    const [error, setError] = useState<boolean>(false);
    const copy = contactFormCopy[lang];

    function checkAndSendCF(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const error = document.getElementById('errors-contact-form')!;
        const formData = new FormData(e.currentTarget);

        if(!formData.get('info-name')) {
            error.textContent = copy.errors.name;
            setError(true);
            return;
        }
        if(!formData.get('info-lastname')) {
            error.textContent = copy.errors.lastname;
            setError(true);
            return;
        }
        if(!formData.get('info-email')) {
            error.textContent = copy.errors.email;
            setError(true);
            return;
        }
        if(!formData.get('info-message')) {
            error.textContent = copy.errors.message;
            setError(true);
            return;
        }

        send(formData);
    }

    return (
        <section className="w-[90%] md:w-[85%] mx-auto pt-8 mt-12">
            <h2 className="text-3xl font-semibold mb-8">{text}</h2>

            <form method="post" onSubmit={checkAndSendCF} className="bg-white rounded-xl flex flex-col gap-4 p-4">
                <input name="info-newsletter" type="hidden" value='false'/>
                <label htmlFor="info-name" className="text-sm">{copy.labels.name}
                    <input id="info-name" name="info-name" placeholder={copy.placeholders.name} type="text"
                           className="w-full rounded-xl bg-[#ecf0f2] h-[48px] p-2"/>
                </label>
                <label htmlFor="info-lastname" className="text-sm">{copy.labels.lastname}
                    <input id="info-lastname" name="info-lastname" placeholder={copy.placeholders.lastname} type="text"
                           className="w-full rounded-xl bg-[#ecf0f2] h-[48px] p-2"/>
                </label>
                <label htmlFor="info-email" className="text-sm">{copy.labels.email}
                    <input id="info-email" name="info-email" placeholder={copy.placeholders.email} type="email"
                           className="w-full rounded-xl bg-[#ecf0f2] h-[48px] p-2"/>
                </label>
                <label htmlFor="info-message" className="text-sm">{copy.labels.message}
                    <textarea id="info-message" name="info-message" placeholder={copy.placeholders.message}
                              className="w-full rounded-xl bg-[#ecf0f2] h-[148px] p-2"/>
                </label>
                <div className="text-black w-full md:flex md:justify-end font-medium text-sm">
                    <button type="submit" className="w-full md:w-fit text-center prime-bg rounded-full px-4 py-2">{copy.submit}
                    </button>
                </div>
            </form>
            <p id="errors-contact-form" role="alert" aria-atomic="true"
               className={`${error ? 'block' : 'hidden'} p-4 border-red-500 bg-red-200 text-black rounded-xl`}
            ></p>
        </section>
    )
}

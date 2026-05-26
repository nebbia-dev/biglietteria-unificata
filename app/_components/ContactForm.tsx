'use client'
import send from "@/lib/send";
import {type FormEvent, useState} from "react";

export default function ContactForm({text}:{text:string}) {

    const [error, setError] = useState<boolean>(false);

    function checkAndSendCF(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const error = document.getElementById('errors')!;
        const formData = new FormData(e.currentTarget);

        if(!formData.get('info-name')) {
            error.textContent = 'Inserisci il nome';
            setError(true);
            return;
        }
        if(!formData.get('info-lastname')) {
            error.textContent = 'Inserisci il cognome';
            setError(true);
            return;
        }
        if(!formData.get('info-email')) {
            error.textContent = 'Inserisci l\'indirizzo email';
            setError(true);
            return;
        }
        if(!formData.get('info-message')) {
            error.textContent = 'Inserisci il testo della tua richiesta';
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
                <label htmlFor="info-name" className="text-sm">Nome *
                    <input id="info-name" name="info-name" placeholder="Nome (obbligatorio)" type="text"
                           className="w-full rounded-xl bg-[#ecf0f2] h-[48px] p-2"/>
                </label>
                <label htmlFor="info-lastname" className="text-sm">Cognome *
                    <input id="info-lastname" name="info-lastname" placeholder="Cognome (obbligatorio)" type="text"
                           className="w-full rounded-xl bg-[#ecf0f2] h-[48px] p-2"/>
                </label>
                <label htmlFor="info-email" className="text-sm">Email *
                    <input id="info-email" name="info-email" placeholder="Indirizzo email (obbligatorio)" type="email"
                           className="w-full rounded-xl bg-[#ecf0f2] h-[48px] p-2"/>
                </label>
                <label htmlFor="info-message" className="text-sm">Messaggio *
                    <textarea id="info-message" name="info-message" placeholder="Messaggio (obbligatorio)"
                              className="w-full rounded-xl bg-[#ecf0f2] h-[148px] p-2"/>
                </label>
                <div className="text-black w-full md:flex md:justify-end font-medium text-sm">
                    <button type="submit" className="w-full md:w-fit text-center prime-bg rounded-full px-4 py-2">Invia
                    </button>
                </div>
            </form>
            <p id="errors" role="alert" aria-atomic="true"
               className={`${error ? 'block' : 'hidden'} p-4 border-red-500 bg-red-200 text-black rounded-xl`}
            ></p>
        </section>
    )
}

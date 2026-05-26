'use client'
import send from "@/lib/send";
import {useState} from "react";

export default function FooterContactForm() {

    const [error, setError] = useState<boolean>(false);

    function checkAndSend(e:any) {
        e.preventDefault();
        const error = document.getElementById('errors')!;
        const form = e.target;
        const formData = new FormData(form);
        if(!formData.get('name')) {
            error.textContent = 'Inserisci il nome';
            setError(true);
            return;
        }
        if(!formData.get('email')) {
            error.textContent = 'Inserisci l\'indirizzo email';
            setError(true);
            return;
        }

        if(!formData.get('newsletter-consent') || !formData.get('marketing-consent')) {
            error.textContent = 'Per iscriverti alla newsletter devi prima dare il tuo consenso';
            setError(true);
            return;
        }

        send(formData);
    }

    return (
        <section className="w-full mt-8 prime-bg">
            <div className="w-[90%] md:w-[85%] mx-auto">
                <h2 className="text-3xl font-semibold pt-8 mb-2">Iscriviti alla nostra newsletter</h2>

                <form method="post" onSubmit={checkAndSend} className="flex flex-col gap-4 py-4">
                    <input name="newsletter" type="hidden" value='true'/>
                    <div className="flex md:flex-row flex-col gap-4">
                        <label aria-label="Nome e cognome obbligatorii" className="text-sm w-full md:w-2/4"
                               htmlFor="name">
                            <span className="sr-only">Nome e cognome</span>
                            <input type="text" id="name" name="name" placeholder="Nome e cognome (obbligatorio)"
                                   className="w-full rounded-xl bg-[#ecf0f2] h-[48px] p-2"/>
                        </label>
                        <label aria-label="Indirizzo email obbligatorio" className="text-sm w-full md:w-2/4"
                               htmlFor="email">
                            <span className="sr-only">Email</span>
                            <input type="email" id="email" name="email" placeholder="Email (obbligatorio)"
                                   autoComplete="email"
                                   className="w-full rounded-xl bg-[#ecf0f2] h-[48px] p-2"/>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="newsletter-consent" className="text-sm flex gap-2 items-start">
                            <input type="checkbox" id="newsletter-consent" name="newsletter-consent"
                                   className="mt-[3px]"/>
                            Sì, acconsento a ricevere la newsletter periodica via email
                        </label>
                        <label htmlFor="marketing-consent" className="text-sm flex gap-2 items-start mt-2">
                            <input type="checkbox" id="marketing-consent" name="marketing-consent"
                                   className="mt-[3px]"/>
                            Autorizzo l'invio di materiale marketing promozionale e offerte speciali tramite
                            email
                        </label>
                    </div>
                    <div className="text-white w-full md:flex md:justify-end font-medium text-sm pb-6">
                        <button type="submit"
                                className="md:w-fit w-full text-center seco-bg rounded-full px-4 py-2">Invia
                        </button>
                    </div>
                </form>
                <p id="errors" role="alert" aria-atomic="true"
                   className={`${error ? 'block' : 'hidden'} p-4 border-red-500 bg-red-200 text-black rounded-xl`}
                ></p>
            </div>
        </section>
    )
}
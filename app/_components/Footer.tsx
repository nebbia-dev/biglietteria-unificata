import Image from "next/image";
export default function Footer() {
    return(
        <div id="footer" className="seco-bg">
            {/*Newsletter form*/}
            <section className="w-full mt-8 prime-bg">
                    <div className="w-[90%] md:w-[85%] mx-auto">
                        <h2 className="text-3xl font-semibold pt-8 mb-2">Iscriviti alla nostra newsletter</h2>

                        <form className="flex flex-col gap-4 py-4">
                            <div className="flex md:flex-row flex-col gap-4">
                                <label aria-label="Nome e cognome obbligatorii" className="text-sm w-full md:w-2/4" htmlFor="name">
                                    <span className="sr-only">Nome e cognome</span>
                                    <input type="text" id="name" name="name" placeholder="Nome e cognome (obbligatorio)"
                                           className="w-full rounded-xl bg-[#ecf0f2] h-[48px] p-2"/>
                                </label>
                                <label aria-label="Indirizzo email obbligatorio" className="text-sm w-full md:w-2/4" htmlFor="email">
                                    <span className="sr-only">Email</span>
                                    <input type="email" id="email" name="email" placeholder="Email (obbligatorio)"
                                           autoComplete="email"
                                           className="w-full rounded-xl bg-[#ecf0f2] h-[48px] p-2"/>
                                </label>
                            </div>
                            <div>
                                <label className="text-sm flex gap-2 items-start">
                                    <input type="checkbox" className="mt-[3px]"/>
                                    Si, acconsento a ricevere la newsletter periodica via email
                                </label>
                                <label className="text-sm flex gap-2 items-start mt-2">
                                    <input type="checkbox" className="mt-[3px]"/>
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
                    </div>
            </section>
            <footer
                className="md:w-[85%] md:mx-auto md:min-h-[200px] md:text-sm text-white p-8 md:mt-6 flex flex-col md:flex-row gap-8 md:gap-12 md:justify-between">
                <Image src='/icons/logo.png'
                       alt="museo civici cremona logo" width={48} height={48}
                       className="w-12 h-12 hidden md:block"

                />

                <div className="break-all">
                    <h4 className="prime-text font-semibold mb-1">Contatti</h4>
                    <ul className="mb-2">
                        <li>Uffici: 0372 407269</li>
                        <li><a className="underline" href="mailto:museo.alaponzone@cremona.comune.it">museo.alaponzone@cremona.comune.it</a></li>
                    </ul>
                    <p>Per inviare segnalazioni riguardanti l'accessibilità,<br/>scrivici a <a
                        aria-label="Scrivi una mail per fare una segnalazione riguardante l'accessibilità del sito"
                        className="underline" href="mailto:museo.alaponzone@cremona.comune.it" target="_blank"
                        rel="noopener noreferrer">museo.alaponzone@cremona.comune.it</a>
                    </p>
                </div>

                <div>
                    <h4 className="prime-text font-semibold mb-1">Link utili</h4>
                    <ul>
                        <li>
                            <a aria-label="Vai alla pagina di Art Bonus"
                               href="https://artbonus.gov.it" target="_blank" rel="noopener noreferrer">Art Bonus</a></li>
                        <li className="flex gap-2 mt-2">
                            <a aria-label="Vai alla pagina Facebook dei Musei Civici" href="https://www.facebook.com/cremonamusei/" target="_blank"
                               rel="noopener noreferrer" className="w-6">
                                <Image src="/icons/hugeicons_facebook-02.webp" alt="facebook logo" width={48}
                                       height={48}/>
                            </a>
                            <a aria-label="Vai alla pagina Instagram dei Musei Civici" href="https://www.instagram.com/cremonamusei/" target="_blank"
                               rel="noopener noreferrer" className="w-6">
                                <Image src="/icons/logo-instagram.webp" alt="instagram logo" width={48} height={48}/>
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <ul className="flex flex-col gap-1">
                        <li>Privacy Policy</li>
                        <li><a
                            aria-label="Vai alla pagina dedicata all'elenco delle misure adottate per rendere i musei accessibili"
                            href="https://musei.comune.cremona.it/it/accessibilita/percorsi-per-disabili-motori"
                            target="_blank" rel="noopener noreferrer">
                            Accessibilità
                        </a></li>
                        <li>Condizioni di vendita</li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}
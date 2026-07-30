import Image from "next/image";
import FooterContactForm from "@/app/_components/FooterContactForm";
export default function Footer() {
    return(
        <div id="footer" className="seco-bg">
            {/*Newsletter form*/}
            <FooterContactForm lang="it"/>
            <footer
                className="md:w-[85%] md:mx-auto md:min-h-[200px] md:text-sm text-white p-8 md:mt-6 flex flex-col md:flex-row gap-8 md:gap-12 md:justify-between">
                <Image src='/icons/logo.png'
                       alt="Logo dei Musei Civici di Cremona" width={48} height={48}
                       className="w-12 h-12 hidden md:block"

                />

                <div className="break-all">
                    <h3 className="prime-text font-semibold mb-1">Contatti</h3>
                    <ul className="mb-2">
                        <li><a className="underline" href="mailto:info.musei@comune.cremona.it">info.musei@comune.cremona.it</a></li>
                    </ul>
                    <p>Per inviare segnalazioni riguardanti l&apos;accessibilità,<br/>scrivici a <a
                        aria-label="Scrivi una mail per fare una segnalazione riguardante l'accessibilità del sito"
                        className="underline" href="mailto:info.musei@comune.cremona.it" target="_blank"
                        rel="noopener noreferrer">info.musei@comune.cremona.it</a>
                    </p>
                </div>

                <div>
                    <h3 className="prime-text font-semibold mb-1">Link utili</h3>
                    <ul>
                        <li>
                            <a aria-label="Vai alla pagina di Art Bonus"
                               href="https://artbonus.gov.it" target="_blank" rel="noopener noreferrer">Art Bonus</a></li>
                        <li className="flex gap-2 mt-2">
                            <a aria-label="Vai alla pagina Facebook dei Musei Civici" href="https://www.facebook.com/cremonamusei/" target="_blank"
                               rel="noopener noreferrer" className="w-6">
                                <Image src="/icons/hugeicons_facebook-02.webp" aria-hidden alt="" width={48}
                                       height={48}/>
                            </a>
                            <a aria-label="Vai alla pagina Instagram dei Musei Civici" href="https://www.instagram.com/cremonamusei/" target="_blank"
                               rel="noopener noreferrer" className="w-6">
                                <Image src="/icons/logo-instagram.webp" aria-hidden alt="" width={48} height={48}/>
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

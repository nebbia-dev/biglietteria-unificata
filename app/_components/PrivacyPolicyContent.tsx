import type {ReactNode} from "react";

type PolicySectionProps = {
    children: ReactNode;
    icon: string;
    question: string;
    title: string;
};

function PolicySection({children, icon, question, title}: PolicySectionProps) {
    return (
        <section className="mt-10 md:mt-12">
            <div className="flex items-start gap-4 md:gap-5">
                <img
                    src={icon}
                    alt=""
                    aria-hidden="true"
                    width={600}
                    height={600}
                    className="mt-1 h-14 w-14 shrink-0 object-contain md:h-16 md:w-16"
                />
                <div>
                    <h2 className="text-2xl font-semibold leading-tight md:text-3xl">{title}</h2>
                    <p className="mt-1 font-serif text-lg italic leading-snug text-black/75">{question}</p>
                </div>
            </div>
            <div className="lato mt-6 text-base leading-7 md:text-lg md:leading-8">
                {children}
            </div>
        </section>
    );
}

const tableClassName = "w-full border-collapse text-left text-sm md:text-base";
const tableHeaderClassName = "border border-black/50 bg-[#e9edf0] px-4 py-3 font-semibold align-middle";
const tableCellClassName = "border border-black/50 px-4 py-3 align-middle";

export default function PrivacyPolicyContent() {
    return (
        <article lang="it" className="mx-auto w-[90%] max-w-[1120px] pt-[128px] pb-16 md:w-[85%] md:pt-[148px] md:pb-24">
            <div className="rounded-2xl bg-white px-5 py-8 shadow-sm md:px-12 md:py-12 lg:px-16">
                <header className="border-b border-black/15 pb-10">
                    <div className="grid gap-7 text-sm text-[#829caf] md:grid-cols-[260px_1fr_1fr] md:items-start md:gap-10">
                        <img
                            src="/privacy-policy/image10.gif"
                            alt="Cremona Comune di Cremona"
                            width={300}
                            height={119}
                            className="h-auto w-[250px] max-w-full"
                        />
                        <p className="uppercase leading-5">
                            Comune di Cremona<br/>
                            Piazza del Comune, 8<br/>
                            Cremona
                            <br/><br/>
                            C.F.- P.IVA 00297960197
                        </p>
                        <p className="uppercase leading-5">
                            t. 0372 4071<br/>
                            F.<br/>
                            W. <a className="underline underline-offset-2" href="https://www.comune.cremona.it/">https://www.comune.cremona.it/</a><br/>
                            <a className="break-all underline underline-offset-2" href="mailto:spaziocomune@comune.cremona.it">spaziocomune@comune.cremona.it</a>
                        </p>
                    </div>

                    <div className="mt-12 text-center md:mt-16">
                        <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
                            Informativa sul trattamento dei dati personali
                        </h1>
                        <p className="mt-6 text-2xl uppercase leading-tight md:text-3xl">
                            BIGLIETTERIA INTEGRATA MUSEI CIVICI
                        </p>
                        <p className="mt-5 font-serif text-lg md:text-2xl">
                            ai sensi del Regolamento EU 2016/679 aggiornata al 26/08/2026
                        </p>
                    </div>
                </header>

                <div className="lato mt-10 text-base leading-7 md:text-lg md:leading-8">
                    <p>
                        Il presente documento ha lo scopo di informare l’interessato su come vengono utilizzati i dati che lo riguardano nell’ambito della seguente o delle seguenti attività di trattamento:
                    </p>

                    <div className="mt-6 overflow-x-auto">
                        <table className={tableClassName}>
                            <thead>
                                <tr>
                                    <th scope="col" className="border border-black/50 bg-[#b9dce8] px-4 py-2 text-lg font-semibold">
                                        Trattamenti
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={tableCellClassName}>BIGLIETTERIA INTEGRATA MUSEI CIVICI</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="mt-7">
                        Ai sensi degli articoli 13 e 14 del regolamento EU 2016/679 si informa l’interessato che i suoi dati saranno trattati dal Titolare del trattamento definito nella sezione <strong>Soggetti</strong>, il quale tratta i dati per le finalità menzionate nella sezione <strong>Finalità</strong>, per un determinato periodo di tempo definito nella sezione <strong>Periodo di conservazione</strong> e potrebbero essere comunicati a soggetti definiti nella sezione <strong>Comunicazione</strong>.
                    </p>
                    <p className="mt-4">
                        Si informa altresì l’interessato che può esercitare diversi diritti con riferimento ai suoi dati personali, un’elencazione dei diritti è fornita in calce alla presente informativa nella sezione <strong>Diritti dell’interessato</strong>. I diritti dell’interessato possono essere esercitati in qualsiasi momento contattando il Responsabile della protezione dei dati (RPD) o in sua assenza il Titolare.
                    </p>
                </div>

                <PolicySection
                    icon="/privacy-policy/image1.png"
                    title="Finalità del trattamento"
                    question="Perché vengono trattati i miei dati?"
                >
                    <p>Trattamento dei dati personali necessario per l&apos;acquisto del biglietto per l&apos;accesso al museo.</p>
                </PolicySection>

                <PolicySection
                    icon="/privacy-policy/image2.png"
                    title="Basi giuridiche che legittimano il trattamento"
                    question="Quale base giuridica legittima il trattamento dei miei dati?"
                >
                    <ul className="list-disc pl-7 marker:text-black">
                        <li className="pl-2">
                            Articolo 6 b) Reg. UE 679/2016 – Il trattamento è necessario all’esecuzione di un contratto di cui l’interessato è parte o all’esecuzione di misure precontrattuali adottate su richiesta dello stesso
                        </li>
                    </ul>
                </PolicySection>

                <PolicySection
                    icon="/privacy-policy/image3.png"
                    title="Origine dei dati"
                    question="Da dove provengono i dati trattati?"
                >
                    <ul className="list-disc pl-7 marker:text-black">
                        <li className="pl-2">Raccolti presso l’interessato</li>
                    </ul>
                </PolicySection>

                <PolicySection
                    icon="/privacy-policy/image4.png"
                    title="Tipologie di dati trattati"
                    question="Quali dati vengono trattati?"
                >
                    <div className="overflow-x-auto">
                        <table className={`${tableClassName} min-w-[620px]`}>
                            <thead>
                                <tr>
                                    <th scope="col" className={tableHeaderClassName}>Categoria</th>
                                    <th scope="col" className={tableHeaderClassName}>Tipo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={tableCellClassName}>dati idonei a rivelare la posizione geografica</td>
                                    <td className={tableCellClassName}>dati idonei a rivelare la posizione geografica</td>
                                </tr>
                                <tr>
                                    <td rowSpan={2} className={tableCellClassName}>dati di contatto</td>
                                    <td className={tableCellClassName}>Indirizzo E-mail</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClassName}>Contatto telefonico</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </PolicySection>

                <PolicySection
                    icon="/privacy-policy/image3.png"
                    title="Titolare"
                    question="Chi è il titolare del trattamento dei dati?"
                >
                    <div className="overflow-x-auto">
                        <table className={`${tableClassName} min-w-[680px]`}>
                            <thead>
                                <tr>
                                    <th scope="col" className={tableHeaderClassName}>Denominazione</th>
                                    <th scope="col" className={tableHeaderClassName}>Dettagli di contatto</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={tableCellClassName}>Comune di Cremona</td>
                                    <td className={tableCellClassName}>
                                        Numero di telefono: 0372 4071<br/>
                                        Indirizzo email: <a className="break-all underline underline-offset-2" href="mailto:spaziocomune@comune.cremona.it">spaziocomune@comune.cremona.it</a><br/>
                                        Indirizzo: Piazza del Comune, 8 Cremona<br/>
                                        Sito web: <a className="break-all underline underline-offset-2" href="https://www.comune.cremona.it/">https://www.comune.cremona.it/</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </PolicySection>

                <PolicySection
                    icon="/privacy-policy/image3.png"
                    title="Responsabile della protezione dei dati (RPD)"
                    question="Chi è il responsabile della protezione dei dati?"
                >
                    <div className="overflow-x-auto">
                        <table className={`${tableClassName} min-w-[680px]`}>
                            <thead>
                                <tr>
                                    <th scope="col" className={tableHeaderClassName}>Denominazione</th>
                                    <th scope="col" className={tableHeaderClassName}>Dettagli di contatto</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={tableCellClassName}>EMPATHIA SRL</td>
                                    <td className={tableCellClassName}>
                                        Telefono: 05221606969<br/>
                                        Indirizzo email: <a className="break-all underline underline-offset-2" href="mailto:dpo@empathia.it">dpo@empathia.it</a><br/>
                                        Indirizzo: VIA GEORGI DIMITROV N.42 42123 REGGIO EMILIA<br/>
                                        Indirizzo PEC: <a className="break-all underline underline-offset-2" href="mailto:empathia@legalmail.it">empathia@legalmail.it</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </PolicySection>

                <PolicySection
                    icon="/privacy-policy/image5.png"
                    title="Diffusione e comunicazione dei dati"
                    question="I dati vengono diffusi o comunicati a soggetti terzi?"
                >
                    <p>Non viene effettuata la diffusione dei dati</p>
                    <div className="mt-6 overflow-x-auto">
                        <table className={`${tableClassName} min-w-[900px]`}>
                            <thead>
                                <tr>
                                    <th scope="col" className={tableHeaderClassName}>Categorie di destinatari</th>
                                    <th scope="col" className={tableHeaderClassName}>Posizione geografica</th>
                                    <th scope="col" className={tableHeaderClassName}>Legittimazione in caso di trasferimento extra-UE</th>
                                    <th scope="col" className={tableHeaderClassName}>Note sui trasferimenti o comunicazioni</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={tableCellClassName}>
                                        Comunicazione a My Domnia Stripe per la gestione del pagamento del biglietto. Comunicazione dei dati, necessaria per l&apos;erogazione del servizio, a soggetti terzi nominati dal Comune responsabili del trattamento.
                                    </td>
                                    <td className={tableCellClassName}>Intra-UE</td>
                                    <td className={tableCellClassName}></td>
                                    <td className={tableCellClassName}></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </PolicySection>

                <PolicySection
                    icon="/privacy-policy/image6.png"
                    title="Facoltatività o obbligatorietà della comunicazione dei dati"
                    question="Comunicare i miei dati è facoltativo o obbligatorio?"
                >
                    <p>La comunicazione dei dati personali come specificati in questa informativa è facoltativa</p>
                </PolicySection>

                <PolicySection
                    icon="/privacy-policy/image7.png"
                    title="Possibili conseguenze in conseguenza del mancato conferimento"
                    question="Quali conseguenze possono esserci in caso di mancato conferimento dei dati?"
                >
                    <p>il mancato conferimento di tutti i dati richiesti non consente l&apos;acquisto del biglietto</p>
                </PolicySection>

                <PolicySection
                    icon="/privacy-policy/image8.png"
                    title="Periodo di conservazione dei dati"
                    question="Per quanto tempo verranno conservati i miei dati?"
                >
                    <ul className="list-disc pl-7 marker:text-black">
                        <li className="pl-2">conservazione dei dati sino al raggiungimento delle finalità</li>
                    </ul>
                    <p className="mt-6">Conservazione dei dati in forma aggregata per fini statistici.</p>
                </PolicySection>

                <PolicySection
                    icon="/privacy-policy/image9.png"
                    title="Diritti dell’interessato"
                    question="L’interessato ha diritto di esercitare, dove applicabili, i diritti previsti dagli articoli 15-21 del Regolamento Ue 2016/679, rivolgendosi direttamente al Titolare o al Responsabile della protezione dei dati, ai contatti indicati nella presente informativa, per chiedere l’accesso, la rettifica, la cancellazione, la limitazione del trattamento, la portabilità e l’opposizione al trattamento dei dati personali."
                >
                    <ul className="space-y-6 pl-7">
                        <li className="list-disc pl-2 marker:text-black">
                            <h3 className="font-semibold">Accesso</h3>
                            <p className="mt-2">
                                L’interessato ha il diritto di ottenere l’accesso ai dati che lo riguardano, ad esempio per ottenere la conferma dell’esistenza o meno di tali dati, anche se non ancora registrati, e la loro comunicazione in forma intelligibile.
                            </p>
                        </li>
                        <li className="list-disc pl-2 marker:text-black">
                            <h3 className="font-semibold">Portabilità</h3>
                            <p className="mt-2">
                                L’interessato ha il diritto di ricevere in un formato strutturato, di uso comune e leggibile da dispositivo automatico i dati personali che lo riguardano forniti a un titolare del trattamento e ha il diritto di trasmettere tali dati a un altro titolare del trattamento senza impedimenti da parte del titolare del trattamento cui li ha forniti.
                            </p>
                        </li>
                        <li className="list-disc pl-2 marker:text-black">
                            <h3 className="font-semibold">Rettifica</h3>
                            <p className="mt-2">
                                L’interessato ha il diritto di ottenere dal titolare del trattamento la rettifica dei dati personali inesatti che lo riguardano senza ingiustificato ritardo. Tenuto conto delle finalità del trattamento, l’interessato ha il diritto di ottenere l’integrazione dei dati personali incompleti, anche fornendo una dichiarazione integrativa.
                            </p>
                        </li>
                        <li className="list-disc pl-2 marker:text-black">
                            <h3 className="font-semibold">Cancellazione</h3>
                            <p className="mt-2">
                                L’interessato ha il diritto di ottenere dal titolare del trattamento la cancellazione dei dati personali che lo riguardano senza ingiustificato ritardo e il titolare del trattamento ha l’obbligo di cancellare senza ingiustificato ritardo i dati personali.
                            </p>
                        </li>
                        <li className="list-disc pl-2 marker:text-black">
                            <h3 className="font-semibold">Limitazione</h3>
                            <p className="mt-2">
                                L’interessato ha il diritto di ottenere dal titolare del trattamento la limitazione del trattamento quando viene contestata l’esattezza dei dati personali (per il periodo necessario a verificare l’esattezza), quando il trattamento dei dati è illecito e l’interessato chiede che ne sia limitato l’utilizzo, quando i dati sono necessari in sede giudiziaria nel caso in cui il titolare non ne abbia più bisogno, in attesa della verifica in merito all’eventuale prevalenza dei motivi legittimi del titolare quando l’interessato si è opposto al trattamento.
                            </p>
                        </li>
                        <li className="list-disc pl-2 marker:text-black">
                            <h3 className="font-semibold">Opposizione</h3>
                            <p className="mt-2">
                                L’interessato ha il diritto di opporsi in qualsiasi momento, per motivi connessi alla sua situazione particolare, al trattamento dei dati personali che lo riguardano ai sensi dell’articolo 6, paragrafo 1, lettere e) (per l’esecuzione di un compito di interesse pubblico) o f) (per il perseguimento del legittimo interesse del titolare o di terzi, compresa la profilazione sulla base di tali disposizioni
                            </p>
                        </li>
                        <li className="list-disc pl-2 marker:text-black">
                            <h3 className="font-semibold">Revoca del consenso</h3>
                            <p className="mt-2">
                                L’interessato ha diritto a revocare il consenso in qualsiasi momento senza pregiudicare la liceità del trattamento basata sul consenso prestato prima della revoca.
                            </p>
                        </li>
                        <li className="list-disc pl-2 marker:text-black">
                            <h3 className="font-semibold">Proporre un reclamo ad un&apos;autorità di controllo</h3>
                        </li>
                    </ul>

                    <p className="mt-9">
                        L’interessato può altresì revocare il consenso espresso in qualsiasi momento, senza pregiudicare la liceità del trattamento basata sul consenso prestato prima della revoca.
                    </p>
                    <p className="mt-4">
                        Per esercitare i sopracitati diritti l’interessato può rivolgersi al Responsabile della protezione dei dati o al Titolare. L’interessato ha il diritto di proporre reclamo a un’autorità di controllo, scrivendo a <a className="break-all underline underline-offset-2" href="mailto:garante@gpdp.it">garante@gpdp.it</a>, oppure <a className="break-all underline underline-offset-2" href="mailto:protocollo@pec.gpdp.it">protocollo@pec.gpdp.it</a>.
                    </p>
                </PolicySection>
            </div>
        </article>
    );
}

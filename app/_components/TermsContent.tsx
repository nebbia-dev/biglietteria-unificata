const termsSections = [
    {
        number: 1,
        title: "OGGETTO DEL CONTRATTO E DEFINIZIONI",
        paragraphs: [
            `Il presente contratto disciplina la vendita dei titoli di accesso (di seguito "Biglietti") per l'ingresso e la fruizione dei servizi museali, mostre ed eventi organizzati presso i Musei Civici di Cremona (di seguito "Organizzatore" o "Comune di Cremona"). La vendita online e tramite canali digitali è gestita tramite l'infrastruttura tecnologica in modalità Software as a Service (SaaS) denominata "dPass" (compresi i moduli dTicketing/dBooking), di titolarità e fornitura da parte di DOMNIA S.R.L., con sede legale in Via Retrone 16, 36077 Altavilla Vicentina (VI), P.IVA e C.F. 03998330249 (di seguito "Fornitore del Servizio"). Ai fini delle presenti condizioni si intende per:`,
            `Acquirente/Utente: il soggetto che procede all'acquisto del Biglietto.`,
            `Titolo di Accesso/Biglietto: il documento, anche in formato digitale (QR Code), emesso tramite il sistema dPass che legittima l'ingresso ai Musei Civici.`,
        ],
    },
    {
        number: 2,
        title: "MODALITÀ DI ACQUISTO E ACCETTAZIONE DELLE CONDIZIONI",
        paragraphs: [
            `L'acquisto dei Biglietti online avviene previa registrazione o inserimento dei dati richiesti sul portale ufficiale di prenotazione dei Musei Civici di Cremona. Completando la procedura d'acquisto, l'Acquirente dichiara di aver letto, compreso e accettato integralmente le presenti Condizioni di Vendita. Ogni transazione è soggetta a verifica della disponibilità in tempo reale da parte del sistema dPass.`,
        ],
    },
    {
        number: 3,
        title: "PREZZI DEI BIGLIETTI E COMMISSIONI DI SERVIZIO",
        paragraphs: [
            `I prezzi dei Biglietti (comprensivi di eventuali riduzioni o gratuità previste dai regolamenti comunali vigenti) sono indicati sul sito web ufficiale durante la procedura di scelta della data e dell'orario di visita. Il pagamento è incassato da DOMNIA S.R.L., in qualità di gestore dei pagamenti tramite PSP” tramite il proprio account sulla piattaforma di pagamento Stripe, che trattiene una commissione di gestione a fronte del servizio prestato. Il prezzo del Biglietto e l'eventuale commissione applicata sono esplicitamente evidenziati separatamente nel riepilogo del carrello prima della conclusione del pagamento.`,
        ],
    },
    {
        number: 4,
        title: "MODALITÀ DI PAGAMENTO E SICUREZZA DELLE TRANSAZIONI",
        paragraphs: [
            `Il pagamento dei Biglietti è effettuato tramite il gateway di pagamento Stripe, integrato nella piattaforma dPass e operante sull'account di DOMNIA S.R.L. in qualità di gestore dei pagamenti tramite PSP, tramite i circuiti di carte di credito/debito, wallet digitali o altri strumenti di pagamento di volta in volta abilitati. I dati relativi alla carta di pagamento sono acquisiti direttamente da Stripe secondo i propri standard di sicurezza (certificazione PCI-DSS) e non sono conservati né altrimenti trattati da DOMNIA S.R.L. o dal Comune di Cremona.`,
        ],
    },
    {
        number: 5,
        title: "EMISSIONE E CONSEGNA DEI BIGLIETTI",
        paragraphs: [
            `A transazione conclusa con successo, l'Acquirente riceverà una email di conferma all'indirizzo indicato in fase di acquisto. Il Biglietto in formato digitale (contenente il codice a barre o QR Code identificativo generato dal software dPass) sarà allegato alla email o disponibile nel wallet dell'Utente. Per accedere ai Musei non è obbligatorio stampare il titolo su carta; è sufficiente esibire il QR Code direttamente dallo schermo di uno smartphone o dispositivo mobile all'ingresso dei varchi di controllo.`,
        ],
    },
    {
        number: 6,
        title: "ESCLUSIONE DEL DIRITTO DI RECESSO E IMMODIFICABILITÀ DEI BIGLIETTI",
        paragraphs: [
            `Ai sensi dell'art. 59, comma 1, lett. n) del D.Lgs. 6 settembre 2005, n. 206 (Codice del Consumo), ai contratti relativi ai servizi riguardanti le attività del tempo libero qualora il contratto preveda una data o un periodo di esecuzione specifici, non si applica il diritto di recesso. Pertanto, una volta concluso l'acquisto, non è possibile annullare la transazione, richiedere il rimborso del prezzo o procedere al cambio di data e orario della prenotazione, salvo diverse e specifiche deroghe autorizzate dall'Organizzatore.`,
        ],
    },
    {
        number: 7,
        title: "ANNULLAMENTO, RINVII E RIMBORSI",
        paragraphs: [
            `Nel caso di chiusura straordinaria dei Musei, sospensione dei servizi o annullamento di mostre/eventi imputabili a cause di forza maggiore o a decisioni organizzative del Comune di Cremona, l'Organizzatore indicherà le modalità e le tempistiche di recupero della visita o di eventuale rimborso del solo prezzo facciale del Biglietto. Le commissioni di servizio online e i costi accessori non saranno, in ogni caso, rimborsabili. Il Fornitore del Servizio (Domnia S.r.l.) non è responsabile per modifiche di calendario o cancellazioni decise dal Comune di Cremona.`,
        ],
    },
    {
        number: 8,
        title: "REGOLE DI ACCESSO E COMPORTAMENTO ALL'INTERNO DEI MUSEI",
        paragraphs: [
            `Il Biglietto è valido esclusivamente per il giorno, l'orario e la sede museale specificati sul titolo stesso. Il controllo degli accessi e la validazione del QR Code avvengono tramite i lettori ottici fisici o palmari collegati al sistema centralizzato dPass. L'accesso è subordinato al rispetto del regolamento interno dei Musei Civici di Cremona (es. divieto di introdurre oggetti ingombranti, obbligo di mantenere un comportamento consono, rispetto delle opere d'arte). Il personale di sorveglianza si riserva il diritto di rifiutare l'ingresso o di allontanare i trasgressori.`,
        ],
    },
    {
        number: 9,
        title: "LIMITAZIONE DI RESPONSABILITÀ",
        paragraphs: [
            `Domnia S.r.l., in qualità di fornitore della piattaforma tecnologica dPass in formula SaaS e di gestore dei pagamenti tramite PSP tramite il proprio account Stripe, risponde nei confronti dell'Acquirente per il corretto funzionamento del processo di pagamento e l'emissione della ricevuta di transazione. Restano estranei alla responsabilità di Domnia S.r.l. la gestione dei flussi museali, la qualità dei servizi d'ordine, gli orari di apertura ed eventuali disservizi logistici delle sedi espositive, compiti che restano di esclusiva competenza del Comune di Cremona. Analogamente, né Domnia S.r.l. né il Comune di Cremona rispondono di eventuali malfunzionamenti temporanei della rete internet o dei dispositivi dell'utente che impediscano la corretta ricezione o visualizzazione del Biglietto elettronico, né di ritardi o interruzioni imputabili al gestore del servizio di pagamento Stripe.`,
        ],
    },
    {
        number: 10,
        title: "PROPRIETA’ INTELLETTUALE",
        paragraphs: [
            `Tutti i diritti di autore, marchi registrati e qualsivoglia diritto di proprietà intellettuale sui materiali o i contenuti presentati come parte integrante del sito biglietteriamusei.comune.cremona.it sono di proprietà di Comune di Cremona e/o di coloro che ne hanno concesso licenza per il loro uso.`,
            `Se non diversamente ed esplicitamente previsto dalle presenti condizioni, Comune di Cremona non conferisce alcun diritto di utilizzare tale materiale. Ciò non impedirà di utilizzare questo sito web nella misura necessaria a perfezionare l'acquisto di Titoli d'Accesso.`,
        ],
    },
    {
        number: 11,
        title: "TRATTAMENTO DEI DATI PERSONALI (PRIVACY)",
        paragraphs: [
            `I dati personali forniti dall'Acquirente durante la procedura di acquisto sono trattati nel pieno rispetto del Regolamento UE 2016/679 (GDPR) e della normativa nazionale vigente. Il Comune di Cremona opera in qualità di Titolare del Trattamento, mentre Domnia S.r.l. tratta i dati necessari all'erogazione tecnica del servizio di biglietteria in qualità di Responsabile del Trattamento, adottando tutte le misure di sicurezza idonee a tutelare la riservatezza degli utenti.`,
        ],
    },
    {
        number: 12,
        title: "LEGGE APPLICABILE E FORO COMPETENTE",
        paragraphs: [
            `Il presente contratto è regolato dalla legge italiana. Per qualsiasi controversia concernente la validità, l'interpretazione, l'esecuzione o la risoluzione delle presenti Condizioni di Vendita, qualora l'Acquirente sia un consumatore, la competenza territoriale inderogabile spetta al giudice del luogo di residenza o di domicilio di quest'ultimo. In tutti gli altri casi, sarà competente in via esclusiva il Foro di Cremona.`,
        ],
    },
    {
        number: 13,
        title: "DATA DI ULTIMO AGGIORNAMENTO",
        paragraphs: [
            `Comune di Cremona si riserva il diritto di modificare e aggiornare le presenti Condizioni generali in ogni momento.`,
            `Le presenti condizioni generali sono state modificate da ultimo il 37 … 2034.`,
        ],
    },
];

export default function TermsContent() {
    return (
        <article
            lang="it"
            className="mx-auto w-[90%] max-w-[1000px] pt-[128px] pb-16 md:w-[85%] md:pt-[148px] md:pb-24"
        >
            <div className="rounded-2xl bg-white px-5 py-8 shadow-sm md:px-12 md:py-12 lg:px-16">
                <header className="border-b border-black/15 pb-8 md:pb-10">
                    <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
                        Termini e condizioni di vendita dei titoli di accesso ai Musei Civici di Cremona
                    </h1>
                </header>

                <div className="mt-8 md:mt-10">
                    {termsSections.map((section) => (
                        <section key={section.number} className="mt-8 first:mt-0 md:mt-10">
                            <h2 className="text-xl font-semibold leading-snug md:text-2xl">
                                {section.number}. {section.title}
                            </h2>
                            <div className="lato mt-3 text-base leading-7 md:text-lg md:leading-8">
                                {section.paragraphs.map((paragraph) => (
                                    <p key={paragraph} className="mt-4 first:mt-0">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </article>
    );
}

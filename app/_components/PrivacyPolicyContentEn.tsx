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

export default function PrivacyPolicyContentEn() {
    return (
        <article lang="en" className="mx-auto w-[90%] max-w-[1120px] pt-[128px] pb-16 md:w-[85%] md:pt-[148px] md:pb-24">
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
                            Tax code - VAT no. 00297960197
                        </p>
                        <p className="uppercase leading-5">
                            T. +39 0372 4071<br/>
                            F.<br/>
                            W. <a className="underline underline-offset-2" href="https://www.comune.cremona.it/">https://www.comune.cremona.it/</a><br/>
                            <a className="break-all underline underline-offset-2" href="mailto:spaziocomune@comune.cremona.it">spaziocomune@comune.cremona.it</a>
                        </p>
                    </div>

                    <div className="mt-12 text-center md:mt-16">
                        <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
                            Personal Data Processing Notice
                        </h1>
                        <p className="mt-6 text-2xl uppercase leading-tight md:text-3xl">
                            TICKETING SYSTEM
                            <span className="mt-1 block normal-case">of CREMONA CIVIC MUSEUMS</span>
                        </p>
                        <p className="mt-5 font-serif text-lg md:text-2xl">
                            pursuant to EU Regulation 2016/679
                        </p>
                    </div>
                </header>

                <div className="lato mt-10 text-base leading-7 md:text-lg md:leading-8">
                    <p>
                        This document is updated as of 26/08/2026. It is intended to inform the Data Subject about how data concerning them is used within the following processing activity/activities:
                    </p>

                    <div className="mt-6 overflow-x-auto">
                        <table className={tableClassName}>
                            <thead>
                                <tr>
                                    <th scope="col" className="border border-black/50 bg-[#b9dce8] px-4 py-2 text-lg font-semibold">
                                        Processing activities
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={tableCellClassName}>INTEGRATED TICKETING SYSTEM of CREMONA CIVIC MUSEUMS</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="mt-7">
                        Pursuant to Articles 13 and 14 of EU Regulation 2016/679, the Data Subject is informed that their data will be processed by the Data Controller defined in the <strong>Parties</strong> section, who processes the data for the purposes mentioned in the <strong>Purposes</strong> section, for a specific period of time defined in the <strong>Retention Period</strong> section, and the data may be disclosed to parties defined in the <strong>Disclosure</strong> section.
                    </p>
                    <p className="mt-4">
                        The Data Subject is also informed that they may exercise various rights with respect to their personal data; a list of these rights is provided at the end of this notice, in the <strong>Rights of the Data Subject</strong> section. The Data Subject&apos;s rights may be exercised at any time by contacting the Data Protection Officer (DPO) or, in their absence, the Data Controller.
                    </p>
                </div>

                <PolicySection
                    icon="/privacy-policy/image1.png"
                    title="Purpose of processing"
                    question="Why is my data processed?"
                >
                    <p>Processing of personal data is necessary to purchase a ticket for admission to the Cremona Civic Museums.</p>
                </PolicySection>

                <PolicySection
                    icon="/privacy-policy/image2.png"
                    title="Legal bases legitimizing the processing"
                    question="Which legal basis legitimizes the processing of my data?"
                >
                    <ul className="list-disc pl-7 marker:text-black">
                        <li className="pl-2">
                            Article 6(b) EU Reg. 679/2016. Processing is necessary for the performance of a contract to which the Data Subject is party, or in order to take steps at the request of the Data Subject prior to entering into a contract.
                        </li>
                    </ul>
                </PolicySection>

                <PolicySection
                    icon="/privacy-policy/image3.png"
                    title="Source of the data"
                    question="Where does the processed data come from?"
                >
                    <ul className="list-disc pl-7 marker:text-black">
                        <li className="pl-2">Collected from the Data Subject</li>
                    </ul>
                </PolicySection>

                <PolicySection
                    icon="/privacy-policy/image4.png"
                    title="Categories of data processed"
                    question="What data is processed?"
                >
                    <div className="overflow-x-auto">
                        <table className={`${tableClassName} min-w-[620px]`}>
                            <thead>
                                <tr>
                                    <th scope="col" className={tableHeaderClassName}>Category</th>
                                    <th scope="col" className={tableHeaderClassName}>Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={2} className={tableCellClassName}>Data suitable for revealing geographic location</td>
                                </tr>
                                <tr>
                                    <td rowSpan={2} className={tableCellClassName}>Contact data</td>
                                    <td className={tableCellClassName}>Email address</td>
                                </tr>
                                <tr>
                                    <td className={tableCellClassName}>Telephone contact</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </PolicySection>

                <PolicySection
                    icon="/privacy-policy/image3.png"
                    title="Data Controller"
                    question="Who is the Data Controller?"
                >
                    <div className="overflow-x-auto">
                        <table className={`${tableClassName} min-w-[680px]`}>
                            <thead>
                                <tr>
                                    <th scope="col" className={tableHeaderClassName}>Name</th>
                                    <th scope="col" className={tableHeaderClassName}>Contact details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={tableCellClassName}>Comune di Cremona<br/>(Municipality of Cremona)</td>
                                    <td className={tableCellClassName}>
                                        Phone: +39 0372 4071<br/>
                                        Email: <a className="break-all underline underline-offset-2" href="mailto:spaziocomune@comune.cremona.it">spaziocomune@comune.cremona.it</a><br/>
                                        Address: Piazza del Comune, 8, Cremona<br/>
                                        Website: <a className="break-all underline underline-offset-2" href="https://www.comune.cremona.it/">https://www.comune.cremona.it/</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </PolicySection>

                <PolicySection
                    icon="/privacy-policy/image3.png"
                    title="Data Protection Officer (DPO)"
                    question="Who is the Data Protection Officer?"
                >
                    <div className="overflow-x-auto">
                        <table className={`${tableClassName} min-w-[680px]`}>
                            <thead>
                                <tr>
                                    <th scope="col" className={tableHeaderClassName}>Name</th>
                                    <th scope="col" className={tableHeaderClassName}>Contact details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={tableCellClassName}>EMPATHIA SRL</td>
                                    <td className={tableCellClassName}>
                                        Phone: +39 0522 1606969<br/>
                                        Email: <a className="break-all underline underline-offset-2" href="mailto:dpo@empathia.it">dpo@empathia.it</a><br/>
                                        Address: Via Georgi Dimitrov n.42, 42123 Reggio Emilia<br/>
                                        Certified email (PEC): <a className="break-all underline underline-offset-2" href="mailto:empathia@legalmail.it">empathia@legalmail.it</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </PolicySection>

                <PolicySection
                    icon="/privacy-policy/image5.png"
                    title="Disclosure and communication of data"
                    question="Is the data disclosed or communicated to third parties?"
                >
                    <p>No dissemination of the data takes place.</p>
                    <div className="mt-6 overflow-x-auto">
                        <table className={`${tableClassName} min-w-[900px]`}>
                            <thead>
                                <tr>
                                    <th scope="col" className={tableHeaderClassName}>Category of recipients</th>
                                    <th scope="col" className={tableHeaderClassName}>Geographic location</th>
                                    <th scope="col" className={tableHeaderClassName}>Legal basis for extra-EU transfer</th>
                                    <th scope="col" className={tableHeaderClassName}>Notes on transfers or communications</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={tableCellClassName}>
                                        Disclosure to My Domnia and to Stripe for payment processing of the ticket. Disclosure of data necessary for the provision of the service to third parties appointed by the Municipality as data processors.
                                    </td>
                                    <td className={tableCellClassName}>Intra-EU</td>
                                    <td className={tableCellClassName}>—</td>
                                    <td className={tableCellClassName}>—</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </PolicySection>

                <PolicySection
                    icon="/privacy-policy/image6.png"
                    title="Whether providing the data is optional or mandatory"
                    question="Is providing my data optional or mandatory?"
                >
                    <p>Providing personal data as specified in this notice is optional.</p>
                </PolicySection>

                <PolicySection
                    icon="/privacy-policy/image7.png"
                    title="Possible consequences of failure to provide data"
                    question="What consequences may there be if the data is not provided?"
                >
                    <p>Failure to provide all requested data prevents the purchase of the ticket.</p>
                </PolicySection>

                <PolicySection
                    icon="/privacy-policy/image8.png"
                    title="Data retention period"
                    question="For how long will my data be kept?"
                >
                    <ul className="list-disc pl-7 marker:text-black">
                        <li className="pl-2">Data is retained until the purposes have been achieved.</li>
                    </ul>
                    <p className="mt-6">Data is retained in aggregate form for statistical purposes.</p>
                </PolicySection>

                <PolicySection
                    icon="/privacy-policy/image9.png"
                    title="Rights of the Data Subject"
                    question="The Data Subject has the right to exercise, where applicable, the rights set out in Articles 15–21 of EU Regulation 2016/679, by contacting the Data Controller or the Data Protection Officer directly, using the contact details provided in this notice, to request access, rectification, erasure, restriction of processing, portability, and objection to the processing of personal data."
                >
                    <ul className="space-y-6 pl-7">
                        <li className="list-disc pl-2 marker:text-black">
                            <h3 className="font-semibold">Access</h3>
                            <p className="mt-2">
                                The Data Subject has the right to obtain access to data concerning them, for example to obtain confirmation of whether or not such data exists, even if not yet recorded, and to have it communicated in an intelligible form.
                            </p>
                        </li>
                        <li className="list-disc pl-2 marker:text-black">
                            <h3 className="font-semibold">Portability</h3>
                            <p className="mt-2">
                                The Data Subject has the right to receive the personal data concerning them, which they have provided to a Data Controller, in a structured, commonly used, machine-readable format, and to transmit that data to another Data Controller without hindrance from the controller to whom it was originally provided.
                            </p>
                        </li>
                        <li className="list-disc pl-2 marker:text-black">
                            <h3 className="font-semibold">Rectification</h3>
                            <p className="mt-2">
                                The Data Subject has the right to obtain from the Data Controller, without undue delay, the rectification of inaccurate personal data concerning them. Considering the purposes of this processing, the Data Subject has the right to have incomplete personal data completed, including by means of a supplementary statement.
                            </p>
                        </li>
                        <li className="list-disc pl-2 marker:text-black">
                            <h3 className="font-semibold">Erasure</h3>
                            <p className="mt-2">
                                The Data Subject has the right to obtain from the Data Controller the erasure of personal data concerning them without undue delay, and the Data Controller is obliged to erase personal data without undue delay.
                            </p>
                        </li>
                        <li className="list-disc pl-2 marker:text-black">
                            <h3 className="font-semibold">Restriction</h3>
                            <p className="mt-2">
                                The Data Subject has the right to obtain restriction of processing from the Data Controller where the accuracy of the personal data is contested (for the period necessary to verify accuracy), where the processing is unlawful and the Data Subject requests restriction, where the Data Controller no longer needs the data for the purposes of processing but the Data Subject needs it to establish, exercise or defend legal claims; or pending verification regarding the possible prevalence of the Data Controller&apos;s legitimate grounds, when the Data Subject has objected to the processing.
                            </p>
                        </li>
                        <li className="list-disc pl-2 marker:text-black">
                            <h3 className="font-semibold">Right to object</h3>
                            <p className="mt-2">
                                The Data Subject has the right to object at any time, on grounds relating to their particular situation, to the processing of personal data concerning them pursuant to Article 6(1) (e) (performance of a task carried out in the public interest) or (f) (pursuit of the legitimate interests of the controller or a third party), including profiling based on those provisions.
                            </p>
                        </li>
                        <li className="list-disc pl-2 marker:text-black">
                            <h3 className="font-semibold">Withdrawal of consent</h3>
                            <p className="mt-2">
                                The Data Subject has the right to withdraw consent at any time, without affecting the lawfulness of processing based on consent given before withdrawal.
                            </p>
                        </li>
                        <li className="list-disc pl-2 marker:text-black">
                            <h3 className="font-semibold">Lodging a complaint with a supervisory authority</h3>
                        </li>
                    </ul>

                    <p className="mt-9">
                        The Data Subject may also withdraw consent previously given at any time, without affecting the lawfulness of processing based on consent given before withdrawal.
                    </p>
                    <p className="mt-4">
                        To exercise the above rights, the Data Subject may contact the Data Protection Officer or the Data Controller.
                    </p>
                    <p className="mt-4">
                        The Data Subject has the right to lodge a complaint with a supervisory authority by writing to <a className="break-all underline underline-offset-2" href="mailto:garante@gpdp.it">garante@gpdp.it</a>, or by certified email (PEC) to <a className="break-all underline underline-offset-2" href="mailto:protocollo@pec.gpdp.it">protocollo@pec.gpdp.it</a>.
                    </p>
                </PolicySection>
            </div>
        </article>
    );
}

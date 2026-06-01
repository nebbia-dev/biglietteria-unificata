import Image from "next/image";
import TicketCard from "@/app/_components/TicketCard";
import TwoPartsDescription from "@/app/_components/TwoPartsDescription";
import EventCard from "@/app/_components/EventCard";
import {getExperiences} from "@/app/lib/domnia-experiences";

export const dynamic = 'force-dynamic';

export default async function MuseoCambonino() {

    let content, museums, filteredMuseums, bundle, standard, groups, schools, contentEvents, events;

    try {
        museums = await getExperiences('/');
        filteredMuseums = museums.filter(el => el.tagIds.includes(15));
        bundle = museums.filter(el => el.tagIds.includes(10) && el.slug.includes('cumulativo'))[0];
        standard = filteredMuseums.filter(el => el.tagIds.includes(7))[0];
        groups = filteredMuseums.filter(el => el.tagIds.includes(8))[0];
        schools = filteredMuseums.filter(el => el.tagIds.includes(9))[0];
        events = museums.filter(el => el.tagIds.includes(11));

        const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/museums/' + process.env.NEXT_CAMBONINO +'?populate=*',
            {next: {revalidate: 1000}}
        );
        content = await data.json();

        const dataEvents = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/events?populate=*',
            {next: {revalidate: 1000}}
        );
        contentEvents = await dataEvents.json();

        for(const event of events) {
            for(const contentEvent of contentEvents.data) {
                if(event.slug === contentEvent.slug) {
                    event.immagine = contentEvent.immagine
                }
            }
        }

    } catch(e) {
        console.log(e);
    }

    // tag:7/8/9/10
    // tag:15

    return(
        <>
            <Image
                // src='/placeholders/0-hero.jpg'
                src={process.env.NEXT_PUBLIC_BASE_URL + content.data.immagine.url}
                alt="Cremona vista dall'alto" width={500} height={500}
                className="w-full h-[70dvh] object-cover"
            />
            {/*Lista biglietti*/}
            <section className="w-[90%] md:w-[85%] mx-auto pt-8">
                <div className="mb-8">
                    <p className="text-sm mb-8 font-light">Home / {content.data.titolo}</p>
                    <h1 className="text-4xl mb-4 font-semibold">{content.data.titolo}</h1>
                    <h2 className="text-2xl font-medium mb-2">{content.data.sottotitolo}</h2>
                    <TwoPartsDescription
                        partOne={content.data.descrizione_1}
                        partTwo={content.data.descrizione_2}
                    />
                </div>

                <div className="flex flex-col md:flex-row w-full md:flex-wrap gap-4">
                    <div className="w-full">
                        <TicketCard layout="half" el={{
                            titolo: "Ticket",
                            nome: "Ticket " + standard?.title,
                            descrizione: standard?.description?.replace(/<\/?[^>]+(>|$)/g, ""),
                            infoPrezzo: "A partire da:",
                            prezzo: standard?.cheapest,
                            pic: "0-ticket",
                            slug: standard?.slug,
                            immagine: content.data.immagine_biglietti_standard
                        }}/>
                    </div>

                        <TicketCard
                            layout="third"
                            el={{
                                titolo: "Ticket Cumulativo",
                                nome: bundle?.title,
                                descrizione: bundle?.description?.replace(/<\/?[^>]+(>|$)/g, ""),
                                infoPrezzo: "",
                                prezzo: bundle?.cheapest,
                                slug: bundle?.slug,
                                immagine: content.data.immagine_biglietto_cumulativo
                            }}/>

                        <TicketCard
                            layout="third"
                            el={{
                                titolo: "Gruppi",
                                nome: groups?.title,
                                descrizione: groups?.description?.replace(/<\/?[^>]+(>|$)/g, ""),
                                infoPrezzo: "A partire da:",
                                prezzo: groups?.cheapest,
                                pic: "cumulativo",
                                slug: groups?.slug,
                                immagine: content.data.immagine_biglietti_gruppi
                            }}/>

                        <TicketCard
                            layout="third"
                            el={{
                                titolo: "Servizi educativi",
                                nome: schools?.title,
                                descrizione: schools?.description?.replace(/<\/?[^>]+(>|$)/g, ""),
                                infoPrezzo: "A partire da:",
                                prezzo: schools?.cheapest,
                                pic: "cumulativo",
                                slug: schools?.slug,
                                immagine: content.data.immagine_biglietti_scuole
                            }}/>

                    </div>
            </section>

            {/*Proposte educative*/}
            <section className="w-[90%] md:w-[85%] mx-auto pt-8">
                <div
                    className="flex flex-col md:flex-row md:items-center h-[300px] gap-8 p-4 mt-2 w-full text-white rounded-xl gradient">
                    <Image src="/placeholders/card_servizi educativi.webp"
                           alt="Bambini e genitori in una biblioteca"
                           width={200} height={100}
                           className="md:w-2/4 md:h-full rounded-xl"
                    />
                    <div>
                        <h3 className="text-2xl font-semibold mt-2 prime-text">Proposte educative</h3>
                        <p>Dalle scuole dell&apos;infanzia, fino agli adulti lavoriamo per aprire le porte dei musei e
                            renderli
                            accessibili al più ampio numero possibile di persone.</p>
                        <div className="mb-4 md:mt-8 text-black w-full text-end font-medium text-lg md:text-base">
                            <a
                                aria-label="Vai alla pagina dedicata alle nostre proposte educative"
                                target="_blank" rel="noopener noreferrer"
                                href="https://musei.comune.cremona.it/it/servizi-educativi/informazioni-didattica"
                                className="w-fit prime-bg rounded-full px-4 py-2 md:text-sm">Scopri di più</a>
                        </div>
                    </div>
                </div>
            </section>

            {/*Eventi*/}
            <section className="w-[90%] md:w-[85%] mx-auto pt-8">
                <h2 className="text-2xl font-semibold mt-4 mb-8">Eventi</h2>
                <EventCard events={events} limit={3}/>
            </section>
        </>
    )
}

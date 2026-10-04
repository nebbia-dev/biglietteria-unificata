import type { Metadata } from "next";
import TicketCard from "@/app/_components/TicketCard";
import TwoPartsDescription from "@/app/_components/TwoPartsDescription";
import EventCard from "@/app/_components/EventCard";
import {getExperiences} from "@/app/lib/domnia-experiences";
import PropEdu from "@/app/_components/PropEdu";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Museo della civiltà contadina "Il Cambonino Vecchio"',
    description: 'Biglietti e informazioni per visitare il Museo della civiltà contadina "Il Cambonino Vecchio" di Cremona.',
};

export default async function MuseoCambonino() {

    let content, museums, filteredMuseums, bundle, standard, groups, schools, contentEvents, events, contentEduImg;

    try {
        museums = await getExperiences('/');
        filteredMuseums = museums.filter(el => el.tagIds.includes(Number(process.env.NEXT_TAG_CONTADINO)));
        bundle = museums.filter(el => el.tagIds.includes(Number(process.env.NEXT_TAG_EXTRA)) && el.slug.includes('cumulativo'))[0];
        standard = filteredMuseums.filter(el => el.tagIds.includes(Number(process.env.NEXT_TAG_STANDARD)))[0];
        groups = filteredMuseums.filter(el => el.tagIds.includes(Number(process.env.NEXT_TAG_GRUPPI)))[0];
        schools = filteredMuseums.filter(el => el.tagIds.includes(Number(process.env.NEXT_TAG_SCUOLE)))[0];
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

        const dataEduImg = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/info-gruppi?populate=*',
            {next: {revalidate: 1000}}
        );
        contentEduImg = await dataEduImg.json();

    } catch(e) {
        console.log(e);
    }

    // tag:7/8/9/10
    // tag:15

    return(
        <>
            <img
                // src='/placeholders/0-hero.jpg'
                src={process.env.NEXT_PUBLIC_BASE_URL + content.data.immagine.url}
                alt={content.data.immagine.alternativeText} width={2000} height={1000}
                className="w-full h-[70dvh] object-cover pt-[80px]"
            />
            {/*Lista biglietti*/}
            <section className="w-[90%] md:w-[85%] mx-auto pt-8">
                <div className="mb-8">
                    <p className="text-sm mb-8 font-light">Home / {content.data.titolo}</p>
                    <h1 className="text-4xl mb-4 font-semibold">{content.data.titolo}</h1>
                    {content.data.sottotitolo && <h2 className="text-2xl font-medium mb-2">{content.data.sottotitolo}</h2>}
                    <TwoPartsDescription
                        lang="it"
                        partOne={content.data.descrizione_1}
                        partTwo={content.data.descrizione_2}
                    />
                </div>

                <div className="flex flex-col md:flex-row w-full md:flex-wrap gap-4">
                    <div className="w-full">
                        <TicketCard
                        lang="it"
                            layout="half"
                            disabled={standard?.disabled ?? false}
                            el={{
                            titolo: "Ticket",
                            nome: standard?.title,
                            descrizione: standard?.shortDescription?.replace(/<\/?[^>]+(>|$)/g, ""),
                            infoPrezzo: "A partire da:",
                            prezzo: standard?.cheapest,
                            pic: "0-ticket",
                            slug: standard?.slug,
                            immagine: content.data.immagine_biglietti_standard
                        }}/>
                    </div>

                        <TicketCard
                            lang="it"
                            layout="third"
                            disabled={bundle?.disabled ?? false}
                            el={{
                                titolo: "Ticket Cumulativo",
                                nome: bundle?.title,
                                descrizione: bundle?.subtitle,
                                infoPrezzo: "",
                                prezzo: bundle?.cheapest,
                                slug: bundle?.slug,
                                immagine: content.data.immagine_biglietto_cumulativo
                            }}/>

                        <TicketCard
                            lang="it"
                            layout="third"
                            disabled={groups?.disabled ?? false}
                            el={{
                                titolo: "Gruppi",
                                nome: groups?.title,
                                descrizione: groups?.shortDescription?.replace(/<\/?[^>]+(>|$)/g, ""),
                                infoPrezzo: "A partire da:",
                                prezzo: groups?.cheapest,
                                pic: "cumulativo",
                                slug: groups?.slug,
                                immagine: content.data.immagine_biglietti_gruppi
                            }}/>

                        <TicketCard
                            lang="it"
                            layout="third"
                            disabled={schools?.disabled ?? false}
                            el={{
                                titolo: "Servizi educativi",
                                nome: schools?.title,
                                descrizione: schools?.shortDescription?.replace(/<\/?[^>]+(>|$)/g, ""),
                                infoPrezzo: "A partire da:",
                                prezzo: schools?.cheapest,
                                pic: "cumulativo",
                                slug: schools?.slug,
                                immagine: content.data.immagine_biglietti_scuole
                            }}/>

                    </div>
            </section>

            {/*Proposte educative*/}
            <PropEdu image={contentEduImg.data.immagine_proposte_educative.url} alt={contentEduImg.data.immagine_proposte_educative.alternativeText}/>

            {/*Eventi*/}
            {events && events.length > 0 &&
                <section className="w-[90%] md:w-[85%] mx-auto pt-8">
                    <h2 className="text-3xl font-semibold my-8">Eventi</h2>
                    <EventCard lang="it" events={events} limit={3}/>
                </section>
            }
        </>
    )
}

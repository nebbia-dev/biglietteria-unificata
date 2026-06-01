import EventCard from "@/app/_components/EventCard";
import {getExperiences} from "@/app/lib/domnia-experiences";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function NewsEventi() {

    let museums, content, contentEvents, events;

    try {

        museums = await getExperiences('/');
        events = museums.filter(el => el.tagIds.includes(11));

        const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/news?populate=*',
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

    return(
        <>
            {/*Lista biglietti*/}
            <section className="w-[90%] mx-auto pt-[128px] md:pt-[148px]">
                <div className="mb-8">
                    <p className="text-sm mb-8 font-light">Home / {content.data.titolo}</p>
                    <h1 className="text-4xl mb-4 font-semibold">{content.data.titolo}</h1>
                    <p className="text-xl">{content.data.descrizione}</p>
                </div>

                <div className="flex flex-col gap-4">
                    <EventCard events={events} limit={1000}/>
                </div>
            </section>

            {/*News*/}
            <section className="w-[90%] mx-auto pt-8">
                <h2 className="text-2xl font-semibold mt-4 mb-8">News</h2>
                <div className="w-full md:1/2">
                    <div className="flex flex-col gap-4 p-4 w-full rounded-xl gradient">
                        <h3 className="px-4 text-2xl font-semibold mt-2 prime-text">Leggi le ultime
                            novità</h3>
                        <Image
                            className="w-full h-[300px] object-cover rounded-4xl p-4"
                            src="/placeholders/news.jpg" alt="Interno" width={300} height={200}/>

                        <div className="text-black w-full md:flex md:justify-end font-medium text-sm p-4">
                            <a target="_blank"
                               rel="noopener noreferrer" aria-label="Vai alla pagina con le news"
                               href="https://musei.comune.cremona.it/it/notizie-e-avvisi"
                               className="w-auto block text-center prime-bg rounded-full px-4 py-2">Vai a tutte le
                                news</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

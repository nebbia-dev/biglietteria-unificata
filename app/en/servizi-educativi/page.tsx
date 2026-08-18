import TicketCard from "@/app/_components/TicketCard";
import {getExperiences} from "@/app/lib/domnia-experiences";
import type { ExperienceCardData } from "@/app/lib/domnia-types";

export const dynamic = 'force-dynamic';

export default async function ServiziEducativi() {

    let content, contentMuseums;
    let filteredMuseums: ExperienceCardData[] = [];

    try {
        const museums = await getExperiences('/', { locale: 'en' });
        filteredMuseums = museums.filter(el => el.tagIds.includes(Number(process.env.NEXT_TAG_SCUOLE)));

        const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/servizi-educativi?locale=en&populate=*',
            {next: {revalidate: 1000}}
        );
        content = await data.json();

        const dataMuseums = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/museums?locale=en&populate=*',
            {next: {revalidate: 1000}})
        contentMuseums = await dataMuseums.json();

        for(const museum of filteredMuseums) {
            for(const contentMuseum of contentMuseums.data) {

                if(museum.slug === contentMuseum.slug_scuole) {
                    museum.ticketImage = contentMuseum.immagine_biglietti_scuole;
                    museum.ordine = contentMuseum.ordine;
                    break;
                }
            }
        }

        //     HERE
        function sortFilteredMuseumsByOrder() {
            filteredMuseums.sort((a, b) => {
                const orderA = Number(a.ordine ?? Number.MAX_SAFE_INTEGER);
                const orderB = Number(b.ordine ?? Number.MAX_SAFE_INTEGER);

                return orderA - orderB;
            });
        }

        sortFilteredMuseumsByOrder();

    } catch(e) {
        console.log(e);
    }

    return(
        <>
            {/*Lista biglietti*/}
            <section className="w-[90%] md:w-[85%] mx-auto pt-[128px] md:pt-[148px]">
                <div className="mb-8">
                    <p className="text-sm mb-8 font-light">Home / {content.data.titolo}</p>
                    <h1 className="text-4xl mb-4 font-semibold">{content.data.titolo}</h1>
                    <p className="text-xl lato">{content.data.descrizione}</p>
                </div>

                <div className="flex flex-col md:flex-row w-full md:flex-wrap gap-4">
                    {
                        filteredMuseums &&
                        filteredMuseums.map(el => {
                            return (
                                <TicketCard
                                    lang="en"
                                    key={el.documentId}
                                    layout="fourth"
                                    disabled={el.disabled}
                                    el={{
                                    titolo: "",
                                    nome: el.title,
                                    descrizione: el.shortDescription?.replace(/<\/?[^>]+(>|$)/g, ""),
                                    infoPrezzo: "",
                                    prezzo: el.cheapest,
                                    pic: "0-groups",
                                    slug: el.slug,
                                    immagine: el.ticketImage
                                }}/>
                            )
                        })
                    }


                </div>
            </section>

            {/*Gruppi scolastici*/}
            <section className="w-[90%] md:w-[85%] mx-auto pt-8">
                <h2 className="text-2xl font-semibold mt-4 mb-8">Educational programs</h2>

                <div
                    className="flex flex-col md:flex-row md:items-end gap-8 p-4 md:p-8 mt-2 w-full text-white md:text-base rounded-xl gradient">
                    <img
                        className="w-full md:w-2/4 h-[200px] md:h-[300px] object-cover rounded-xl"
                        src={process.env.NEXT_PUBLIC_BASE_URL + content.data.immagine_proposte_educative.url} alt={content.data.immagine_proposte_educative.alternativeText} width={300} height={200}/>
                    <div>
                        <div className="mb-8 md:mb-20">
                            <p>{content.data.proposte_educative_testo}
                            </p>
                            {/*<p className="mt-2">*/}
                            {/*    Admission for students is free of charge.  A mandatory 2€ reservation fee applies to each student.*/}
                            {/*</p>*/}
                        </div>
                        <div className="md:mt-8 text-black w-full md:flex md:justify-end font-medium text-sm">
                            <a aria-label="Go to the educational programs page" target="_blank" rel="noopener noreferrer"
                               href={content.data.proposte_educative_link}
                               className="w-auto block text-center prime-bg rounded-full px-4 py-2">Go to the website</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

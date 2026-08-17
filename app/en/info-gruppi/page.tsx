import TicketCard from "@/app/_components/TicketCard";
import Link from "next/link";
import {getExperiences} from "@/app/lib/domnia-experiences";
import type { ExperienceCardData } from "@/app/lib/domnia-types";

export const dynamic = 'force-dynamic';

export default async function InfoGruppi() {

    let content, contentMuseums;
    let filteredMuseums: ExperienceCardData[] = [];

    try {
        const museums = await getExperiences('/', { locale: 'en' });
        filteredMuseums = museums.filter(el => el.tagIds?.includes(Number(process.env.NEXT_TAG_GRUPPI)));

        const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/info-gruppi?locale=en&populate=*',
            {next: {revalidate: 1000}}
        );
        content = await data.json();

        const dataMuseums = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/museums?locale=en&populate=*',
            {next: {revalidate: 1000}})
        contentMuseums = await dataMuseums.json();

        for(const museum of filteredMuseums) {
            for(const contentMuseum of contentMuseums.data) {

                if(museum.slug === contentMuseum.slug_gruppi) {
                    museum.ticketImage = contentMuseum.immagine_biglietti_gruppi;
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
            <img
                src={process.env.NEXT_PUBLIC_BASE_URL + content.data.immagine.url}
                alt="Cremona vista dall'alto" width={2000} height={1000}
                className="w-full h-[70dvh] object-cover pt-[80px]"
            />
            {/*Lista biglietti*/}
            <section className="w-[90%] md:w-[85%] mx-auto pt-8">
                <div className="mb-8">
                    <p className="text-sm mb-8 font-light">Home / {content.data.titolo}</p>
                    <h1 className="text-4xl mb-4 font-semibold">{content.data.titolo}</h1>
                    <p className="text-xl lato">{content.data.descrizione}</p>
                </div>

                <div className="flex flex-col md:flex-row w-full md:flex-wrap gap-4">
                    {
                        filteredMuseums &&
                        filteredMuseums.map((el) => {
                            return(
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
                <h2 className="text-2xl font-semibold mt-4 mb-8">School groups</h2>
                <div className="md:flex md:gap-4">
                    <div className="md:w-[calc(50%-0.5rem)] p-4 mt-4 md:mt-2 w-full text-white rounded-xl gradient">
                        <h3 className="text-2xl font-semibold my-4 prime-text">Educational services</h3>
                        <img
                            className="w-full h-[200px] object-cover rounded-xl"
                            src={process.env.NEXT_PUBLIC_BASE_URL + content.data.immagine_servizi_educativi.url} alt={content.data.immagine_servizi_educativi.alternativeText} width={300} height={200}/>

                        <p className="h-[100px] mt-8 text-xl md:text-base">Click here if you want to book museum access for your school group.</p>
                        <div className="flex items-center h-[64px] text-black w-full md:flex md:justify-end font-medium text-sm">
                            <Link aria-label="Go to the educational services page" href="/en/servizi-educativi" className="h-fit w-auto block text-center prime-bg rounded-full px-4 py-2">Find out more</Link>
                        </div>
                    </div>

                    <div className="md:w-[calc(50%-0.5rem)] p-4 mt-4 md:mt-2 w-full text-white rounded-xl gradient">
                        <h3 className="text-2xl font-semibold my-4 prime-text">Educational programs</h3>
                        <img
                            className="w-full h-[200px] object-cover rounded-xl"
                            src={process.env.NEXT_PUBLIC_BASE_URL + content.data.immagine_proposte_educative.url} alt={content.data.immagine_proposte_educative.alternativeText} width={300} height={200}/>
                        <p className="h-[100px] mt-8 text-xl md:text-base">Explore our educational programs designed for all ages. From preschoolers to adults, we are committed to making our museums open and accessible to everyone.
                        </p>
                        <div className="flex items-center h-[64px] text-black w-full md:flex md:justify-end font-medium text-sm">
                            <a aria-label="Go to the educational programs page" target="_blank"
                               rel="noopener noreferrer" href="https://musei.comune.cremona.it/it/servizi-educativi/informazioni-didattica"
                               className="h-fit w-auto block text-center prime-bg rounded-full px-4 py-2">Go to website</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

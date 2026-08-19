import {unstable_rethrow} from "next/navigation";
import Link from "next/link";
import {CircledArrow} from "@/app/_components/_icons/CircledArrow";
import EventCard from "@/app/_components/EventCard";
import {getExperiences} from "@/app/lib/domnia-experiences";
import Carousel from "@/app/_components/Carousel";
import ContactForm from "@/app/_components/ContactForm";
import type { ExperienceCardData } from "@/app/lib/domnia-types";
import type { StrapiMuseum } from "@/app/lib/strapi-types";

export const dynamic = 'force-dynamic';

function getMuseumOrder(museum: Pick<StrapiMuseum, 'ordine'>) {
    const order = Number(museum.ordine ?? Number.MAX_SAFE_INTEGER);

    return Number.isFinite(order) ? order : Number.MAX_SAFE_INTEGER;
}

function sortMuseumsByOrder(museums: StrapiMuseum[]) {
    return [...museums].sort((a, b) => getMuseumOrder(a) - getMuseumOrder(b));
}

function setLink(n:number) {
    switch(n) {
        case 36:
            return 'museo-civico-ala-ponzone';
        case 33:
            return 'museo-archeologico-san-lorenzo';
        case 30:
            return 'museo-di-storia-naturale';
        case 15:
            return 'museo-della-civilta-contadina';
        default:
            return 'museo-civico-ala-ponzone';
    }
}

function deleteTicket(s:string) {
    return s.replace('Ticket', '');
}

export default async function Home() {

    let museums, content, contentMuseums, filteredMuseums, bundle, contentEvents, events, contentNews;
    const pics = [];

    try {

        museums = await getExperiences('/', { locale: 'en' });
        filteredMuseums = museums.filter(el => el.tagIds.includes(Number(process.env.NEXT_TAG_MUSEI)));
        bundle = museums.filter(el => el.tagIds.includes(Number(process.env.NEXT_TAG_EXTRA)) && el.slug.includes('pass'))[0];
        events = museums.filter(el => el.tagIds.includes(11));

        const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/homepage?locale=en&populate=*',
            {next: {revalidate: 1000}}
        );
        content = await data.json();

        const dataNews = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/news?locale=en&populate=*',
            {next: {revalidate: 1000}}
        );
        contentNews = await dataNews.json();

        const dataMuseums = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/museums?locale=en&populate=*',
            {next: {revalidate: 1000}})
        contentMuseums = await dataMuseums.json();

        const filteredMuseumsBySlug = new Map(
            filteredMuseums.map((museum: ExperienceCardData) => [museum.slug, museum]),
        );
        const orderedFilteredMuseums: ExperienceCardData[] = [];

        for(const contentMuseum of sortMuseumsByOrder(contentMuseums.data ?? [])) {
            const museum = filteredMuseumsBySlug.get(contentMuseum.slug);

            if(!museum) {
                continue;
            }

            const heroImage = {
                ...contentMuseum.immagine,
                ordine: contentMuseum.ordine,
                slug: contentMuseum.slug,
                titolo: contentMuseum.titolo,
            };

            pics.push(heroImage);
            orderedFilteredMuseums.push({
                ...museum,
                heroImage,
                ordine: contentMuseum.ordine ?? undefined,
                ticketImage: contentMuseum.immagine_biglietti_standard,
            });
        }

        filteredMuseums = orderedFilteredMuseums;

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
        unstable_rethrow(e);
        console.log(e)
    }

    const homepage = content.data;
    const mobileTitle = homepage.titolo_mobile || homepage.titolo;
    const mobileDescription = homepage.descrizione_mobile || homepage.descrizione;

  return (
    <>
      {/*<img*/}
      {/*    src={process.env.NEXT_PUBLIC_BASE_URL + homepage.immagine.url}*/}
      {/*    alt="Cremona vista dall'alto" width={500} height={500}*/}
      {/*    className="w-full h-[70dvh] object-cover object-top block md:hidden"*/}
      {/*/>*/}
        <div className="md:hidden block w-full pt-[80px]">
            <img
                className="w-full h-full object-cover rounded-t-xl"
                src={process.env.NEXT_PUBLIC_BASE_URL + content.data.immagine.url}
                alt={content.data.immagine.alternativeText} width={300} height={200}/>
        </div>
        <Carousel pics={pics} lang="en"/>
        {/*Lista musei*/}
        <section className="w-[90%] md:w-[85%] mx-auto pt-8 md:pt-20">
            <div className="mb-8 md:mb-12">
                <h1 className="text-4xl mb-4 font-semibold">
                    <span className="md:hidden">{mobileTitle}</span>
                    <span className="hidden md:inline">{homepage.titolo}</span>
                </h1>
                <p className="text-xl">
                    <span className="md:hidden">{mobileDescription}</span>
                    <span className="hidden md:inline">{homepage.descrizione}</span>
                </p>
            </div>

            <h2 className="sr-only">Museums</h2>
            <div className="flex flex-col lg:flex-row gap-4">
                {filteredMuseums &&
                    filteredMuseums.map((el) => {
                        if (!el.heroImage || !el.ticketImage) {
                            return null;
                        }

                        return (
                            <div className="w-full lg:w-1/2 xl:w-1/4 text-white rounded-xl gradient"
                                 key={el.title}>
                                <div className="w-full h-[200px] block lg:hidden">
                                    <img
                                        className="w-full h-full object-cover rounded-t-xl"
                                        src={process.env.NEXT_PUBLIC_BASE_URL + el.heroImage.url}
                                        alt={el.heroImage.alternativeText} width={300} height={200}/>
                                </div>
                                <div className="p-4 mt-2">
                                    <div className="h-[56px]">
                                        <h3 className="text-2xl md:text-lg font-medium md:line-clamp-2">{deleteTicket(el.title)}</h3>
                                        {/*<p className="text-sm">{getAddress(el.locations[0]?.label)}</p>*/}
                                    </div>

                                    <div className="flex flex-col gap-4 bg-white rounded-xl text-black p-4 mt-8 mb-4">
                                        <img
                                            className="w-full h-[200px] object-cover rounded-xl"
                                            src={process.env.NEXT_PUBLIC_BASE_URL + el.ticketImage.url}
                                            alt={`Interno del ${el.title}`} width={300} height={200}/>
                                        <div className="flex flex-col gap-2">
                                            <h4 className="text-xl md:text-base font-medium md:line-clamp-2 h-[48px]">{el.title}</h4>
                                            <p className="line-clamp-6 md:text-sm lato h-[120px]">
                                                {el.shortDescription?.replace(/<\/?[^>]+(>|$)/g, "")}
                                            </p>
                                            <div className="flex items-center justify-between mt-4 h-[64px]">
                                                {el.cheapest
                                                    ? <p className="text-sm">Starting from <br/><span
                                                        className="text-xl font-medium">{new Intl.NumberFormat("de-DE", {
                                                        style: "currency",
                                                        currency: "EUR"
                                                    }).format(el.cheapest)}</span></p>

                                                    : <p className="text-base font-medium">Free</p>
                                                }
                                                {/*<p className="text-sm">A partire da: <br/><span className="text-xl font-medium">{el.cheapest}</span></p>*/}
                                                <a
                                                    aria-label={`Go to the page to purchase the standard ticket for ${el.title}`}
                                                    target="_blank" rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-lg md:text-sm font-medium prime-bg rounded-full md:px-3 px-4 py-2 md:py-1"
                                                    href={`https://shopbiglietteriamusei.comune.cremona.it/en/products/${el.slug}`}>
                                                    Book
                                                    <CircledArrow width={28} height={28}/>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="w-full text-end font-medium prime-text underline text-xl md:text-base px-4 pb-8">
                                    <Link
                                        aria-label={`Go to the page with ticket options for ${el.title}`}
                                        href={`/en/${setLink(el.id)}`}>Discover other experiences</Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>

        {/*Biglietto cumulativo*/}
        {bundle && (
        <section className="w-[90%] md:w-[85%] mx-auto pt-8">
            <div className="w-full text-white rounded-xl gradient">
                <div className="p-4 md:p-8 mt-2 flex flex-col md:flex-row md:items-center md:gap-8">
                    <div>
                        <h2 className="text-2xl font-semibold prime-text mt-4">All-Museums Ticket</h2>
                        <p className="text-xl md:text-base font-medium mt-2">
                            {homepage.biglietto_cumulativo_testo}
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 bg-white rounded-xl text-black p-4 mt-8 mb-4">
                        <img src={process.env.NEXT_PUBLIC_BASE_URL + content.data.immagine_biglietto_cumulativo.url}
                            className="w-full h-[200px] object-cover rounded-xl"
                             alt={content.data.immagine_biglietto_cumulativo.alternativeText} width={300} height={200}/>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl md:text-base font-medium">{bundle.title}: <br/>
                                <span className="font-normal">{bundle.subtitle}</span>
                            </h3>
                            <div className="w-full flex items-center justify-end mt-4">
                                <a
                                    aria-label="Go to the page to purchase the all-museums ticket"
                                    target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-lg md:text-base font-medium prime-bg rounded-full px-4 py-2"
                                    href={`https://shopbiglietteriamusei.comune.cremona.it/en/products/${bundle.slug}`}>
                                    Book
                                    <CircledArrow width={28} height={28}/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        )}

        {/*Biglietto gruppi*/}
        <section className="w-[90%] md:w-[85%] mx-auto flex flex-col md:flex-row md:gap-8">
            <div className="w-full md:w-1/2 pt-8">
                <div className="flex flex-col gap-8 p-4 mt-2 w-full text-white rounded-xl gradient">
                    <h2 className="text-2xl font-semibold mt-4 prime-text">Group ticket</h2>
                    <img
                        className="w-full h-[200px] object-cover rounded-xl"
                        src={process.env.NEXT_PUBLIC_BASE_URL + homepage.immagine_gruppi.url} alt={homepage.immagine_gruppi.alternativeText} width={300} height={200}/>

                    <p className="text-xl md:text-base md:h-[64px]">{homepage.ticket_gruppi_testo}
                    </p>
                    <div className="mb-4 text-black w-full font-medium text-lg md:flex md:justify-end">
                        <Link
                            aria-label="Go to the page with information about group visits"
                            href="/en/info-gruppi" className="md:text-base w-auto block text-center prime-bg rounded-full px-4 py-2 md:w-fit">Find out more</Link>
                    </div>
                </div>
            </div>

            {/*Servizi educativi*/}
            <div className="w-full md:w-1/2 pt-8">
                <div className="flex flex-col gap-8 p-4 mt-2 w-full text-white rounded-xl gradient">
                    <h2 className="text-2xl font-semibold mt-4 prime-text">Educational services</h2>
                    <img
                        className="w-full h-[200px] object-cover rounded-xl"
                        src={process.env.NEXT_PUBLIC_BASE_URL + homepage.immagine_scuole.url} alt={homepage.immagine_scuole.alternativeText} width={300} height={200}/>

                    <p className="text-xl md:text-base md:h-[64px]">
                        {homepage.servizi_educativi_testo}
                    </p>
                    <div className="mb-4 text-black w-full font-medium text-lg md:flex md:justify-end">
                        <Link
                            aria-label="Go to the page with information about school group visits"
                            href="/en/servizi-educativi" className="md:text-base w-auto block text-center prime-bg rounded-full px-4 py-2 md:w-fit">Find out more</Link>
                    </div>
                </div>
            </div>
        </section>

        {/*Eventi*/}
        {events && events.length > 0 &&
            <section className="w-[90%] md:w-[85%] mx-auto pt-8">
                <h2 className="text-3xl font-semibold my-8">Events</h2>
                <EventCard lang="en" events={events} limit={3}/>
            </section>
        }

        {/*News*/}
        <section className="w-[90%] md:w-[85%] mx-auto flex md:flex-row flex-col md:gap-8">
            <div className="w-full md:1/2 pt-8">
                <div className="flex flex-col gap-8 p-4 mt-2 w-full rounded-xl gradient">
                    <h2 className="md:hidden text-3xl text-white font-semibold mt-2">News</h2>
                    <h2 className="md:block hidden text-2xl font-semibold mt-2 prime-text">Read the last news</h2>
                    <img
                        className="w-full h-[300px] object-cover rounded-4xl p-4"
                        src={process.env.NEXT_PUBLIC_BASE_URL + contentNews.data.immagine.url} alt={contentNews.data.immagine.alternativeText} width={300} height={200}/>

                    <div className="text-black w-full md:flex md:justify-end font-medium text-sm">
                        <Link href="/en/news-eventi"
                              className="md:w-fit w-auto block text-center prime-bg rounded-full px-4 py-2">
                            Go to all news
                        </Link>
                    </div>
                </div>
            </div>

            {/*Musei Italiani*/}
            <div className="w-full md:1/2 pt-8 md:h-full">
                <div className="flex flex-col gap-12 p-4 mt-2 w-full rounded-xl gradient md:h-full">
                    <h3 className="text-2xl font-semibold mt-2 prime-text">Musei Italiani</h3>
                    <img src='/placeholders/card_musei_italiani.png'
                         alt="Logo di Musei Italiani" width={200} height={300}
                         className="w-full h-[268px] object-contain p-4 rounded-xl hidden md:block rounded bg-[#2b479f]"
                    />
                    <div className="text-black w-full md:flex md:justify-end font-medium text-sm">
                        <a aria-label="Go to the Musei Italiani website" href="https://www.museiitaliani.it/"
                           target="_blank" rel="noopener noreferrer"
                           className="md:w-fit w-auto block text-center prime-bg rounded-full px-4 py-2">Visit the
                            website</a>
                    </div>
                </div>
            </div>
        </section>

        {/*Contact form*/}
        <ContactForm lang="en" text="Send us an email"/>

    </>
  );
}

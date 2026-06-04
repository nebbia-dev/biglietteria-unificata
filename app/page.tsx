import Image from "next/image";
import {unstable_rethrow} from "next/navigation";
import Link from "next/link";
import {CircledArrow} from "@/app/_components/_icons/CircledArrow";
import EventCard from "@/app/_components/EventCard";
import {getExperiences} from "@/app/lib/domnia-experiences";
import Carousel from "@/app/_components/Carousel";
import getAddress from "@/helpers/address/getAddress";
import ContactForm from "@/app/_components/ContactForm";

export const dynamic = 'force-dynamic';

export default async function Home() {

    let museums, content, contentMuseums, filteredMuseums, bundle, contentEvents, events, contentNews;
    const pics = [];

    try {

        museums = await getExperiences('/');
        filteredMuseums = museums.filter(el => el.tagIds.includes(7));
        bundle = museums.filter(el => el.tagIds.includes(10) && el.slug.includes('cumulativo'))[0];
        events = museums.filter(el => el.tagIds.includes(11));

        const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/homepage?populate=*',
            {next: {revalidate: 1000}}
        );
        content = await data.json();

        const dataNews = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/news?populate=*',
            {next: {revalidate: 1000}}
        );
        contentNews = await dataNews.json();

        const dataMuseums = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/museums?populate=*',
            {next: {revalidate: 1000}})
        contentMuseums = await dataMuseums.json();

        for(const museum of filteredMuseums) {
            for(const contentMuseum of contentMuseums.data) {
                if(museum.slug === contentMuseum.slug) {
                    contentMuseum.immagine.titolo = contentMuseum.titolo;
                    contentMuseum.immagine.slug = contentMuseum.slug;
                    pics.push(contentMuseum.immagine);
                    museum.heroImage = contentMuseum.immagine;
                    museum.ticketImage = contentMuseum.immagine_biglietti_standard;
                    break;
                }
            }
        }

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
      {/*<Image*/}
      {/*    src={process.env.NEXT_PUBLIC_BASE_URL + homepage.immagine.url}*/}
      {/*    alt="Cremona vista dall'alto" width={500} height={500}*/}
      {/*    className="w-full h-[70dvh] object-cover object-top block md:hidden"*/}
      {/*/>*/}
        <div className="md:hidden block w-full pt-[80px]">
            <Image
                className="w-full h-full object-cover rounded-t-xl"
                src={process.env.NEXT_PUBLIC_BASE_URL + content.data.immagine.url}
                alt={content.data.immagine.alternativeText} width={300} height={200}/>
        </div>
        <Carousel pics={pics}/>
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

            <h2 className="sr-only">Musei</h2>
            <div className="flex flex-col md:flex-row gap-4">
                {filteredMuseums &&
                    filteredMuseums.map((el) => {
                        if (!el.heroImage || !el.ticketImage) {
                            return null;
                        }

                        return (
                            <div className="w-full md:w-1/4 text-white rounded-xl gradient"
                                 key={el.title}>
                                <div className="w-full h-[200px] block md:hidden">
                                    <Image
                                        className="w-full h-full object-cover rounded-t-xl"
                                        src={process.env.NEXT_PUBLIC_BASE_URL + el.heroImage.url}
                                        alt={el.heroImage.alternativeText} width={300} height={200}/>
                                </div>
                                <div className="p-4 mt-2">
                                    <div className="h-[80px]">
                                        <h3 className="text-2xl md:text-lg font-medium">{el.title}</h3>
                                        <p className="text-sm">{getAddress(el.locations[0]?.label)}</p>
                                    </div>

                                    <div className="flex flex-col gap-4 bg-white rounded-xl text-black p-4 mt-8 mb-4">
                                        <Image
                                            className="w-full h-[200px] object-cover rounded-xl"
                                            src={process.env.NEXT_PUBLIC_BASE_URL + el.ticketImage.url}
                                            alt={`Interno del ${el.title}`} width={300} height={200}/>
                                        <div className="flex flex-col gap-2">
                                            <h4 className="text-xl md:text-base font-medium md:line-clamp-2">Ticket {el.title}</h4>
                                            <p className="line-clamp-6 md:text-sm lato">
                                                {el.description?.replace(/<\/?[^>]+(>|$)/g, "")}
                                            </p>
                                            <div className="flex items-center justify-between mt-4 h-[64px]">
                                                {el.cheapest
                                                    ? <p className="text-sm">A partire da<br/><span
                                                        className="text-xl font-medium">{new Intl.NumberFormat("de-DE", {
                                                        style: "currency",
                                                        currency: "EUR"
                                                    }).format(el.cheapest)}</span></p>

                                                    : <p className="text-base font-medium">Gratuito</p>
                                                }
                                                {/*<p className="text-sm">A partire da: <br/><span className="text-xl font-medium">{el.cheapest}</span></p>*/}
                                                <a
                                                    aria-label={`Vai alla pagina dedicata all'acquisto del biglietto standard del ${el.title}`}
                                                    target="_blank" rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-lg md:text-sm font-medium prime-bg rounded-full md:px-3 px-4 py-2 md:py-1"
                                                    href={`https://multishop-cremona.collaudo.domniapass.com/it/products/${el.slug}`}>
                                                    Prenota
                                                    <CircledArrow width={28} height={28}/>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="w-full text-end font-medium prime-text underline text-xl md:text-base px-4 pb-8">
                                    <Link
                                        aria-label={`Vai alla pagina dedicata all'acquisto dei biglietti del ${el.title}`}
                                        href={`/${el.slug}`}>Scopri le altre esperienze</Link>
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
                        <h2 className="text-2xl font-semibold prime-text mt-4">Ticket Cumulativo</h2>
                        <p className="text-xl md:text-base font-medium mt-2">Scoprire un museo è bello, ma visitarne più di uno è meglio. Il ticket cumulativo ti consente l&apos;accesso a tutti i Musei del Polo Civico con tariffa agevolata.</p>
                    </div>
                    <div className="flex flex-col gap-4 bg-white rounded-xl text-black p-4 mt-8 mb-4">
                        <Image src={process.env.NEXT_PUBLIC_BASE_URL + content.data.immagine_biglietto_cumulativo.url}
                            className="w-full h-[200px] object-cover rounded-xl"
                             alt={content.data.immagine_biglietto_cumulativo.alternativeText} width={300} height={200}/>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl md:text-base font-medium">{bundle.title}</h3>
                            <div className="w-full flex items-center justify-end mt-4">
                                <a
                                    aria-label="Vai alla pagina dedicata all'acquisto del biglietto cumulativo"
                                    target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-lg md:text-base font-medium prime-bg rounded-full px-4 py-2"
                                    href={`https://multishop-cremona.collaudo.domniapass.com/it/products/${bundle.slug}`}>
                                    Prenota
                                    <CircledArrow width={28} height={28}/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        )}

        {/*Search bar*/}
        {/*<section className="w-[90%] mx-auto pt-8">*/}
        {/*        <div className="flex flex-col gap-8 p-4 mt-2 w-full text-white rounded-xl gradient">*/}
        {/*            <h3 className="text-2xl font-semibold mt-2">Cerchi qualcosa di specifico?</h3>*/}
        {/*            <input type="text" className="text-black rounded-full bg-white h-[48px] p-2"/>*/}
        {/*            <div className="mb-4 text-black w-full text-end font-medium text-lg">*/}
        {/*                <Link href="/" className="w-fit prime-bg rounded-full px-4 py-2">Cerca</Link>*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*</section>*/}

        {/*Biglietto gruppi*/}
        <section className="w-[90%] md:w-[85%] mx-auto flex flex-col md:flex-row md:gap-8">
            <div className="w-full md:w-1/2 pt-8">
                <div className="flex flex-col gap-8 p-4 mt-2 w-full text-white rounded-xl gradient">
                    <h2 className="text-2xl font-semibold mt-4 prime-text">Ticket per Gruppi</h2>
                    <Image
                        className="w-full h-[200px] object-cover rounded-xl"
                        src={process.env.NEXT_PUBLIC_BASE_URL + homepage.immagine_gruppi.url} alt={homepage.immagine_gruppi.alternativeText} width={300} height={200}/>

                    <p className="text-xl md:text-base md:h-[64px]">Prenota l&apos;accesso per il tuo gruppo.
                        Scopri i ticket ridotti per i gruppi di più di 15 persone.</p>
                    <div className="mb-4 text-black w-full font-medium text-lg md:flex md:justify-end">
                        <Link aria-label="Vai alla pagine con le informazioni sulle visite dei gruppi" href="/info-gruppi" className="md:text-base w-auto block text-center prime-bg rounded-full px-4 py-2 md:w-fit">Scopri di più</Link>
                    </div>
                </div>
            </div>

            {/*Servizi educativi*/}
            <div className="w-full md:w-1/2 pt-8">
                <div className="flex flex-col gap-8 p-4 mt-2 w-full text-white rounded-xl gradient">
                    <h2 className="text-2xl font-semibold mt-4 prime-text">Servizi educativi</h2>
                    <Image
                        className="w-full h-[200px] object-cover rounded-xl"
                        src={process.env.NEXT_PUBLIC_BASE_URL + homepage.immagine_scuole.url} alt={homepage.immagine_scuole.alternativeText} width={300} height={200}/>

                    <p className="text-xl md:text-base md:h-[64px]">Clicca qui se vuoi prenotare l&apos;accesso ai musei con il tuo gruppo scolastico.</p>
                    <div className="mb-4 text-black w-full font-medium text-lg md:flex md:justify-end">
                        <Link aria-label="Vai alla pagine con le informazioni sulle visite dei gruppi scolastici" href="/servizi-educativi" className="md:text-base w-auto block text-center prime-bg rounded-full px-4 py-2 md:w-fit">Scopri di più</Link>
                    </div>
                </div>
            </div>
        </section>

        {/*Eventi*/}
        <section className="w-[90%] md:w-[85%] mx-auto pt-8">
            <h2 className="text-3xl font-semibold my-8">Eventi</h2>
            <EventCard events={events} limit={3}/>
        </section>

        {/*News*/}
        <section className="w-[90%] md:w-[85%] mx-auto flex md:flex-row flex-col md:gap-8">
            <div className="w-full md:1/2 pt-8">
                <div className="flex flex-col gap-8 p-4 mt-2 w-full rounded-xl gradient">
                    <h2 className="md:hidden text-3xl text-white font-semibold mt-2">News</h2>
                    <h2 className="md:block hidden text-2xl font-semibold mt-2 prime-text">Leggi le ultime novità</h2>
                    <Image
                        className="w-full h-[300px] object-cover rounded-4xl p-4"
                        src={process.env.NEXT_PUBLIC_BASE_URL + contentNews.data.immagine.url} alt={contentNews.data.immagine.alternativeText} width={300} height={200}/>

                    <div className="text-black w-full md:flex md:justify-end font-medium text-sm">
                        <Link href="/news-eventi"
                              className="md:w-fit w-auto block text-center prime-bg rounded-full px-4 py-2">
                            Vedi tutte le news
                        </Link>
                    </div>
                </div>
            </div>

            {/*Musei Italiani*/}
            <div className="w-full md:1/2 pt-8 md:h-full">
                <div className="flex flex-col gap-8 p-4 mt-2 w-full rounded-xl gradient md:h-full">
                    <h3 className="text-2xl font-semibold mt-2 prime-text">Musei Italiani</h3>
                    <Image src='/placeholders/card_musei italiani.webp'
                           alt="Logo di Musei Italiani" width={200} height={300}
                           className="w-full h-[300px] object-cover rounded-4xl p-4 hidden md:block rounded"

                    />
                    <div className="text-black w-full md:flex md:justify-end font-medium text-sm">
                        <a aria-label="Vai alla sito di Musei Italiani" href="https://www.museiitaliani.it/" target="_blank" rel="noopener noreferrer" className="md:w-fit w-auto block text-center prime-bg rounded-full px-4 py-2">Vai al sito</a>
                    </div>
                </div>
            </div>
        </section>

        {/*Contact form*/}
        <ContactForm text="Scrivici una mail"/>

    </>
  );
}

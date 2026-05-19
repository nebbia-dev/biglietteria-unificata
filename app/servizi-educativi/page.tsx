import Image from "next/image";
import TicketCard from "@/app/_components/TicketCard";
import Link from "next/link";
import {getExperiences} from "@/app/lib/domnia-experiences";

export default async function ServiziEducativi() {

    let content, contentMuseums, museums, filteredMuseums;

    try {
        museums = await getExperiences('/');
        filteredMuseums = museums.filter(el => el.tagIds.includes(9));

        const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/servizi-educativi',
            {next: {revalidate: 1000}}
        );
        content = await data.json();

        const dataMuseums = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/museums?populate=*',
            {next: {revalidate: 1000}})
        contentMuseums = await dataMuseums.json();

        for(const museum of filteredMuseums) {
            for(const contentMuseum of contentMuseums.data) {

                if(museum.slug === contentMuseum.slug_scuole) {
                    museum.ticketImage = contentMuseum.immagine_biglietti_scuole;
                    break;
                }
            }
        }

    } catch(e) {
        console.log(e);
    }

    return(
        <>
            {/*Lista biglietti*/}
            <section className="w-[90%] md:w-[85%] mx-auto pt-8">
                <div className="mb-8">
                    <p className="text-sm mb-8 font-light">Home / {content.data.titolo}</p>
                    <h1 className="text-4xl mb-4 font-semibold">{content.data.titolo}</h1>
                    <p className="text-xl">{content.data.descrizione}</p>
                </div>

                <div className="flex flex-col md:flex-row w-full md:flex-wrap gap-4">
                    {
                        filteredMuseums &&
                        filteredMuseums.map(el => {
                            return (
                                <TicketCard key={el.documentId} layout="fourth" el={{
                                    titolo: "",
                                    nome: el.title,
                                    descrizione: el.description?.replace(/<\/?[^>]+(>|$)/g, ""),
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
                <h2 className="text-2xl font-semibold mt-4 mb-8">Proposte educative</h2>

                <div
                    className="flex flex-col md:flex-row md:items-center gap-8 p-4 md:p-8 mt-2 w-full text-white md:text-base rounded-xl gradient">
                    <Image
                        className="w-full h-[200px] md:h-[300px] object-cover rounded-xl"
                        src="/placeholders/proposte.jpg" alt="Gruppi turistici" width={300} height={200}/>
                    <div>
                        <div>
                            <p>Le nostre proposte educative permettono di arricchire la tua visita.
                                Scopri i nostri percorsi laboratoristi rivolte a scuole, giovani e adulti.
                            </p>
                            <h3 className="text-xl font-semibold mt-4 mb-2">Diritto di prenotazione</h3>
                            <p>
                                L'ingresso per gli studenti è gratuito, si applica la tariffa di 2€ a persona come diritto
                                di prenotazione.
                            </p>
                        </div>
                        <div className="md:mt-8 text-black w-full md:flex md:justify-end font-medium text-sm">
                            <Link href="/" className="w-auto block text-center prime-bg rounded-full px-4 py-2 md:text-base">Vai al
                                sito</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
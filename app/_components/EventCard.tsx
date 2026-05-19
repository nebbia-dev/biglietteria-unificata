import Image from "next/image";
import {Museum} from "@/app/_components/_icons/Museum";
import Link from "next/link";
import {CircledArrow} from "@/app/_components/_icons/CircledArrow";
import getAddress from "@/helpers/address/getAddress";

export default function EventCard({card, limit, events} : {card?: undefined|boolean, limit:number, events:any}) {
    console.log(events)
    return(
        <>
            <div className="w-full mx-auto flex flex-col md:flex-row gap-4">
                {events &&
                    events.map((el, i) => {
                        if(i > limit - 1) {
                            return;
                        } else {
                            return (
                                <div key={el.documentId} className="w-full md:w-1/3 flex flex-col gap-4 bg-white rounded-xl text-black p-4">
                                    <Image
                                        className="w-full h-[200px] object-cover rounded-xl"
                                        src={process.env.NEXT_PUBLIC_BASE_URL + el.immagine.url} alt={el.immagine.alternativeText} width={300} height={200}/>
                                    <div className="flex flex-col gap-2 pl-1">
                                        <h4 className="text-xl font-medium">{el.title}</h4>
                                        <div className="flex gap-2 items-center">
                                            <Museum width={24} height={24}/> <p className="line-clamp-1">{getAddress(el.locations[0]?.label)}</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-4">
                                            <p className="md:text-base text-xl font-medium">Gratuito</p>
                                            <a target="_blank" rel="noopener noreferrer"
                                               className="flex items-center gap-2 text-lg font-medium prime-bg rounded-full px-4 py-2"
                                               href={`https://multishop-cremona.collaudo.domniapass.com/it/products/${el.slug}`}>
                                                Prenota
                                                <CircledArrow width={28} height={28}/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })}

            </div>
            {!card &&
                <div className="text-black w-full md:flex md:justify-end font-medium text-sm pt-4">
                    <Link href="/news-eventi"
                          className="md:w-fit w-auto block text-center prime-bg rounded-full px-4 py-2">
                        Vedi tutti gli eventi
                    </Link>
                </div>
            }
        </>
    )
}

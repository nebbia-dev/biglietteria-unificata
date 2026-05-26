import Image from "next/image";
import {CircledArrow} from "@/app/_components/_icons/CircledArrow";
import type { TicketCardData } from "@/app/lib/strapi-types";

type TicketCardLayout = 'fourth' | 'half' | 'third';

export default function TicketCard({el, layout}: {el: TicketCardData, layout: TicketCardLayout}) {
    if (!el.immagine) {
        return null;
    }

    return (
            <div className={`w-full ${layout === 'half' ? 'md:w-[calc(50%-0.5rem)]' : layout === 'third' ? 'md:w-[calc(33%-0.5rem)]' : 'md:w-[calc(25%-0.75rem)]'} text-white rounded-xl gradient`}>
                <div className="p-4 mt-2">
                    <h3 className="text-2xl font-semibold prime-text">{el.titolo}</h3>

                    <div className="flex flex-col gap-4 bg-white rounded-xl text-black p-4 my-4">
                        <Image
                            className="w-full h-[200px] object-cover rounded-xl"
                            src={process.env.NEXT_PUBLIC_BASE_URL + el.immagine.url} alt={el.immagine.alternativeText} width={300} height={200}/>
                        <div className="flex flex-col gap-2">
                            <h4 className="text-xl font-medium md:line-clamp-1">{el.nome}</h4>
                            <p className="line-clamp-4">{el.descrizione}</p>
                            <div className="flex items-center justify-between mt-4">
                                {el.prezzo
                                    ? <div>
                                        {el.infoPrezzo !== ""
                                            ? <p className="text-sm">{el.infoPrezzo}<br/><span
                                                className="text-xl font-medium">{new Intl.NumberFormat("de-DE", {
                                                style: "currency",
                                                currency: "EUR"
                                            }).format(el.prezzo)}</span></p>
                                            : <p className="text-xl font-medium">{new Intl.NumberFormat("de-DE", {
                                                style: "currency",
                                                currency: "EUR"
                                            }).format(el.prezzo)}</p>
                                        }
                                    </div>
                                    : <p className="text-xl font-medium">Gratuito</p>
                                }
                                <a target="_blank" rel="noopener noreferrer"
                                   className="flex items-center gap-2 text-lg font-medium prime-bg rounded-full px-4 py-2"
                                   href={`https://multishop-cremona.collaudo.domniapass.com/it/products/${el.slug ?? ''}`}>
                                    Prenota
                                    <CircledArrow width={28} height={28}/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

import {CircledArrow} from "@/app/_components/_icons/CircledArrow";
import type { TicketCardData } from "@/app/lib/strapi-types";

type TicketCardLayout = 'fourth' | 'half' | 'third';
type TicketCardLang = 'it' | 'en';

export default function TicketCard({el, layout, lang, disabled}: {el: TicketCardData, layout: TicketCardLayout, lang: TicketCardLang, disabled: boolean}) {
    if (!el.immagine) {
        return null;
    }

    const purchaseAriaLabel = lang === 'it'
        ? `Vai alla pagina di acquisto del ${el.titolo}`
        : `Go to the purchase page for ${el.titolo}`;


    return (
        <>
            {disabled
                ? <div aria-hidden
                       className={`w-full ${layout === 'half' ? 'md:w-[calc(50%-0.5rem)]' : layout === 'third' ? 'md:w-[calc(33%-0.5rem)]' : 'md:w-[calc(25%-0.75rem)]'}`}>
                </div>
                : <div
                    className={`w-full ${layout === 'half' ? 'md:w-[calc(50%-0.5rem)]' : layout === 'third' ? 'md:w-[calc(33%-0.5rem)]' : 'md:w-[calc(25%-0.75rem)]'} text-white rounded-xl gradient`}>
                    <div className="p-4 mt-2">
                        {el.titolo && <h2 className="text-2xl font-semibold prime-text">{el.titolo}</h2>}

                        <div className="flex flex-col gap-4 bg-white rounded-xl text-black p-4 my-4">
                            <img
                                className="w-full h-[200px] object-cover rounded-xl"
                                src={process.env.NEXT_PUBLIC_BASE_URL + el.immagine.url}
                                alt={el.immagine.alternativeText} width={300} height={200}/>
                            <div className="flex flex-col gap-2">
                                {el.titolo
                                    ? <h3 className="text-xl font-medium md:line-clamp-1">{el.nome}</h3>
                                    : <h2 className="text-xl font-medium md:line-clamp-1">{el.nome}</h2>
                                }
                                <p className={`${layout === 'fourth' ? 'text-sm' : ''} line-clamp-4 lato h-[96px]`}>{el.descrizione}</p>
                                <div className="flex items-center justify-between mt-4">
                                    {el.prezzo
                                        ? <div>
                                            {el.infoPrezzo !== ""
                                                ? <p className="text-sm">{el.infoPrezzo}<br/><span
                                                    className={`${layout === 'fourth' ? 'text-base' : 'text-xl'} font-medium`}>{new Intl.NumberFormat("de-DE", {
                                                    style: "currency",
                                                    currency: "EUR"
                                                }).format(el.prezzo)}</span></p>
                                                :
                                                <p className={`${layout === 'fourth' ? 'text-base' : 'text-xl'} font-medium`}>{new Intl.NumberFormat("de-DE", {
                                                    style: "currency",
                                                    currency: "EUR"
                                                }).format(el.prezzo)}</p>
                                            }
                                        </div>
                                        :
                                        <p className={`${layout === 'fourth' ? 'text-base' : 'text-xl'} font-medium`}>Gratuito</p>
                                    }
                                    <a aria-label={purchaseAriaLabel} target="_blank" rel="noopener noreferrer"
                                       className={`${layout === 'fourth' ? 'text-sm px-3 py-1' : 'px-4 py-2'} flex items-center gap-2 text-lg font-medium prime-bg rounded-full`}
                                       href={`https://shopbiglietteriamusei.comune.cremona.it/${lang}/products/${el.slug ?? ''}`}>
                                        {lang === 'it'
                                            ? 'Prenota'
                                            : 'Book'
                                        }
                                        <CircledArrow width={28} height={28}/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

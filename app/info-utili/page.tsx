import Image from "next/image";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import {Plus} from "@/app/_components/_icons/Plus";
import Link from "next/link";
import {unstable_rethrow} from "next/navigation";
import Markdown from "react-markdown";
import ContactForm from "@/app/_components/ContactForm";
import type { StrapiCollectionResponse, StrapiMuseum } from "@/app/lib/strapi-types";

export const dynamic = 'force-dynamic';

export default async function InfoUtili() {

    let content: StrapiCollectionResponse<StrapiMuseum> = { data: [] };

    try {

        const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/museums' +
            '?populate=*'
            ,
            {next: {revalidate: 1000}}
        );
        content = await data.json() as StrapiCollectionResponse<StrapiMuseum>;
        console.log(content)

    } catch(e) {
        unstable_rethrow(e);
        console.log(e)
    }

    return(
        <>
            <section className="w-[90%] md:w-[85%] mx-auto pt-[128px] md:pt-[148px]">
                <p className="text-sm mb-8 font-light">Home / Info utili</p>
                <h1 className="text-4xl mb-8 font-semibold">Info utili</h1>
            </section>

            {content.data &&
                content.data.map((el) => {
                    return (
                        <section className="w-full md:w-[85%] md:mx-auto md:mt-8" key={el.documentId}>
                            <Image
                                className="w-full h-[200px] object-cover md:rounded-t-xl"
                                src={process.env.NEXT_PUBLIC_BASE_URL + el.immagine.url} alt={el.immagine.alternativeText} width={300} height={200}/>
                            <div className="w-[90%] md:w-full mx-auto pt-8 md:px-12 md:pb-4 md:bg-white md:rounded-b-xl">
                                <h2 className="text-2xl mb-4 font-semibold">{el.titolo}</h2>

                                    {el.intero === 0 && el.ridotto === 0
                                        ? <p>Ingresso gratuito</p>
                                        : <ul>
                                            <li>Intero {
                                                new Intl.NumberFormat("de-DE", {
                                                    style: "currency",
                                                    currency: "EUR"
                                                }).format(el.intero ?? 0)
                                            }</li>
                                            <li>Ridotto {
                                                new Intl.NumberFormat("de-DE", {
                                                style: "currency",
                                                currency: "EUR"
                                            }).format(el.ridotto ?? 0)
                                            }</li></ul>
                                }

                                    {el.note && <p className="text-sm mt-2">{el.note}</p>}

                                <h3 className="text-xl mt-4 mb-2 font-semibold">Contatti</h3>
                                <p>{el.titolo}<br/>{el.indirizzo}</p>
                                <h4 className="font-medium mt-2 mb-1">Biglietteria:</h4>
                                <ul className="mb-4">
                                    <li>{el.biglietteria_telefono}</li>
                                    <li className="break-all underline"><a href={`mailto:${el.biglietteria_email}`}>{el.biglietteria_email}</a></li>
                                </ul>

                                <Accordion sx={{
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                }}>
                                    <AccordionSummary expandIcon={<Plus width={24} height={24}/>}
                                                      aria-controls={`${el.documentId}-hours-content`}
                                                      id={`${el.documentId}-hours-header`}
                                                      sx={{
                                                          fontWeight: 600,
                                                          fontSize: "1.25rem",
                                                          color: '#904E14',
                                                          gap: "32px",
                                                          padding: "0 24px",
                                                          '& .MuiAccordionSummary-content': {
                                                              margin: "16px 0"
                                                          }
                                                      }}
                                    >
                                        Orari
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="markdown">
                                            <Markdown>
                                                {el.orari}
                                            </Markdown>
                                        </div>
                                    </AccordionDetails>
                                </Accordion>

                                <div className="w-full h-[1px] bg-black"></div>

                                <Accordion sx={{
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                }}>
                                    <AccordionSummary expandIcon={<Plus width={24} height={24}/>}
                                                      aria-controls={`${el.documentId}-accessibility-content`}
                                                      id={`${el.documentId}-accessibility-header`}
                                                      sx={{
                                                          fontWeight: 600,
                                                          fontSize: "1.25rem",
                                                          color: '#904E14',
                                                          gap: "32px",
                                                          padding: "0 24px",
                                                          '& .MuiAccordionSummary-content': {
                                                              margin: "16px 0"
                                                          }
                                                      }}
                                    >
                                        Accessibilità
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="markdown">
                                            <Markdown>
                                                {el.accessibilita}
                                            </Markdown>
                                        </div>
                                    </AccordionDetails>
                                </Accordion>

                                <div className="w-full h-[1px] bg-black"></div>

                                {el.riduzioni &&
                                    <>
                                    <Accordion sx={{
                                        backgroundColor: "transparent",
                                        boxShadow: "none",
                                    }}>
                                        <AccordionSummary expandIcon={<Plus width={24} height={24}/>}
                                                          aria-controls={`${el.documentId}-reductions-content`}
                                                          id={`${el.documentId}-reductions-header`}
                                                          sx={{
                                                              fontWeight: 500,
                                                              fontSize: "1.25rem",
                                                              gap: "32px",
                                                              padding: "0 24px",
                                                              '& .MuiAccordionSummary-content': {
                                                                  margin: "16px 0"
                                                              }
                                                          }}
                                        >
                                            <p className="flex flex-col gap-1">
                                                Riduzioni<br/>
                                                <span
                                                    className="block text-sm font-regular">(con esibizione di documentazione idonea)</span>
                                            </p>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div className="markdown">
                                                <Markdown>
                                                    {el.riduzioni}
                                                </Markdown>
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                    <div className="w-full h-[1px] bg-black"></div>
                                    </>
                                }


                                {el.gratuita &&
                                    <>
                                        <Accordion sx={{
                                            backgroundColor: "transparent",
                                            boxShadow: "none",
                                        }}>
                                            <AccordionSummary expandIcon={<Plus width={24} height={24}/>}
                                                              aria-controls={`${el.documentId}-free-content`}
                                                              id={`${el.documentId}-free-header`}
                                                              sx={{
                                                                  fontWeight: 500,
                                                                  fontSize: "1.25rem",
                                                                  gap: "32px",
                                                                  padding: "0 24px",
                                                                  '& .MuiAccordionSummary-content': {
                                                                      margin: "16px 0"
                                                                  }
                                                              }}
                                            >
                                                <p className="flex flex-col gap-1">
                                                    Gratuità<br/>
                                                    <span
                                                        className="block text-sm font-regular">(con esibizione di documentazione idonea)</span>
                                                </p>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="markdown">
                                                    <Markdown>
                                                        {el.gratuita}
                                                    </Markdown>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                        <div className="w-full h-[1px] bg-black"></div>
                                    </>
                                }

                                <div className="my-8 text-black w-full md:flex md:justify-end font-medium md:text-base text-lg">
                                    <Link href="/" className="w-auto md:w-fit block text-center prime-bg rounded-full px-4 py-2">Acquista il biglietto</Link>
                                </div>
                            </div>
                        </section>
                    )
                })
            }

            {/*Contact form*/}
            <ContactForm text="Hai bisogno di info specifiche? Scrivici!"/>
        </>
    )
}

import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import {CircledArrow} from "@/app/_components/_icons/CircledArrow";
import Link from "next/link";
import {unstable_rethrow} from "next/navigation";
import Markdown from "react-markdown";
import {AccordionArrow} from "@/app/_components/_icons/AccordionArrow";
import ContactForm from "@/app/_components/ContactForm";

export default async function Faq(){

    let content;

    try {

        const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/faqs',
            {next: {revalidate: 1000}}
        );
        content = await data.json();
        console.log(content.data)

    } catch(e) {
        unstable_rethrow(e);
        console.log(e)
    }

    return(
        <>
            {/*FAQs*/}
            <section className="w-[90%] md:w-[85%] mx-auto pt-8">
                <p className="text-sm mb-8 font-light">Home / FAQ</p>
                <h1 className="text-4xl mb-8 font-semibold">FAQ</h1>

                {content.data &&
                    content.data.map(el => {
                        return(
                            <Accordion key={el.documentId}>
                                <AccordionSummary expandIcon={<AccordionArrow />}
                                                  aria-controls={`${el.documentId}-content`}
                                                  id={`${el.documentId}-header`}
                                                  sx={{
                                                      fontWeight: 500,
                                                      fontSize: "1rem",
                                                      gap: "32px",
                                                      padding: "0 24px",
                                                      '& .MuiAccordionSummary-content': {
                                                          margin: "16px 0",
                                                      }
                                                  }}
                                >
                                    {el.domanda}
                                </AccordionSummary>
                                <AccordionDetails
                                    id={`${el.documentId}-content`}
                                    sx={{
                                        padding: "4px 24px 24px 24px",
                                    }}
                                >
                                    <div className="markdown whitespace-pre-line">
                                        <Markdown>
                                            {el.risposta}
                                        </Markdown>
                                    </div>
                                    <div className="w-full flex justify-end mt-8">
                                        {el.link && <Link
                                            className="w-fit flex items-center gap-2 font-medium prime-bg rounded-full px-4 py-2"
                                            href={el.link}>
                                            Vai alla sezione
                                            <CircledArrow width={28} height={28}/>
                                        </Link>}
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })
                }
            </section>
            {/*Contact form*/}
            <ContactForm text="Hai bisogno di info specifiche? Scrivici!"/>
        </>
    )
}
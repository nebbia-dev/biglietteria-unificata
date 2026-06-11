import Image from "next/image";

export default function PropEdu({image, alt} : {image:string, alt:string}) {
    return (
        <section className="w-[90%] md:w-[85%] mx-auto pt-8">
            <div
                className="flex flex-col md:flex-row md:items-center md:h-[300px] gap-8 p-4 mt-2 w-full text-white rounded-xl gradient">
                <Image src={process.env.NEXT_PUBLIC_BASE_URL + image}
                       alt={alt}
                       width={200} height={100}
                       className="w-full object-cover md:w-2/4 md:h-full rounded-xl"
                />
                <div className="md:pr-8">
                    <h3 className="text-2xl font-semibold mt-2 prime-text">Proposte educative</h3>
                    <p>Dalle scuole dell&apos;infanzia, fino agli adulti lavoriamo per aprire le porte dei musei e
                        renderli
                        accessibili al più ampio numero possibile di persone.</p>
                    <div className="mb-4 mt-8 text-black w-full text-end font-medium text-lg md:text-base">
                        <a
                            aria-label="Vai alla pagina dedicata alle nostre proposte educative"
                            target="_blank" rel="noopener noreferrer"
                            href="https://musei.comune.cremona.it/it/servizi-educativi/informazioni-didattica"
                            className="w-fit prime-bg rounded-full px-4 py-2 md:text-sm">Scopri di più</a>
                    </div>
                </div>
            </div>
        </section>
    )
}
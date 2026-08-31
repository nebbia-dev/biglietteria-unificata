import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Biglietteria unificata",
    description: "Acquista biglietti e prenota visite per i Musei Civici di Cremona.",
};

export default async function Home() {

  return (
    <div className="bg-black h-screen w-screen">
        <div className="w-[60%] mx-auto h-full flex items-center gap-12">
            <img className="w-[180px] h-[180px]" alt="Lodo Cremona musei" src="/icons/logo.png"/>
            <div className="text-white">
                <h2 className="text-xl font-bold mb-4">Sito in manutenzione</h2>
                <p>Ci scusiamo per il disagio. Nel frattempo, puoi visitare il <a className="underline"
                                                                                  href="https://musei.comune.cremona.it/it"
                                                                                  target="_blank"
                                                                                  rel="noopener noreferrer">sito di
                    Cremona Musei</a> o seguire i nostri canali social per aggiornamenti in tempo reale.
                </p>
                <div className="w-full h-[2px] bg-white my-8"></div>
                <h2 className="text-xl font-bold mb-4">Site under maintenance</h2>
                <p>We apologize for the inconvenience. In the meantime, you can visit the <a className="underline"
                                                                                  href="https://musei.comune.cremona.it/en"
                                                                                  target="_blank"
                                                                                  rel="noopener noreferrer">Cremona Museums website</a> or follow us on social media for real-time updates.
                </p>
            </div>
        </div>
    </div>
  );
}

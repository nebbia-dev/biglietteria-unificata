import type {Metadata} from "next";

import TermsContent from "@/app/_components/TermsContent";

export const metadata: Metadata = {
    title: "Condizioni di vendita",
    description: "Termini e condizioni di vendita dei titoli di accesso ai Musei Civici di Cremona.",
};

export default function TermsPage() {
    return <TermsContent/>;
}

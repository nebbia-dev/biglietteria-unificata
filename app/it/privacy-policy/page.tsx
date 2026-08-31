import type {Metadata} from "next";
import PrivacyPolicyContent from "@/app/_components/PrivacyPolicyContent";

export const metadata: Metadata = {
    title: "Informativa sul trattamento dei dati personali",
    description: "Informativa sul trattamento dei dati personali della Biglietteria Integrata Musei Civici.",
};

export default function PrivacyPolicyPage() {
    return <PrivacyPolicyContent/>;
}

import type {Metadata} from "next";
import PrivacyPolicyContentEn from "@/app/_components/PrivacyPolicyContentEn";

export const metadata: Metadata = {
    title: "Personal Data Processing Notice",
    description: "Personal data processing notice for the integrated ticketing system of the Cremona Civic Museums.",
};

export default function PrivacyPolicyPage() {
    return <PrivacyPolicyContentEn/>;
}

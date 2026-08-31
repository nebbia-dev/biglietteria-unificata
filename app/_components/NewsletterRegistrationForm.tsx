'use client'

import Link from "next/link";
import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";

import {
    isValidNewsletterEmail,
    isValidNewsletterPhone,
    normalizeBirthDate,
    type NewsletterFieldErrors,
    type NewsletterFormPayload,
} from "@/app/lib/newsletter-validation";

type NewsletterRegistrationFormLang = "it" | "en";

type NewsletterApiResponse = {
    ok: boolean;
    message?: string;
    errors?: NewsletterFieldErrors;
};

const initialValues: NewsletterFormPayload = {
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    city: "",
    phone: "",
    privacy: false,
};

const copy = {
    it: {
        labels: {
            firstName: "Nome",
            lastName: "Cognome",
            email: "Email",
            birthDate: "Data di nascita",
            city: "Città",
            phone: "Telefono",
            privacy: "Presa visione dell'informativa privacy, autorizzo l'invio del materiale marketing promozionale e offerte speciali tramite newsletter e/o a ricevere la newsletter periodica dei Musei Civici di Cremona.",
        },
        placeholders: {
            firstName: "Nome / Name",
            lastName: "Cognome / Surname",
            email: "Mail / E-Mail",
            birthDate: "Data di nascita / Date of birth",
            city: "Città / City",
            phone: "Telefono / Phone Number",
        },
        errors: {
            firstName: "Inserisci il nome.",
            lastName: "Inserisci il cognome.",
            email: "Inserisci un indirizzo email valido.",
            birthDate: "Inserisci la data di nascita in formato GG/MM/AAAA.",
            city: "Inserisci la città.",
            phone: "Inserisci un numero di telefono valido.",
            privacy: "Devi accettare l'informativa privacy per continuare.",
            general: "Non è stato possibile completare l'iscrizione. Riprova piu tardi.",
        },
        submit: "Iscriviti",
        submitting: "Invio...",
        successEyebrow: "Iscrizione completata!",
        successTitle: "Benvenuto nel mondo dei musei cremonesi!",
        successText: "News, eventi e tanto ancora!",
        backHome: "Torna alla pagina principale",
        homeHref: "/it",
    },
    en: {
        labels: {
            firstName: "Name",
            lastName: "Surname",
            email: "Email",
            birthDate: "Date of birth",
            city: "City",
            phone: "Phone",
            privacy: "I have read the privacy notice and authorize promotional marketing material, special offers and/or the periodic Cremona Civic Museums newsletter.",
        },
        placeholders: {
            firstName: "Name",
            lastName: "Surname",
            email: "E-mail",
            birthDate: "Date of birth",
            city: "City",
            phone: "Phone number",
        },
        errors: {
            firstName: "Enter your name.",
            lastName: "Enter your surname.",
            email: "Enter a valid email address.",
            birthDate: "Enter your date of birth as DD/MM/YYYY.",
            city: "Enter your city.",
            phone: "Enter a valid phone number.",
            privacy: "Accept the privacy notice to continue.",
            general: "We could not complete your subscription. Please try again later.",
        },
        submit: "Subscribe",
        submitting: "Sending...",
        successEyebrow: "Subscription completed!",
        successTitle: "Welcome to the world of Cremona museums!",
        successText: "News, events and lots more!",
        backHome: "Back to the main page",
        homeHref: "/en",
    },
};

function formatBirthDateInput(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    const parts = [];

    if (digits.length > 0) {
        parts.push(digits.slice(0, 2));
    }

    if (digits.length > 2) {
        parts.push(digits.slice(2, 4));
    }

    if (digits.length > 4) {
        parts.push(digits.slice(4, 8));
    }

    return parts.join("/");
}

function getClientErrors(
    values: NewsletterFormPayload,
    lang: NewsletterRegistrationFormLang,
) {
    const localizedCopy = copy[lang];
    const errors: NewsletterFieldErrors = {};

    if (values.firstName.trim() === "") {
        errors.firstName = localizedCopy.errors.firstName;
    }

    if (values.lastName.trim() === "") {
        errors.lastName = localizedCopy.errors.lastName;
    }

    if (!isValidNewsletterEmail(values.email.trim())) {
        errors.email = localizedCopy.errors.email;
    }

    if (normalizeBirthDate(values.birthDate) === null) {
        errors.birthDate = localizedCopy.errors.birthDate;
    }

    if (values.city.trim() === "") {
        errors.city = localizedCopy.errors.city;
    }

    if (!isValidNewsletterPhone(values.phone.trim())) {
        errors.phone = localizedCopy.errors.phone;
    }

    if (!values.privacy) {
        errors.privacy = localizedCopy.errors.privacy;
    }

    return errors;
}

function getFieldClassName(hasError: boolean) {
    return `rounded-xl mt-1 h-14 w-full border-2 bg-white px-4 text-base outline-none transition focus:border-[#D80900] focus:ring-4 focus:ring-[#D80900]/10 ${hasError ? "border-[#D80900]" : "border-[#a7a7a8]"}`;
}

export default function NewsletterRegistrationForm({ lang }: { lang: NewsletterRegistrationFormLang }) {
    const localizedCopy = copy[lang];
    const [values, setValues] = useState<NewsletterFormPayload>(initialValues);
    const [errors, setErrors] = useState<NewsletterFieldErrors>({});
    const [generalError, setGeneralError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { checked, name, type, value } = event.currentTarget;

        setValues((currentValues) => ({
            ...currentValues,
            [name]: type === "checkbox"
                ? checked
                : name === "birthDate"
                    ? formatBirthDateInput(value)
                    : value,
        }));
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const nextErrors = getClientErrors(values, lang);
        setErrors(nextErrors);
        setGeneralError("");

        if (Object.keys(nextErrors).length > 0) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            const data = await response.json().catch(() => null) as NewsletterApiResponse | null;

            if (!response.ok || data?.ok !== true) {
                setErrors(data?.errors ?? {});
                setGeneralError(data?.message ?? localizedCopy.errors.general);
                return;
            }

            setValues(initialValues);
            setIsComplete(true);
        } catch {
            setGeneralError(localizedCopy.errors.general);
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isComplete) {
        return (
            <section className="bg-white p-6 text-center shadow-sm md:p-10">
                <p className="text-lg font-medium text-[#98989A]">{localizedCopy.successEyebrow}</p>
                <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-semibold md:text-5xl">{localizedCopy.successTitle}</h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg">{localizedCopy.successText}</p>
                <Link
                    href={localizedCopy.homeHref}
                    className="mt-8 inline-flex w-full items-center justify-center bg-[#D80900] px-6 py-4 text-center font-semibold uppercase text-white md:w-fit"
                >
                    {localizedCopy.backHome}
                </Link>
            </section>
        );
    }

    return (
        <form className="bg-white p-4 shadow-sm md:p-8 rounded-xl" onSubmit={handleSubmit} noValidate>
            {generalError !== "" && (
                <p className="mb-5 border border-[#D80900]/40 bg-[#D80900]/10 p-4 text-sm text-[#8e120d]" role="alert">
                    {generalError}
                </p>
            )}

            <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm font-medium" htmlFor="newsletter-first-name">
                    {localizedCopy.labels.firstName}
                    <input
                        autoComplete="given-name"
                        className={getFieldClassName(Boolean(errors.firstName))}
                        id="newsletter-first-name"
                        name="firstName"
                        onChange={handleChange}
                        placeholder={localizedCopy.placeholders.firstName}
                        type="text"
                        value={values.firstName}
                    />
                    {errors.firstName && <span className="mt-1 block text-sm text-[#D80900]">{errors.firstName}</span>}
                </label>

                <label className="text-sm font-medium" htmlFor="newsletter-last-name">
                    {localizedCopy.labels.lastName}
                    <input
                        autoComplete="family-name"
                        className={getFieldClassName(Boolean(errors.lastName))}
                        id="newsletter-last-name"
                        name="lastName"
                        onChange={handleChange}
                        placeholder={localizedCopy.placeholders.lastName}
                        type="text"
                        value={values.lastName}
                    />
                    {errors.lastName && <span className="mt-1 block text-sm text-[#D80900]">{errors.lastName}</span>}
                </label>

                <label className="text-sm font-medium" htmlFor="newsletter-email">
                    {localizedCopy.labels.email}
                    <input
                        autoComplete="email"
                        className={getFieldClassName(Boolean(errors.email))}
                        id="newsletter-email"
                        name="email"
                        onChange={handleChange}
                        placeholder={localizedCopy.placeholders.email}
                        type="email"
                        value={values.email}
                    />
                    {errors.email && <span className="mt-1 block text-sm text-[#D80900]">{errors.email}</span>}
                </label>

                <label className="text-sm font-medium" htmlFor="newsletter-birth-date">
                    {localizedCopy.labels.birthDate}
                    <input
                        autoComplete="bday"
                        className={getFieldClassName(Boolean(errors.birthDate))}
                        id="newsletter-birth-date"
                        inputMode="numeric"
                        name="birthDate"
                        onChange={handleChange}
                        placeholder={localizedCopy.placeholders.birthDate}
                        type="text"
                        value={values.birthDate}
                    />
                    {errors.birthDate && <span className="mt-1 block text-sm text-[#D80900]">{errors.birthDate}</span>}
                </label>

                <label className="text-sm font-medium" htmlFor="newsletter-city">
                    {localizedCopy.labels.city}
                    <input
                        autoComplete="address-level2"
                        className={getFieldClassName(Boolean(errors.city))}
                        id="newsletter-city"
                        name="city"
                        onChange={handleChange}
                        placeholder={localizedCopy.placeholders.city}
                        type="text"
                        value={values.city}
                    />
                    {errors.city && <span className="mt-1 block text-sm text-[#D80900]">{errors.city}</span>}
                </label>

                <label className="text-sm font-medium" htmlFor="newsletter-phone">
                    {localizedCopy.labels.phone}
                    <input
                        autoComplete="tel"
                        className={getFieldClassName(Boolean(errors.phone))}
                        id="newsletter-phone"
                        name="phone"
                        onChange={handleChange}
                        placeholder={localizedCopy.placeholders.phone}
                        type="tel"
                        value={values.phone}
                    />
                    {errors.phone && <span className="mt-1 block text-sm text-[#D80900]">{errors.phone}</span>}
                </label>
            </div>

            <div className="mt-6">
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed" htmlFor="newsletter-privacy">
                    <input
                        checked={values.privacy}
                        className="mt-1 h-5 w-5 accent-[#D80900]"
                        id="newsletter-privacy"
                        name="privacy"
                        onChange={handleChange}
                        type="checkbox"
                    />
                    <span>{localizedCopy.labels.privacy} <a target="_blank" rel="noopener noreferrer" className="underline" href="https://www.comune.cremona.it/informative-privacy">{lang === 'it' ? "Clicca qui per leggere l'informativa sulla privacy" : "Click here to read the privacy policy"}</a></span>
                </label>
                {errors.privacy && <span className="mt-2 block text-sm text-[#D80900]">{errors.privacy}</span>}
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    className="flex items-center gap-2 text-lg md:text-sm font-medium prime-bg rounded-full px-4 py-2 disabled:cursor-wait disabled:opacity-70"
                    disabled={!isHydrated || isSubmitting}
                    type="submit"
                >
                    {isSubmitting ? localizedCopy.submitting : localizedCopy.submit}
                </button>
            </div>
        </form>
    );
}

'use client'
import Image from "next/image";
import {Hamburger} from "@/app/_components/_icons/Hamburger";
import Link from "next/link";
import {Close} from "@/app/_components/_icons/Close";
import {useEffect, useRef, useState} from "react";

export default function Menu() {

    const [showMenu, setShowMenu] = useState<string>('initial');
    const [showMuseumsMenu, setShowMuseumsMenu] = useState<string>('close');
    const [showVisitMenu, setShowVisitMenu] = useState<string>('close');
    const pointerFocusRef = useRef(false);

    function toggleMenu(action:'open'|'close') {
        if(action === 'open' && (showMenu === 'close' || showMenu === 'initial')) {
            setShowMenu('open');
        } else if(action === 'close' && showMenu === 'open') {
            setShowMenu('close');
            setShowMuseumsMenu('close');
            setShowVisitMenu('close');
        }
    }

    function toggleMuseumsMenu() {
        if(showMuseumsMenu === 'close') {
            setShowMuseumsMenu('open');
        } else {
            setShowMuseumsMenu('close');
        }
    }

    function openMuseumsMenuOnFocus() {
        if (pointerFocusRef.current) {
            pointerFocusRef.current = false;
            return;
        }

        setShowMuseumsMenu('open');
        setShowVisitMenu('close');
    }

    function toggleVisitMenu() {
        if(showVisitMenu === 'close') {
            setShowVisitMenu('open');
        } else {
            setShowVisitMenu('close');
        }
    }

    function openVisitMenuOnFocus() {
        if (pointerFocusRef.current) {
            pointerFocusRef.current = false;
            return;
        }

        setShowVisitMenu('open');
        setShowMuseumsMenu('close');
    }

    useEffect(() => {
        const main = document.getElementById('main');
        const header = document.getElementById('header');
        const footer = document.getElementById('footer');
        // const iubenda = document.getElementById('iubenda');
        if(main && header && footer) {
            if(showMenu === 'open') {
                main.setAttribute('inert', 'inert');
                header.setAttribute('inert', 'inert');
                footer.setAttribute('inert', 'inert');
                // iubenda.setAttribute('inert', 'inert');
                document.getElementById('museumsButton')!.focus();
            } else if(showMenu === 'close') {
                main.removeAttribute('inert');
                header.removeAttribute('inert');
                footer.removeAttribute('inert');
                // iubenda.removeAttribute('inert');
                document.getElementById('hamburgerButton')!.focus();
            }
        }
    }, [showMenu])

    useEffect(() => {
        function handleEscapeKeyDown(e: KeyboardEvent) {
           if (e.key === 'Escape' && (showMenu === 'open' || showMenu === 'initial')) {
                setShowMenu('close');
            }
        }

        window.addEventListener('keydown', handleEscapeKeyDown);

        return () => {
            window.removeEventListener('keydown', handleEscapeKeyDown);
        };
    }, [showMenu]);

    return (
        <>
            <header id="header" className="bg-black flex justify-between items-center w-full px-4 md:px-12 py-4">
                <Link href="/">
                    <Image src='/icons/logo.png'
                           alt="museo civici cremona logo" width={48} height={48}
                           className="w-12"

                    />
                </Link>
                <div className="flex gap-4">
                    <button type="button"
                            aria-controls="mainMenu" aria-expanded={showMenu === 'open'}
                            aria-label="Apri il menu"
                            id="hamburgerButton"
                            onClick={() => toggleMenu('open')}
                            className="md:hidden block rounded-full p-3 bg-white text-black w-fit cursor-pointer">
                        <Hamburger aria-hidden={true} width="2em" height="2em"/>
                    </button>
                </div>

                <nav
                    id="mainMenu"
                    className="hidden md:block text-white">
                    <ul className="flex items-center gap-8">
                        <li className="flex flex-col relative">
                            <button type="button"
                                    onPointerDown={() => {
                                        pointerFocusRef.current = true;
                                    }}
                                    onFocus={openMuseumsMenuOnFocus}
                                    aria-expanded={showMuseumsMenu === 'open'}
                                    aria-controls="museumsSubmenu"
                                    onClick={() => {
                                        pointerFocusRef.current = false;
                                        toggleMuseumsMenu();
                                    }}
                                    id="museumsButton"
                                    className="min-w-[64px] border-b border-black/50 cursor-pointer flex justify-between items-center">
                                <span className="font-semibold">Musei</span>
                                <span
                                    className={`${showMuseumsMenu === 'open' ? 'rotate-90' : 'rotate-0'} transition-all duration-500 origin-center`}>&gt;</span>
                            </button>
                            <ul id="museumsSubmenu" inert={showMuseumsMenu === 'close'}
                                className={`${showMuseumsMenu === 'open' ? 'max-h-[1000px]' : 'max-h-0'} w-[250px] right-[15%] top-[48px] pl-4 transition-all duration-500 absolute bg-black z-100`}>
                                <li className={`${showMuseumsMenu === 'open' ? 'block' : 'hidden'} py-3`}>
                                    <Link
                                        href="/museo-civico-ala-ponzone"
                                        onNavigate={() => toggleMenu('close')}
                                    >
                                        Museo Civico &quot;Ala Ponzone&quot;
                                    </Link>
                                </li>
                                <li className={`${showMuseumsMenu === 'open' ? 'block' : 'hidden'} py-3`}>
                                    <Link
                                        href="/museo-archeologico-san-lorenzo"
                                        onNavigate={() => toggleMenu('close')}
                                    >
                                        Museo Archeologico &quot;San Lorenzo&quot;
                                    </Link>
                                </li>
                                <li className={`${showMuseumsMenu === 'open' ? 'block' : 'hidden'} py-3`}>
                                    <Link
                                        href="/museo-di-storia-naturale"
                                        onNavigate={() => toggleMenu('close')}
                                    >
                                        Museo di Storia Naturale
                                    </Link>
                                </li>
                                <li className={`${showMuseumsMenu === 'open' ? 'block' : 'hidden'} py-3`}>
                                    <Link
                                        href="/museo-della-civilta-contadina"
                                        onNavigate={() => toggleMenu('close')}
                                    >
                                        Museo della civiltà contadina &quot;Il Cambonino Vecchio&quot;
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className="flex flex-col relative">
                            <button type="button"
                                    onPointerDown={() => {
                                        pointerFocusRef.current = true;
                                    }}
                                    onFocus={openVisitMenuOnFocus}
                                    aria-expanded={showVisitMenu === 'open'}
                                    aria-controls="visitSubmenu"
                                    onClick={() => {
                                        pointerFocusRef.current = false;
                                        toggleVisitMenu();
                                    }}
                                    className="min-w-[64px] border-b border-black/50 cursor-pointer flex justify-between items-center">
                                <span className="font-semibold">Visita</span>
                                <span
                                    className={`${showVisitMenu === 'open' ? 'rotate-90' : 'rotate-0'} transition-all duration-500 origin-center`}>&gt;</span>
                            </button>
                            <ul id="visitSubmenu" inert={showVisitMenu === 'close'}
                                className={`${showVisitMenu === 'open' ? 'max-h-[1000px]' : 'max-h-0'} w-[200px] top-[48px] pl-4 transition-all duration-500 absolute bg-black z-100`}>
                                <li className={`${showVisitMenu === 'open' ? 'block' : 'hidden'} py-3`}>
                                    <Link
                                        href="/info-gruppi"
                                        onNavigate={() => toggleMenu('close')}
                                    >
                                        Info gruppi
                                    </Link>
                                </li>
                                <li className={`${showVisitMenu === 'open' ? 'block' : 'hidden'} py-3`}>
                                    <Link
                                        href="/servizi-educativi"
                                        onNavigate={() => toggleMenu('close')}
                                    >
                                        Servizi educativi
                                    </Link>
                                </li>
                                <li className={`${showVisitMenu === 'open' ? 'block' : 'hidden'} py-3`}>
                                    <Link
                                        href="/info-utili"
                                        onNavigate={() => toggleMenu('close')}
                                    >
                                        Info utili
                                    </Link>
                                </li>
                                <li className={`${showVisitMenu === 'open' ? 'block' : 'hidden'} py-3`}>
                                    <Link
                                        href="/faq"
                                        onNavigate={() => toggleMenu('close')}
                                    >
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className="font-semibold border-b border-black/50 cursor-pointer">
                            <Link
                                href="/news-eventi"
                                onNavigate={() => toggleMenu('close')}
                            >
                                News ed eventi
                            </Link>
                        </li>

                        <li className="font-semibold border-b border-black/50 cursor-pointer">
                            <a
                                aria-label="Vai alla pagina dedicata all'elenco delle misure adottate per rendere i musei accessibili"
                                href="https://musei.comune.cremona.it/it/accessibilita/percorsi-per-disabili-motori"
                                target="_blank" rel="noopener noreferrer"
                            >
                                Accessibilità
                            </a>
                        </li>

                        <li className="font-semibold border-b border-black/50 cursor-pointer">
                            <Link
                                href="/contatti"
                                onNavigate={() => toggleMenu('close')}
                            >
                                Contatti
                            </Link>
                        </li>

                        <ul>

                            <li className="flex gap-2">
                                <a aria-label="Vai alla pagina Facebook dei Musei Civici" href="https://www.facebook.com/cremonamusei/" target="_blank"
                                   rel="noopener noreferrer" className="w-6">
                                    <Image src="/icons/hugeicons_facebook-02.webp" alt="facebook logo" width={48}
                                           height={48}/>
                                </a>
                                <a aria-label="Vai alla pagina Instagram dei Musei Civici" href="https://www.instagram.com/cremonamusei/" target="_blank"
                                   rel="noopener noreferrer" className="w-6">
                                    <Image src="/icons/logo-instagram.webp" alt="instagram logo" width={48}
                                           height={48}/>
                                </a>
                            </li>
                        </ul>

                    </ul>
                </nav>
            </header>

            <div
                className={`md:hidden block overlay ${showMenu === 'open' ? 'visible' : ''}`} aria-hidden>
            </div>

            <div
                inert={showMenu !== 'open'}
                className={`${showMenu === 'open' ? 'appear' : showMenu === 'close' ? 'disappear' : 'w-0'} md:hidden block max-w-full h-screen fixed bg-white z-200 right-0 top-0`}>
                <div className="w-full px-8 pb-2 md:pb-8 pt-4 flex items-center justify-between">
                    <Image
                        src='/icons/logo_black.png'
                        alt="visit-cremona-logo"
                        width={500}
                        height={500}
                        className="h-12 w-auto"
                    />
                    <button aria-label="Chiudi il menu"
                            type="button"
                            onClick={() => toggleMenu('close')}
                            id="closeMenuButton"
                            aria-controls="mainMenuMobile" aria-expanded={showMenu === 'open'}
                            className="md:hidden block"
                    >
                        <Close aria-hidden={true} className="w-4 h-4 cursor-pointer"/>
                    </button>
                </div>

                <nav
                    id="mainMenuMobile"
                    className="mt-4 w-[90%] mx-auto text-black pt-3 overflow-y-auto h-[calc(100vh-96px)]">
                    <ul className="pl-2">
                        <li className="w-full flex flex-col">
                            <button type="button"
                                    onPointerDown={() => {
                                        pointerFocusRef.current = true;
                                    }}
                                    onFocus={openMuseumsMenuOnFocus}
                                    aria-expanded={showMuseumsMenu === 'open'}
                                    aria-controls="museumsSubmenu"
                                    onClick={() => {
                                        pointerFocusRef.current = false;
                                        toggleMuseumsMenu();
                                    }}
                                    id="museumsButton"
                                    className="border-b border-black/50 cursor-pointer pr-4 py-3 flex justify-between items-center">
                                <span className="text-2xl font-semibold">Musei</span>
                                <span
                                    className={`${showMuseumsMenu === 'open' ? 'rotate-90' : 'rotate-0'} transition-all duration-500 origin-center`}>&gt;</span>
                            </button>
                            <ul id="museumsSubmenu" inert={showMuseumsMenu === 'close'}
                                className={`${showMuseumsMenu === 'open' ? 'max-h-[1000px]' : 'max-h-0'} pl-4 transition-all duration-500 overflow-hidden`}>
                                <li className="py-3">
                                    <Link
                                        href="/museo-civico-ala-ponzone"
                                        onNavigate={() => toggleMenu('close')}
                                    >
                                        Museo Civico &quot;Ala Ponzone&quot;
                                    </Link>
                                </li>
                                <li className="py-3">
                                    <Link
                                        href="/museo-archeologico-san-lorenzo"
                                        onNavigate={() => toggleMenu('close')}
                                    >
                                        Museo Archeologico &quot;San Lorenzo&quot;
                                    </Link>
                                </li>
                                <li className="py-3">
                                    <Link
                                        href="/museo-di-storia-naturale"
                                        onNavigate={() => toggleMenu('close')}
                                    >
                                        Museo di Storia Naturale
                                    </Link>
                                </li>
                                <li className="py-3">
                                    <Link
                                        href="/museo-della-civilta-contadina"
                                        onNavigate={() => toggleMenu('close')}
                                    >
                                        Museo della civiltà contadina &quot;Il Cambonino Vecchio&quot;
                                    </Link>
                                </li>
                            </ul>
                        </li>


                        <li className="w-full flex flex-col">
                            <button type="button"
                                    onPointerDown={() => {
                                        pointerFocusRef.current = true;
                                    }}
                                    onFocus={openVisitMenuOnFocus}
                                    aria-expanded={showVisitMenu === 'open'}
                                    aria-controls="visitSubmenu"
                                    onClick={() => {
                                        pointerFocusRef.current = false;
                                        toggleVisitMenu();
                                    }}
                                    className="border-b border-black/50 cursor-pointer pr-4 py-3 flex justify-between items-center">
                                <span className="text-2xl font-semibold">Visita</span>
                                <span
                                    className={`${showVisitMenu === 'open' ? 'rotate-90' : 'rotate-0'} transition-all duration-500 origin-center`}>&gt;</span>
                            </button>
                            <ul id="visitSubmenu" inert={showVisitMenu === 'close'}
                                className={`${showVisitMenu === 'open' ? 'max-h-[1000px]' : 'max-h-0'} pl-4 transition-all duration-500 overflow-hidden`}>
                                <li className="py-3">
                                    <Link
                                        href="/info-gruppi"
                                        onNavigate={() => toggleMenu('close')}
                                    >
                                        Info gruppi
                                    </Link>
                                </li>
                                <li className="py-3">
                                    <Link
                                        href="/servizi-educativi"
                                        onNavigate={() => toggleMenu('close')}
                                    >
                                        Servizi educativi
                                    </Link>
                                </li>
                                <li className="py-3">
                                    <Link
                                        href="/info-utili"
                                        onNavigate={() => toggleMenu('close')}
                                    >
                                        Info utili
                                    </Link>
                                </li>
                                <li className="py-3">
                                    <Link
                                        href="/faq"
                                        onNavigate={() => toggleMenu('close')}
                                    >
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className="py-3 text-2xl font-semibold border-b border-black/50 cursor-pointer">
                            <Link
                                href="/news-eventi"
                                onNavigate={() => toggleMenu('close')}
                            >
                                News ed eventi
                            </Link>
                        </li>

                        <li className="py-3 text-2xl font-semibold border-b border-black/50 cursor-pointer">
                            <a
                                aria-label="Vai alla pagina dedicata all'elenco delle misure adottate per rendere i musei accessibili"
                                href="https://musei.comune.cremona.it/it/accessibilita/percorsi-per-disabili-motori"
                                target="_blank" rel="noopener noreferrer"
                            >
                                Accessibilità
                            </a>
                        </li>

                        <li className="py-3 text-2xl font-semibold border-b border-black/50 cursor-pointer">
                            <Link
                                href="/contatti"
                                onNavigate={() => toggleMenu('close')}
                            >
                                Contatti
                            </Link>
                        </li>

                    </ul>
                </nav>
            </div>
        </>
    )
}

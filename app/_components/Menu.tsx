'use client'
import {Hamburger} from "@/app/_components/_icons/Hamburger";
import Link from "next/link";
import {Close} from "@/app/_components/_icons/Close";
import {useCallback, useEffect, useRef, useState} from "react";
import {usePathname} from "next/navigation";

export default function Menu() {

    const [showMenu, setShowMenu] = useState<string>('initial');
    const [showMuseumsMenu, setShowMuseumsMenu] = useState<string>('close');
    const [showVisitMenu, setShowVisitMenu] = useState<string>('close');
    const pointerFocusRef = useRef(false);
    const hamburgerButtonRef = useRef<HTMLButtonElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const [activeMenuPathname, setActiveMenuPathname] = useState(pathname);
    const isMainMenuOpen = showMenu === 'open' && activeMenuPathname === pathname;
    const isMuseumsMenuOpen = showMuseumsMenu === 'open' && activeMenuPathname === pathname;
    const isVisitMenuOpen = showVisitMenu === 'open' && activeMenuPathname === pathname;
    const desktopSubmenuClasses = "top-[48px] px-4 transition-[max-height,opacity] duration-500 ease-in-out overflow-hidden absolute bg-black z-100";
    const openSubmenuClasses = "max-h-[1000px] opacity-100 pointer-events-auto";
    const closedSubmenuClasses = "max-h-0 opacity-0 pointer-events-none";
    const desktopMuseumsButtonId = 'desktopMuseumsButton';
    const desktopMuseumsSubmenuId = 'desktopMuseumsSubmenu';
    const desktopVisitSubmenuId = 'desktopVisitSubmenu';
    const mobileMenuDialogId = 'mainMenuMobileDialog';
    const mobileMuseumsButtonId = 'mobileMuseumsButton';
    const mobileMuseumsSubmenuId = 'mobileMuseumsSubmenu';
    const mobileVisitSubmenuId = 'mobileVisitSubmenu';

    const closeAllMenus = useCallback(() => {
        setShowMenu(current => current === 'open' ? 'close' : current);
        setShowMuseumsMenu('close');
        setShowVisitMenu('close');
    }, []);

    function toggleMenu(action:'open'|'close') {
        if(action === 'open' && !isMainMenuOpen) {
            setActiveMenuPathname(pathname);
            setShowMenu('open');
        } else if(action === 'close') {
            closeAllMenus();
        }
    }

    function toggleMuseumsMenu() {
        if(!isMuseumsMenuOpen) {
            setActiveMenuPathname(pathname);
            setShowMuseumsMenu('open');
            setShowVisitMenu('close');
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
        setActiveMenuPathname(pathname);
    }

    function toggleVisitMenu() {
        if(!isVisitMenuOpen) {
            setActiveMenuPathname(pathname);
            setShowVisitMenu('open');
            setShowMuseumsMenu('close');
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
        setActiveMenuPathname(pathname);
    }

    useEffect(() => {
        const main = document.getElementById('main');
        const header = document.getElementById('header');
        const footer = document.getElementById('footer');
        const pageRegions = [main, header, footer].filter((element): element is HTMLElement => Boolean(element));

        if(isMainMenuOpen) {
            document.getElementById(mobileMuseumsButtonId)?.focus();
            document.body.style.overflow = 'hidden';

            pageRegions.forEach((element) => {
                element.setAttribute('inert', 'inert');
                element.setAttribute('aria-hidden', 'true');
            });
        } else if(showMenu !== 'initial') {
            document.body.style.overflow = '';

            pageRegions.forEach((element) => {
                element.removeAttribute('inert');
                element.removeAttribute('aria-hidden');
            });

            hamburgerButtonRef.current?.focus();
        }

        return () => {
            document.body.style.overflow = '';

            pageRegions.forEach((element) => {
                element.removeAttribute('inert');
                element.removeAttribute('aria-hidden');
            });
        };
    }, [isMainMenuOpen, showMenu, mobileMuseumsButtonId])

    useEffect(() => {
        if(!isMainMenuOpen) {
            return;
        }

        function getFocusableMenuElements() {
            const mobileMenu = mobileMenuRef.current;

            if(!mobileMenu) {
                return [];
            }

            return Array.from(
                mobileMenu.querySelectorAll<HTMLElement>(
                    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
                ),
            ).filter((element) => !element.closest('[inert], [aria-hidden="true"]'));
        }

        function handleTabKeyDown(e: KeyboardEvent) {
            if(e.key !== 'Tab') {
                return;
            }

            const focusableElements = getFocusableMenuElements();
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if(!firstElement || !lastElement) {
                e.preventDefault();
                return;
            }

            if(mobileMenuRef.current && !mobileMenuRef.current.contains(document.activeElement)) {
                e.preventDefault();
                firstElement.focus();
                return;
            }

            if(e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if(!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }

        window.addEventListener('keydown', handleTabKeyDown);

        return () => {
            window.removeEventListener('keydown', handleTabKeyDown);
        };
    }, [isMainMenuOpen]);

    useEffect(() => {
        function handleEscapeKeyDown(e: KeyboardEvent) {
           if (e.key === 'Escape') {
                closeAllMenus();
            }
        }

        window.addEventListener('keydown', handleEscapeKeyDown);

        return () => {
            window.removeEventListener('keydown', handleEscapeKeyDown);
        };
    }, [closeAllMenus]);

    return (
        <>
            <header id="header" className="fixed z-100 bg-black flex justify-between items-center w-full px-4 md:px-12 py-4">
                <Link href="/it">
                    <img src='/icons/logo.png'
                           alt="Logo dei Musei Civici di Cremona" width={48} height={48}
                           className="w-12"

                    />
                </Link>
                <div className="flex gap-4">
                    <button type="button"
                            aria-controls={mobileMenuDialogId} aria-expanded={isMainMenuOpen}
                            aria-hidden={isMainMenuOpen}
                            aria-label="Apri il menu"
                            disabled={isMainMenuOpen}
                            id="hamburgerButton"
                            onClick={() => toggleMenu('open')}
                            ref={hamburgerButtonRef}
                            tabIndex={isMainMenuOpen ? -1 : undefined}
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
                                    aria-expanded={isMuseumsMenuOpen}
                                    aria-controls={desktopMuseumsSubmenuId}
                                    aria-haspopup="true"
                                    onClick={() => {
                                        pointerFocusRef.current = false;
                                        toggleMuseumsMenu();
                                    }}
                                    id={desktopMuseumsButtonId}
                                    className="min-w-[64px] border-b border-black/50 cursor-pointer flex justify-between items-center">
                                <span className="font-semibold">Musei</span>
                                <span
                                    className={`${isMuseumsMenuOpen ? 'rotate-90' : 'rotate-0'} transition-all duration-500 origin-center`}>&gt;</span>
                            </button>
                            <ul id={desktopMuseumsSubmenuId} inert={!isMuseumsMenuOpen} aria-hidden={!isMuseumsMenuOpen}
                                className={`${isMuseumsMenuOpen ? openSubmenuClasses : closedSubmenuClasses} ${desktopSubmenuClasses} w-[250px] md:left-0 lg:right-[15%]`}>
                                <li className="py-3">
                                    <Link
                                        href="/it/museo-civico-ala-ponzone"
                                        onNavigate={closeAllMenus}
                                    >
                                        Museo Civico &quot;Ala Ponzone&quot;
                                    </Link>
                                </li>
                                <li className="py-3">
                                    <Link
                                        href="/it/museo-archeologico-san-lorenzo"
                                        onNavigate={closeAllMenus}
                                    >
                                        Museo Archeologico &quot;San Lorenzo&quot;
                                    </Link>
                                </li>
                                <li className="py-3">
                                    <Link
                                        href="/it/museo-di-storia-naturale"
                                        onNavigate={closeAllMenus}
                                    >
                                        Museo di Storia Naturale
                                    </Link>
                                </li>
                                <li className="py-3">
                                    <Link
                                        href="/it/museo-della-civilta-contadina"
                                        onNavigate={closeAllMenus}
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
                                    aria-expanded={isVisitMenuOpen}
                                    aria-controls={desktopVisitSubmenuId}
                                    aria-haspopup="true"
                                    onClick={() => {
                                        pointerFocusRef.current = false;
                                        toggleVisitMenu();
                                    }}
                                    className="min-w-[64px] border-b border-black/50 cursor-pointer flex justify-between items-center">
                                <span className="font-semibold">Visita</span>
                                <span
                                    className={`${isVisitMenuOpen ? 'rotate-90' : 'rotate-0'} transition-all duration-500 origin-center`}>&gt;</span>
                            </button>
                            <ul id={desktopVisitSubmenuId} inert={!isVisitMenuOpen} aria-hidden={!isVisitMenuOpen}
                                className={`${isVisitMenuOpen ? openSubmenuClasses : closedSubmenuClasses} ${desktopSubmenuClasses} w-[200px]`}>
                                <li className="py-3">
                                    <Link
                                        href="/it/info-gruppi"
                                        onNavigate={closeAllMenus}
                                    >
                                        Info gruppi
                                    </Link>
                                </li>
                                <li className="py-3">
                                    <Link
                                        href="/it/servizi-educativi"
                                        onNavigate={closeAllMenus}
                                    >
                                        Servizi educativi
                                    </Link>
                                </li>
                                <li className="py-3">
                                    <Link
                                        href="/it/info-utili"
                                        onNavigate={closeAllMenus}
                                    >
                                        Info utili
                                    </Link>
                                </li>
                                <li className="py-3">
                                    <Link
                                        href="/it/faq"
                                        onNavigate={closeAllMenus}
                                    >
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className="font-semibold border-b border-black/50 cursor-pointer">
                            <Link
                                href="/it/news-eventi"
                                onNavigate={closeAllMenus}
                            >
                                News ed eventi
                            </Link>
                        </li>

                        <li className="font-semibold border-b border-black/50 cursor-pointer">
                            <a
                                aria-label="Vai alla pagina dedicata all'elenco delle misure adottate per rendere i musei accessibili"
                                href="https://musei.comune.cremona.it/it/accessibilita"
                                target="_blank" rel="noopener noreferrer"
                            >
                                Accessibilità
                            </a>
                        </li>

                        <li className="font-semibold border-b border-black/50 cursor-pointer">
                            <Link
                                href="/it/contatti"
                                onNavigate={closeAllMenus}
                            >
                                Contatti
                            </Link>
                        </li>

                        <li className="flex gap-2">
                            <a aria-label="Vai alla pagina Facebook dei Musei Civici" href="https://www.facebook.com/cremonamusei/" target="_blank"
                               rel="noopener noreferrer" className="w-6">
                                <img src="/icons/hugeicons_facebook-02.webp" aria-hidden alt="" width={48}
                                       height={48}/>
                            </a>
                            <a aria-label="Vai alla pagina Instagram dei Musei Civici" href="https://www.instagram.com/cremonamusei/" target="_blank"
                               rel="noopener noreferrer" className="w-6">
                                <img src="/icons/logo-instagram.webp" aria-hidden alt="" width={48}
                                       height={48}/>
                            </a>
                        </li>

                        <Link href="/en">EN</Link>

                    </ul>
                </nav>
            </header>

            <div
                className={`md:hidden block overlay ${isMainMenuOpen ? 'visible' : ''}`} aria-hidden>
            </div>

            <div
                id={mobileMenuDialogId}
                inert={!isMainMenuOpen}
                aria-hidden={!isMainMenuOpen}
                aria-label="Menu principale"
                aria-modal="true"
                ref={mobileMenuRef}
                role="dialog"
                className={`${isMainMenuOpen ? 'appear' : showMenu !== 'initial' ? 'disappear' : 'w-0'} md:hidden block max-w-full h-screen fixed bg-white z-200 right-0 top-0`}>
                <div className="w-full px-8 pb-2 md:pb-8 pt-4 flex items-center justify-between">
                    <img
                        src='/icons/logo_black.png'
                        alt="Logo dei Musei Civici di Cremona"
                        width={500}
                        height={500}
                        className="h-12 w-auto"
                    />
                    <button aria-label="Chiudi il menu"
                            type="button"
                            onClick={() => toggleMenu('close')}
                            id="closeMenuButton"
                            aria-controls={mobileMenuDialogId} aria-expanded={isMainMenuOpen}
                            className="md:hidden block"
                    >
                        <Close aria-hidden={true} className="w-4 h-4 cursor-pointer"/>
                    </button>
                </div>

                <nav
                    id="mainMenuMobile"
                    className="mt-4 w-[90%] mx-auto text-black pt-3 overflow-y-auto h-[calc(100vh-96px)]">
                    <ul className="pl-2 relative">
                        <li className="w-full flex flex-col">
                            <button type="button"
                                    onPointerDown={() => {
                                        pointerFocusRef.current = true;
                                    }}
                                    onFocus={openMuseumsMenuOnFocus}
                                    aria-expanded={isMuseumsMenuOpen}
                                    aria-controls={mobileMuseumsSubmenuId}
                                    aria-haspopup="true"
                                    onClick={() => {
                                        pointerFocusRef.current = false;
                                        toggleMuseumsMenu();
                                    }}
                                    id={mobileMuseumsButtonId}
                                    className="border-b border-black/50 cursor-pointer pr-4 py-3 flex justify-between items-center">
                                <span className="text-2xl font-semibold">Musei</span>
                                <span
                                    className={`${isMuseumsMenuOpen ? 'rotate-90' : 'rotate-0'} transition-all duration-500 origin-center`}>&gt;</span>
                            </button>
                            <ul id={mobileMuseumsSubmenuId} inert={!isMuseumsMenuOpen} aria-hidden={!isMuseumsMenuOpen}
                                className={`${isMuseumsMenuOpen ? 'max-h-[1000px]' : 'max-h-0'} pl-4 transition-all duration-500 overflow-hidden`}>
                                <li className="py-3">
                                    <Link
                                        href="/it/museo-civico-ala-ponzone"
                                        onNavigate={closeAllMenus}
                                    >
                                        Museo Civico &quot;Ala Ponzone&quot;
                                    </Link>
                                </li>
                                <li className="py-3">
                                    <Link
                                        href="/it/museo-archeologico-san-lorenzo"
                                        onNavigate={closeAllMenus}
                                    >
                                        Museo Archeologico &quot;San Lorenzo&quot;
                                    </Link>
                                </li>
                                <li className="py-3">
                                    <Link
                                        href="/it/museo-di-storia-naturale"
                                        onNavigate={closeAllMenus}
                                    >
                                        Museo di Storia Naturale
                                    </Link>
                                </li>
                                <li className="py-3">
                                    <Link
                                        href="/it/museo-della-civilta-contadina"
                                        onNavigate={closeAllMenus}
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
                                    aria-expanded={isVisitMenuOpen}
                                    aria-controls={mobileVisitSubmenuId}
                                    aria-haspopup="true"
                                    onClick={() => {
                                        pointerFocusRef.current = false;
                                        toggleVisitMenu();
                                    }}
                                    className="border-b border-black/50 cursor-pointer pr-4 py-3 flex justify-between items-center">
                                <span className="text-2xl font-semibold">Visita</span>
                                <span
                                    className={`${isVisitMenuOpen ? 'rotate-90' : 'rotate-0'} transition-all duration-500 origin-center`}>&gt;</span>
                            </button>
                            <ul id={mobileVisitSubmenuId} inert={!isVisitMenuOpen} aria-hidden={!isVisitMenuOpen}
                                className={`${isVisitMenuOpen ? 'max-h-[1000px]' : 'max-h-0'} pl-4 transition-all duration-500 overflow-hidden`}>
                                <li className="py-3">
                                    <Link
                                        href="/it/info-gruppi"
                                        onNavigate={closeAllMenus}
                                    >
                                        Info gruppi
                                    </Link>
                                </li>
                                <li className="py-3">
                                    <Link
                                        href="/it/servizi-educativi"
                                        onNavigate={closeAllMenus}
                                    >
                                        Servizi educativi
                                    </Link>
                                </li>
                                <li className="py-3">
                                    <Link
                                        href="/it/info-utili"
                                        onNavigate={closeAllMenus}
                                    >
                                        Info utili
                                    </Link>
                                </li>
                                <li className="py-3">
                                    <Link
                                        href="/it/faq"
                                        onNavigate={closeAllMenus}
                                    >
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className="py-3 text-2xl font-semibold border-b border-black/50 cursor-pointer">
                            <Link
                                href="/it/news-eventi"
                                onNavigate={closeAllMenus}
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
                                href="/it/contatti"
                                onNavigate={closeAllMenus}
                            >
                                Contatti
                            </Link>
                        </li>

                        <li className="font-bold absolute bottom-[-48px] right-5">
                            <Link href="/en">Go to the English website</Link>
                        </li>

                    </ul>
                </nav>
            </div>
        </>
    )
}

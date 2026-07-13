'use client'
import {useEffect, useMemo, useState} from "react";
import NextSlide from "@/app/_components/NextSlide";
import PrevSlide from "@/app/_components/PrevSlide";
import Image from "next/image";
import {CircledArrow} from "@/app/_components/_icons/CircledArrow";
import Link from "next/link";
import type { CarouselImage } from "@/app/lib/strapi-types";

type OrderedCarouselImage = CarouselImage & {
    ordine?: number | string | null;
    pageName?: string;
};

type CarouselImageWithPageName = OrderedCarouselImage & {
    pageName: string;
};

function getCarouselImageOrder(pic: OrderedCarouselImage) {
    const order = Number(pic.ordine ?? Number.MAX_SAFE_INTEGER);

    return Number.isFinite(order) ? order : Number.MAX_SAFE_INTEGER;
}

function getCarouselPageName(pic: OrderedCarouselImage) {
    switch(Number(pic.ordine)) {
        case 1:
            return 'museo-civico-ala-ponzone';
        case 2:
            return 'museo-archeologico-san-lorenzo';
        case 3:
            return 'museo-di-storia-naturale';
        case 4:
            return 'museo-della-civilta-contadina';
        default:
            return 'museo-civico-ala-ponzone';
    }
}

type CarouselLang = 'it' | 'en';

export default function Carousel({pics, lang}:{pics: OrderedCarouselImage[], lang: CarouselLang}) {

    const [slide, setSlide] = useState<number>(0);
    const [placeholder, setPlaceholder] = useState<number>(slide);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
    const orderedPics = useMemo<CarouselImageWithPageName[]>(
        () => [...pics]
            .sort((a, b) => getCarouselImageOrder(a) - getCarouselImageOrder(b))
            .map((pic) => ({
                ...pic,
                pageName: getCarouselPageName(pic),
            })),
        [pics],
    );

    function setCurrentSlide(fn:'add'|'sub') {
        const nextSlide = fn === 'add'
            ? slide === orderedPics.length - 1 ? 0 : slide + 1
            : slide === 0 ? orderedPics.length - 1 : slide - 1;

        if (prefersReducedMotion) {
            document.getElementById('slider')?.classList.remove('fadein');
            setPlaceholder(nextSlide);
            setSlide(nextSlide);
            return;
        }

        document.getElementById('prevBtn')?.setAttribute('disabled', 'disabled');
        document.getElementById('nextBtn')?.setAttribute('disabled', 'disabled');
        setSlide(nextSlide);
        document.getElementById('slider')?.classList.add('fadein');
    }

    function setCredits(str:string) {
        const arr = str.split('Credits:');
        return arr[1];
    }

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const updateMotionPreference = () => {
            setPrefersReducedMotion(mediaQuery.matches);
        };

        updateMotionPreference();
        mediaQuery.addEventListener('change', updateMotionPreference);

        return () => {
            mediaQuery.removeEventListener('change', updateMotionPreference);
        };
    }, []);

    useEffect(() => {
        if (prefersReducedMotion) {
            document.getElementById('slider')?.classList.remove('fadein');
            document.getElementById('prevBtn')?.removeAttribute('disabled');
            document.getElementById('nextBtn')?.removeAttribute('disabled');
            return;
        }

        const transitionTimeout = window.setTimeout(() => {
            document.getElementById('slider')?.classList.remove('fadein');
            document.getElementById('prevBtn')?.removeAttribute('disabled');
            document.getElementById('nextBtn')?.removeAttribute('disabled');
            setPlaceholder(slide);
        }, 1500)

        return () => {
            window.clearTimeout(transitionTimeout);
        };
    }, [prefersReducedMotion, slide]);

    if (orderedPics.length === 0) {
        return null;
    }

    const placeholderSlide = prefersReducedMotion ? slide : placeholder;
    const currentSlideLinkLabel = lang === 'it'
        ? `Vai alla pagina del ${orderedPics[slide].titolo}`
        : `Go to the page for ${orderedPics[slide].titolo}`;

   return(
       <div className="hidden md:flex flex-col items-center gap-4 w-full max-w-[100%] pt-[80px]">
           <div className="flex items-center w-full h-[70dvh] relative max-w-[100%]">
               <PrevSlide lang={lang} setSlide={() => setCurrentSlide('sub')}/>
               {orderedPics &&
                   <>
                       <Image
                           aria-hidden={true}
                           className='object-cover absolute z-0'
                           src={process.env.NEXT_PUBLIC_BASE_URL + orderedPics[placeholderSlide].url}
                           alt={orderedPics[placeholderSlide].alternativeText}
                           fill={true}
                       />

                       <Image
                           id="slider"
                           className='object-cover relative z-5'
                           src={process.env.NEXT_PUBLIC_BASE_URL + orderedPics[slide].url}
                           alt={orderedPics[slide].alternativeText}
                           fill={true}
                       />

                       <div className="hidden md:block rounded-xl gradient absolute bottom-5 left-[7.5%] z-10 text-white font-bold text-xl p-8">
                           <h2>{orderedPics[slide].titolo}</h2>
                           <div className="w-full flex justify-end">
                               <Link
                                   aria-label={currentSlideLinkLabel}
                                   className="w-fit text-black flex items-center gap-2 text-lg md:text-base font-medium prime-bg rounded-full px-3 py-1 mt-6"
                                   href={`/${lang}/${orderedPics[slide].pageName}`}>
                                   {lang === 'it' ? 'Scopri di più' : 'Find out more'}
                                   <CircledArrow width={28} height={28}/>
                               </Link>
                           </div>
                       </div>

                       {
                           orderedPics[slide].alternativeText.includes('Credits:') &&
                           <div className="text-white font-medium absolute z-6 bottom-2 right-5">
                               &copy; {setCredits(orderedPics[slide].alternativeText)}
                           </div>
                       }
                   </>
               }

               <NextSlide lang={lang} setSlide={() => setCurrentSlide('add')}/>
           </div>
           <div aria-hidden={true} className="flex gap-2">
               {orderedPics &&
                   orderedPics.map((pic, i) => {
                       return(
                            <div key={pic.name}
                                 className={`w-2 h-2 rounded-full ${slide === i ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
                        )
                    })
               }
           </div>
       </div>
   )
}

'use client'
import {useEffect, useState} from "react";
import NextSlide from "@/app/_components/NextSlide";
import PrevSlide from "@/app/_components/PrevSlide";
import Image from "next/image";
import {CircledArrow} from "@/app/_components/_icons/CircledArrow";
import Link from "next/link";
import type { CarouselImage } from "@/app/lib/strapi-types";

export default function Carousel({pics, lang}:{pics: CarouselImage[], lang:string}) {

    const [slide, setSlide] = useState<number>(0);
    const [placeholder, setPlaceholder] = useState<number>(slide);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

    function setCurrentSlide(fn:'add'|'sub') {
        const nextSlide = fn === 'add'
            ? slide === pics.length - 1 ? 0 : slide + 1
            : slide === 0 ? pics.length - 1 : slide - 1;

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

    if (pics.length === 0) {
        return null;
    }

    const placeholderSlide = prefersReducedMotion ? slide : placeholder;

   return(
       <div className="hidden md:flex flex-col items-center gap-4 w-full max-w-[100%] pt-[80px]">
           <div className="flex items-center w-full h-[70dvh] relative max-w-[100%]">
               <PrevSlide aria-hidden={true} setSlide={() => setCurrentSlide('sub')}/>
               {pics &&
                   <>
                       <Image
                           aria-hidden={true}
                           className='object-cover absolute z-0'
                           src={process.env.NEXT_PUBLIC_BASE_URL + pics[placeholderSlide].url}
                           alt={pics[placeholderSlide].alternativeText}
                           fill={true}
                       />

                       <Image
                           id="slider"
                           className='object-cover relative z-5'
                           src={process.env.NEXT_PUBLIC_BASE_URL + pics[slide].url}
                           alt={pics[slide].alternativeText}
                           fill={true}
                       />

                       <div className="hidden md:block rounded-xl gradient absolute bottom-5 left-[7.5%] z-10 text-white font-bold text-xl p-8">
                           <h2>{pics[slide].titolo}</h2>
                           <div className="w-full flex justify-end">
                               <Link
                                   aria-label={`Vai alla pagine del ${pics[slide].titolo}`}
                                   className="w-fit text-black flex items-center gap-2 text-lg md:text-base font-medium prime-bg rounded-full px-3 py-1 mt-6"
                                   href={`/${pics[slide].slug}`}>
                                   {lang === 'it' ? 'Scopri di più' : 'Find out more'}
                                   <CircledArrow width={28} height={28}/>
                               </Link>
                           </div>
                       </div>

                       {
                           pics[slide].alternativeText.includes('Credits:') &&
                           <div className="text-white font-medium absolute z-6 bottom-2 right-5">
                               &copy; {setCredits(pics[slide].alternativeText)}
                           </div>
                       }
                   </>
               }

               <NextSlide aria-hidden={true} setSlide={() => setCurrentSlide('add')}/>
           </div>
           <div aria-hidden={true} className="flex gap-2">
               {pics &&
                   pics.map((pic, i) => {
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

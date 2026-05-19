'use client'
import React, {useEffect, useState} from "react";
import NextSlide from "@/app/_components/NextSlide";
import PrevSlide from "@/app/_components/PrevSlide";
import Image from "next/image";
import {CircledArrow} from "@/app/_components/_icons/CircledArrow";
import Link from "next/link";

export default function Carousel({pics}:{pics:any}) {

    const [slide, setSlide] = useState<number>(0);
    const [placeholder, setPlaceholder] = useState<number>(slide);
    function setCurrentSlide(fn:string) {
        document.getElementById('prevBtn')?.setAttribute('disabled', 'disabled');
        document.getElementById('nextBtn')?.setAttribute('disabled', 'disabled');
        if(fn === 'add') {
            if(slide === pics.length - 1) {
                setSlide(0);
            } else {
                setSlide(prev => prev + 1);
            }
        } else {
            if(slide === 0) {
                setSlide(pics.length - 1);
            } else {
                setSlide(prev => prev - 1);
            }
        }
        document.getElementById('slider')?.classList.add('fadein');
    }

    function setCredits(str:string) {
        const arr = str.split('Credits:');
        return arr[1];
    }

    useEffect(() => {
        setTimeout(() => {
            document.getElementById('slider')?.classList.remove('fadein');
            document.getElementById('prevBtn')?.removeAttribute('disabled');
            document.getElementById('nextBtn')?.removeAttribute('disabled');
            setPlaceholder(slide);
        }, 1500)
    }, [slide]);

   return(
       <div className="flex flex-col items-center gap-4 w-full max-w-[100%]">
           <div className="flex items-center w-full h-[70dvh] relative max-w-[100%]">
               <PrevSlide aria-hidden={true} setSlide={() => setCurrentSlide('sub')}/>
               {pics &&
                   <>
                       <Image
                           aria-hidden={true}
                           className='object-cover absolute z-0'
                           src={process.env.NEXT_PUBLIC_BASE_URL + pics[placeholder].url}
                           alt={pics[placeholder].alternativeText}
                           fill={true}
                       />

                       <Image
                           id="slider"
                           className='object-cover relative z-5'
                           src={process.env.NEXT_PUBLIC_BASE_URL + pics[slide].url}
                           alt={pics[slide].alternativeText}
                           fill={true}
                       />

                       <div className="hidden md:block rounded-xl gradient absolute bottom-5 right-[7.5%] z-10 text-white font-bold text-xl p-8">
                           <h2>{pics[slide].titolo}</h2>
                           <div className="w-full flex justify-end">
                               <Link
                                   className="w-fit text-black flex items-center gap-2 text-lg md:text-base font-medium prime-bg rounded-full px-3 py-1 mt-6"
                                   href={`/${pics[slide].slug}`}>
                                   Scopri di più
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
                   pics.map((pic: any, i: number) => {
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
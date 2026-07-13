'use client'

import Image from "next/image";

type PrevSlideLang = 'it' | 'en';

export default function PrevSlide({setSlide, lang} : {setSlide:() => void, lang: PrevSlideLang}) {
    const ariaLabel = lang === 'it' ? 'Slide precedente' : 'Previous slide';

    return(
        <button aria-label={ariaLabel} className="z-10 pb-0.5 cursor-pointer absolute w-8 h-8 left-5"
                onClick={setSlide}
                id="prevBtn">
            <Image src="/icons/carousel-prev.svg" alt="" aria-hidden={true} width={48} height={48}/>
        </button>
    )
}

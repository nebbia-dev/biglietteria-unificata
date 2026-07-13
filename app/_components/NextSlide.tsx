'use client'

import Image from "next/image";

type NextSlideLang = 'it' | 'en';

export default function NextSlide({setSlide, lang} : {setSlide:() => void, lang: NextSlideLang}) {
    const ariaLabel = lang === 'it' ? 'Slide successiva' : 'Next slide';

    return(
        <button aria-label={ariaLabel} className="z-10 pb-0.5 cursor-pointer absolute w-8 h-8 right-5"
                onClick={setSlide}
                id="nextBtn">
            <Image src="/icons/carousel-next.svg" alt="" aria-hidden={true} width={48} height={48}/>
        </button>
    )
}

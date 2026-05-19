'use client'

import Image from "next/image";

export default function NextSlide({setSlide} : {setSlide:() => void}) {

    return(
        <button aria-label="Slide successiva" className="z-10 pb-0.5 cursor-pointer absolute w-8 h-8 right-5"
                onClick={setSlide}
                id="nextBtn">
            <Image src="/icons/carousel-next.svg" alt="Freccia a destra" width={48} height={48}/>
        </button>
    )
}
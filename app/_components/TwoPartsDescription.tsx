'use client'

import {useState} from "react";

export default function TwoPartsDescription({partOne, partTwo} : {partOne:string, partTwo:string}) {

    const [showPartTwo, setShowPartTwo] = useState<boolean>(false)

    return(
        <>
            <p className="text-xl lato">
                {partOne}
            </p>

            <p id="secondPart" className={`lato text-xl ${showPartTwo ? 'max-h-[1000px]' : 'max-h-0'} transition-all duration-500 overflow-hidden`}>
                {partTwo}
            </p>

            <div className="w-full text-end mt-2">
                <button type="button"
                        aria-controls="secondPart"
                        aria-expanded={showPartTwo}
                        // inert={!showPartTwo}
                        className="md:mt-4 cursor-pointer text-sm text-black text-center prime-bg rounded-full px-4 py-2"
                        onClick={() => setShowPartTwo(prev => !prev)}
                >Leggi {showPartTwo ? 'meno' : 'tutto'}</button>
            </div>

        </>
    )
}
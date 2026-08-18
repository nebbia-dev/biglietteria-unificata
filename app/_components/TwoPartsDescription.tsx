'use client'

import {useState} from "react";
import Markdown from "react-markdown";

export default function TwoPartsDescription({partOne, partTwo, lang} : {partOne:string, partTwo:string, lang:string}) {

    const [showPartTwo, setShowPartTwo] = useState<boolean>(false)

    return(
        <>
            <div className="text-xl markdown lato">
                <Markdown>
                    {partOne}
                </Markdown>
            </div>

            <div id="secondPart"
               className={`markdown lato text-xl ${showPartTwo ? 'max-h-[1000px]' : 'max-h-0'} transition-all duration-500 overflow-hidden`}>
                <Markdown>
                    {partTwo}
                </Markdown>
            </div>

            <div className="w-full text-end mt-2">
            <button type="button"
                        aria-controls="secondPart"
                        aria-expanded={showPartTwo}
                        // inert={!showPartTwo}
                        className="md:mt-4 cursor-pointer text-sm text-black text-center prime-bg rounded-full px-4 py-2"
                        onClick={() => setShowPartTwo(prev => !prev)}
                >{lang === 'it'
                    ? `Leggi ${showPartTwo ? 'meno' : 'tutto'}`
                    : `Read ${showPartTwo ? 'less' : 'more'}`}
                </button>
            </div>

        </>
    )
}
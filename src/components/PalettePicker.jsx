import { useState } from "react"
import { UniversalCom, UniversalSlide, UniversalSwitch, UniversalText } from "./universalBtns"
import { HomeBtn, CopyIcon, ChangeIcon} from "./icons"
import Chrome from '@uiw/react-color-chrome'
import chroma from 'chroma-js'
import { hsvaToHex, hexToHsva } from '@uiw/color-convert'


export function PalPickdisplay({setdisplay}) {

    const [colortype, setcolortype] = useState("Chromatic")
    const [palPointer, setPointer] = useState(null)
    const [notif, setNotif] = useState(false)
    const [hsva, setHsva] = useState({ h: 210, s: 70, v: 10, a: 1})
    const hex = hsvaToHex(hsva)

    const h = chroma(hex).hsl()[0]
    const s = chroma(hex).hsl()[1]
    const l = chroma(hex).hsl()[2]



    const Chromatic = chroma.scale(['white', hex, 'black']).colors(8);

    const complementary = [
        hex,
        chroma.hsl(h + 180, s * 0.8, l * 1.1).hex(),
        chroma.hsl(h + 180, s * 0.6, l * 0.9).hex(), 

    ]
    const analogous = [
        chroma.hsl(h - 15, s * 0.9, l * 1.1).hex(),  
        hex,                                           
        chroma.hsl(h + 15, s * 0.9, l * 0.9).hex(),
    ]

    function ColorBox({color}) {
        const [format, setFormat] = useState('hex')

        function colorDisplay() {
            if (format === 'hex') return color
            if (format === 'rgba') return chroma(color).css()
            if (format === 'hsla') return chroma(color).css('hsl')
        }
        
        
        function showNotif() {
            setNotif(true)
            setTimeout(() => setNotif(false), 2000)
        
        }
        const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(colorDisplay())
            showNotif()
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    }
        return (
            <div style={{ backgroundColor: color}} className="w-24 h-45 mr-3 rounded-2xl border border-stroke cursor-pointer flex items-end highlightTwo" onMouseEnter={() => setPointer()} onMouseLeave={() => setPointer(null)}>
                            
                            <div className="h-16 w-full bg-default borderTop opacity-95 grid grid-rows-2">
                                <div className=" h-full w-full flex justify-center items-center" >
                                                <UniversalCom icon={<CopyIcon />} iconClass={'border border-stroke rounded p-[2px] flex justify-center items-center'} clicked={() => handleCopy()} />
                                </div>
                                <div className="flex items-center justify-center">
                                    <p className="text-xs border border-stroke rounded ">{colorDisplay()}</p>
                                    
                                        <UniversalCom icon={<ChangeIcon />} clicked={() => setFormat(format === 'hex' ? 'rgba' : format === 'rgba' ? 'hsla' : 'hex')}  iconClass={' rounded p-[2px] flex justify-center items-center'} oclass={'p-0 w-5 h-5 mb-1'}/>
                                </div>
                            </div>
                        </div>
        )
    }

    
    return (
        <div className="w-full h-full grid"style={{gridTemplateRows: "64px 1fr"}}>
            <div className=' grid grid-cols-2 borderBottom'>
                <div>
                                    
                </div>
                <div className=' mr-2 flex items-center justify-end h-full'>
                    <div>
                        <UniversalCom icon={<HomeBtn />} clicked={ () => setdisplay("main")}   />
                    </div>
                                
                </div>
            </div>
            <div className="bg-surface grid grid-rows-2">
                <div className="flex justify-center items-center">
                    <div className="w-[320px] h-[290px] flex justify-center items-center border border-stroke rounded-2xl bg-default">
                        <Chrome color={hsva} onChange={(color) => setHsva(color.hsva)} style={{width: "300px", height:"270px", borderRadius: "16px", boxShadow: "none"}} className="border border-stroke" />
                    </div>
                </div>
                <div className="flex justify-center items-center bg-default borderTop">
                    <div className="absolute bg-default w-32 h-8 rounded-2xl border-2 border-stroke highlightTwo bottom-70 flex justify-center items-center " onClick={() => setcolortype(colortype === 'Chromatic' ? 'complementary' : colortype === 'complementary' ? 'analogous' : 'Chromatic')}>
                        <span className="cursor-pointer">{colortype}</span>
                    </div>
                    
                    {colortype === "Chromatic" && Chromatic.map((color, i) => (
                        <ColorBox color={color} key={i}/>
                ))}
                {colortype === "complementary" && complementary.map((color, i) => (
                        <ColorBox color={color} key={i}/>
                ))}
                {colortype === "analogous" && analogous.map((color, i) => (
                        <ColorBox color={color} key={i}/>
                ))}
                    
                </div>
            </div>
            {notif && <div className="slideUp fixed right-176 top-159 z-999">Copied!</div>}
        </div>
    )
}
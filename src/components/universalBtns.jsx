import { twMerge } from "tailwind-merge";
import * as Switch from '@radix-ui/react-switch'
import * as Slider from '@radix-ui/react-slider'
export function UniversalCom({oclass, nclass, iconClass, icon, panel, text, clicked}) {
    return (
        <div className={twMerge(`h-8 w-full pr-2 pl-2 flex justify-center items-center `, oclass)}>
            <div className={twMerge(`h-6 w-full rounded hightlight cursor-pointer flex ${panel ? "justify-end items-center pr-1" : "justify-center items-center"}`, nclass)} onClick={clicked}>
                <div className={twMerge(`h-6 w-6 z-999`, iconClass)}>{icon}</div>
                {text !== undefined && 
                <div>{text}</div>}
            </div>
        </div>
    )

}
export function UniversalText({oclass, nclass, textclass, text, clicked}) {
    return (
        <div className={twMerge('h-8', oclass)}>
            <div className={twMerge('h-4 rounded hightlight cursor-pointer flex justify-center items-center ', nclass)} onClick={clicked}>
                <span className={twMerge('text-xs', textclass)}>{text}</span>
            </div>
        </div>
    )
}
export function UniversalSwitch({boolean, setboolean, formationOne, text}) {
    return (
         <>
         {formationOne === true ? (
            <div className="grid grid-cols-2 w-full mb-4">
                <div>
                    <p className="flex items-center justify-start text-text ml-2">{text}</p>
                </div>
                <div className="flex items-center justify-end mr-2">
                    <Switch.Root checked={boolean}  onCheckedChange={setboolean} className="w-10 h-5 rounded-2xl bg-stroke data-[state=checked]:bg-[#cfd7ea]">
                        <Switch.Thumb className="block w-5 h-5 animationOne bg-hover rounded-full data-[state=checked]:translate-x-5 data-[state=checked]:bg-text"/>
                    </Switch.Root>
                </div>
            </div>) : (
            <Switch.Root checked={boolean}  onCheckedChange={setboolean} className="w-10 h-5 rounded-2xl bg-stroke data-[state=checked]:bg-[#cfd7ea]">
                <Switch.Thumb className="block w-5 h-5 animationOne bg-hover rounded-full data-[state=checked]:translate-x-5 data-[state=checked]:bg-text"/>
            </Switch.Root>)
         }
        </>
    )
}
export function UniversalSlide({text, min, max, value, onValueChange}) {
    return (
        <div className="h-full w-full flex items-center justify-center flex-col">
            <p className="w-full flex justify-center items-center text-xs">{text}</p>
            <div className="w-[80%] h-10 flex items-center justify-center">
                <Slider.Root min={min} max={max} value={[value]} onValueChange={onValueChange} className=" h-10 relative grow flex items-center justify-center">
                    <Slider.Track className=" h-3 w-full flex items-center justify-center">
                        <Slider.Range className="absolute h-3 w-full rounded-2xl bg-stroke"/>
                    </Slider.Track>
                    <Slider.Thumb className="block bg-hover rounded-full h-5 w-5 cursor-pointer"/>
                </Slider.Root>
            </div>
        </div>
    )
}
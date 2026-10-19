import { useState } from "react"
import { UniversalCom, UniversalSlide, UniversalSwitch, UniversalText } from "./universalBtns"
import { BookmarkIcon, BookMarkPlusIcon, DeleteIcon, HomeBtn } from "./icons"

export function Pwgendisplay({setdisplay}) {

    const [openBook, setBook] = useState(false)
    const [openEdit, setEdit] = useState(false)
    const [savedPW, setsvPW] = useState([])
    const [email, setEmail] = useState('')
    const [chooseApp, setChooseApp] = useState('')
    const [notif, setNotif] = useState(false)

    const [lowerC, setlowC] = useState(false)
    const [upperC, setupC] = useState(false)
    const [addNum, setNum] = useState(false)
    const [addCar, setCar] = useState(false)
    const [pwLength, setlength] = useState(8)
    

    const [disPw, setPassword] = useState("")
    function generatePass() {
        let chars = ""
        if (lowerC) chars += "abcdefghijklmnopqrstuvwxyz"
        if (upperC) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        if (addNum) chars += "1234567890"
        if (addCar) chars += "!#$"

        let password = ""
        for (let i = 0; i < pwLength; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length)
            password += chars[randomIndex]
        }
        setPassword(password)
        
    }

    function svPass() {
        
         if (!disPw.trim()) return; 

    setsvPW(prevSaved => {
        const updated = [...prevSaved, { password: disPw, id: Date.now(), email: email, inputApp: chooseApp, sensored: true}];
        
        
        console.log("svPass: ", updated); 
        
        return updated;
         });
    }

    function toggleShow(savedid) {
        return setsvPW(savedPW.map(data => 
            data.id === savedid ? { ...data, sensored: !data.sensored } : data));
    }
    function funcNotif() {
        setNotif(true) 
        setTimeout(() => setNotif(false), 2000)
    } 
    function delSaved(savedid) {
        return setsvPW(savedPW.filter(data => data.id !== savedid ))
    }
    
    console.log(email)
    return (
        <div className="w-full h-full grid"style={{gridTemplateRows: "64px 1fr"}}>
            <div className=' grid grid-cols-2 borderBottom'>
                    <div className="flex items-center justify-start">
                        <UniversalCom icon={<BookmarkIcon />}  clicked={() => setBook(!openBook)}  oclass={'w-12'}  />
                        
                    </div>
                    <div className=' mr-2 flex items-center justify-end h-full'>
                        <div>
                      <UniversalCom icon={<HomeBtn />} clicked={ () => setdisplay("main")}   />
                      </div>
                    </div>
            </div>
            <div className="flex justify-center items-center bg-surface">
                <div className={`absolute  w-[clamp(50px,400px,600px)] right-[72%] bottom-[7%] rounded-2xl  bg-default flex justify-center items-center ${openBook ? 'h-130 border border-stroke' : 'h-0'} `}>
                    <div className={`w-[clamp(20px,380px,580px)] h-122 border border-stroke rounded-2xl`}>
                        {savedPW.map(saved => (
                            <div key={saved.id} className="h-[44px] flex">
                            <div  className="border borderBottom ml-2 grid cursor-pointer w-[309px] h-[45px]" style={{gridTemplateRows: '20px 1fr'}}>
                                <div className="flex flex-row">
                                <p className="text-xs text-[#c7c7c7] mr-2">{saved.email}</p>
                                <p className="text-xs text-[#c7c7c7]">{saved.inputApp}</p>
                                </div>
                                <p onClick={() => toggleShow(saved.id)} className="w-[309px] h-[23px]">{saved.sensored === true ? "******" : saved.password}</p>
                                
                            </div>
                            <UniversalCom icon={<DeleteIcon />} oclass={'h-full w-10 flex justify-center items-center'} iconClass={'h-8 w-8'} clicked={() => delSaved(saved.id)}/>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={`absolute  w-[clamp(50px,400px,600px)] left-[72%] bottom-[50%] rounded-2xl  bg-default flex justify-center items-center ${openEdit ? 'h-56 border border-stroke' : 'h-0'} `}>
                    <div className={`w-[clamp(20px,380px,580px)] h-51 border border-stroke rounded-2xl grid`} style={{gridTemplateRows: '1fr 60px'}}>
                        <div className="flex flex-col items-center"> 
                            <input className="border border-stroke rounded w-50 h-8 mb-2 mt-2" placeholder="Eg. Instagram" onChange={(e) => setChooseApp(e.target.value)} value={chooseApp}/>
                            <input className="border border-stroke rounded w-42 h-8" placeholder="Eg. email12.gmail.com" onChange={(e) => setEmail(e.target.value)} value={email}/>
                        </div>
                        <div className="flex justify-center items-center">
                            <UniversalCom text={"Save"} oclass={`bg-text text-white rounded-2xl w-[256px] text-sm flex justify-center items-center `} iconClass={`h-0 w-0`} clicked={() => {svPass(), setEmail(''), setChooseApp(''), setPassword(''), funcNotif()}}  />
                        </div>
                    </div>
                </div>
                <div className="w-[40%] h-[85%] rounded-2xl border border-stroke bg-white flex justify-center items-end">
                    <p className="fixed bottom-[80%] text-sm">Password Generator</p>
                    <div className="w-[90%] h-[90%] rounded-2xl border border-stroke mb-4 grid place-items-center" style={{gridTemplateRows: '72px 1fr'}}>
                       <div className="h-full w-full flex justify-center items-center">
                        <div className=" rounded border border-stroke h-12 w-[60%] flex justify-center items-center bg-[#fcfcfc]">
                            <div className="">
                                <p className="text-xl text-text" >{disPw}</p>
                            </div>
                        </div>
                        <UniversalCom icon={<BookMarkPlusIcon />} oclass={'absolute left-[62.5%] w-12 flex justify-center items-center'} clicked={() => setEdit(!openEdit)} />
                       </div>
                       <div className="w-full h-full grid" style={{gridTemplateRows: '48px 1fr 64px'}}>
                            <div>
                                <UniversalSlide text={`${pwLength}`} value={pwLength} onValueChange={(v) => setlength(v[0])} min={8} max={16}   />
                            </div>
                            <div className="pt-10">
                                
                                <UniversalSwitch boolean={lowerC} setboolean={setlowC} formationOne={true} text={"LowerCase"} />
                                <UniversalSwitch boolean={upperC} setboolean={setupC} formationOne={true} text={"UpperCase"} />
                                <UniversalSwitch boolean={addNum} setboolean={setNum} formationOne={true} text={"Add numbers"} />
                                <UniversalSwitch boolean={addCar} setboolean={setCar} formationOne={true} text={"Add Characters"} />
                            </div>
                            
                            <div>
                                <UniversalText clicked={() => generatePass()} text={"Generate"}  oclass={'h-full w-full flex justify-center items-center'} nclass={'h-10 w-[80%] bg-text text-white rounded-2xl'} textclass={'text-sm'} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
                        {notif && (
                            <div className="slideUp fixed top-157 left-177">Saved!</div>
                        )}
        </div>
    )
}
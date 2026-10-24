import { useState } from 'react'
import { UniversalCom, UniversalText } from './components/universalBtns'
import { Add, Panel, ArchiveBox, SettingsIcon, EditIcon } from './components/icons'
import { Pwgendisplay } from './components/Pwgendisplay'
import { PalPickdisplay } from './components/PalettePicker'
import { NoteEditor } from './components/NotesTodo'
import { useCreateBlockNote } from '@blocknote/react'
import { BlockNoteView } from '@blocknote/mantine'


function App() {

  const [panelone, setpanelone] = useState(false)
  const [display, setdisplay] = useState("main")
  const [noteDisplay, setNote] = useState('')
  const [noteData, setNoteData] = useState([])
  const [activeNote, setActiveNote] = useState(undefined)


  function savingNote(action, data) {
  if (action === "edited") {
    setNoteData(noteData.map(notedata => notedata.id === data.id ? data : notedata))
  } else {
    setNoteData([...noteData, data])
  }
  }

  function NotePreview({content, title, tag, id, hover, data}) {
    const preview = useCreateBlockNote({
      initialContent: content,
    })
    function changeHover(dataid) {
      setNoteData(noteData.map(data => data.id === dataid ? {...data, hover: !data.hover} : data))
    }
    
    function editFunc() {
      setActiveNote(data)
      setNote('edit')
    }
    
  return (
    <div className='m-4 w-[450px]' onMouseEnter={() => changeHover(id)} onMouseLeave={() => changeHover(id)}>
      <div className=' grid border borderBottom mb-1' style={{gridTemplateColumns: "1fr 1fr"}}>
        <div className='flex flex-col'>
      <span className='text-2xl border borderLeft pl-1'>{title}</span>
      <span className='text-[#c7c7c7] pl-1'>{tag}</span>
      </div>
      <div className='flex justify-end items-center'>
        {hover && <UniversalCom icon={<EditIcon />} clicked={() => editFunc()}  />}
      </div>
      </div>
      
    <div  className='previewText cursor-pointer'>
    <BlockNoteView editor={preview} theme="light" editable={false} />
    </div>
    </div>
  )
  }


  console.log(noteData)
  return (
<div className='w-full h-full'>
  {display === "pwGen" && <Pwgendisplay setdisplay={setdisplay}  />}
  {display === "PalPick" && <PalPickdisplay setdisplay={setdisplay}   />}
  {display === "main" && 
    <div className='layout w-full h-full animationOne' style={{gridTemplateColumns: panelone ? "128px 1fr" : "64px 1fr"}}>
      <div className={`[grid-area:main] bg-surface border border-stroke rounded-tl-2xl ${noteDisplay ? '' : "flex "}`}>
        {noteDisplay === "edit" && <NoteEditor savingNote={savingNote} setNote={setNote} activeNote={activeNote} setActiveNote={setActiveNote} />}
        {noteDisplay === "preview" && noteData.map(data => {
          return <NotePreview content={data.contents} title={data.title} tag={data.tag} key={data.id} id={data.id} hover={data.hover} data={data}/>})}
      </div>
      <div className='[grid-area:side] grid grid-cols-[256px 1fr] '>
        <div className='flex flex-col items-center '>
          <div className='pt-4 pb-4 w-full borderBottom '>
            <UniversalCom icon={<Panel />} panel={panelone}  clicked={() => setpanelone(!panelone)}/>
          </div>
          <div className='mt-8 w-full'>
            <UniversalCom icon={<Add />} panel={panelone} clicked={() => setNote("edit")} />
          </div>
        </div>
          <div className='flex flex-col items-center justify-end'>
            <div className='w-full'>
              <UniversalCom icon={<ArchiveBox />} panel={panelone}/>
            </div>
            <div className='w-full pt-4 borderTop'>
              <UniversalCom icon={<SettingsIcon />} panel={panelone}/>
            </div>
          </div>
        </div>
      <div className='[grid-area:top] grid grid-cols-2'>
        <div>

        </div>
        <div className=' mr-2 flex items-center justify-end h-full'>
          <div>
            <UniversalText text={"Password Generator"} oclass={'w-32'} clicked={() => setdisplay("pwGen")}/>
          </div>
          <div>
            <UniversalText text={"Color Palette Picker"} oclass={'w-32'} clicked={() => setdisplay("PalPick")} />
          </div>
        </div>
      </div>
    </div>}
</div>
  )
}

export default App
/*

 CVS 

98bae3,5981b1,365475,15273c,020408

 CVS with # 

#98bae3,#5981b1,#365475,#15273c,#020408

 Array 

["98bae3", "5981b1", "365475", "15273c", "020408"]

 Array with # 

["#98bae3", "#5981b1", "#365475", "#15273c", "#020408"]


*/
import { useState } from 'react'
import { UniversalCom, UniversalText } from './components/universalBtns'
import { Add, Panel, ArchiveBox, SettingsIcon } from './components/icons'
import { Pwgendisplay } from './components/Pwgendisplay'
import { PalPickdisplay } from './components/PalettePicker'
import { NoteEditor } from './components/NotesTodo'
import { useCreateBlockNote } from '@blocknote/react'
import { BlockNoteView } from '@blocknote/mantine'


function App() {

  const [panelone, setpanelone] = useState(false)
  const [display, setdisplay] = useState("main")
  const [noteDisplay, setNote] = useState(false)
  const [noteData, setNoteData] = useState([])

  function NotePreview({content, key}) {
    const preview = useCreateBlockNote({
      initialContent: content,
    })

  return (
    <div key={key} className='previewText mr-4 cursor-pointer'>
    <BlockNoteView editor={preview} theme="light" editable={false} />
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
        {noteDisplay && <NoteEditor saveNote={(newnote) => setNoteData([...noteData, newnote])} setNote={setNote} />}
        {noteData.map(data => {
          console.log(data.contents)
          return <NotePreview content={data.contents} key={data.id} />})}
      </div>
      <div className='[grid-area:side] grid grid-cols-[256px 1fr] '>
        <div className='flex flex-col items-center '>
          <div className='pt-4 pb-4 w-full borderBottom '>
            <UniversalCom icon={<Panel />} panel={panelone}  clicked={() => setpanelone(!panelone)}/>
          </div>
          <div className='mt-8 w-full'>
            <UniversalCom icon={<Add />} panel={panelone} clicked={() => setNote(!noteDisplay)} />
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
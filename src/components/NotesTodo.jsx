import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { UniversalCom } from "./universalBtns";
import {BookMarkPlusIcon, DragIcon } from "./icons";
import { Rnd } from 'react-rnd'
import { useState } from "react";

export function NoteEditor({savingNote, setNote, activeNote, setActiveNote}) {
    const defaultContent = [{type: "heading", content: "Note & Todolist"}, {type: "checkListItem", props: {checked: false}, content: "you can add Lists!"}, {type: "paragraph", content: "the extended when you add more notes"}, {type: "paragraph"}]
    const editor = useCreateBlockNote({
        initialContent: activeNote ? activeNote.contents : defaultContent
    })
    const [title, setTitle] = useState(activeNote?.title || '')
    const [tag, setTag] = useState(activeNote?.tag || '')

    function functSave() {
      const content = editor.document
      
      if (activeNote) {
        savingNote("edited", {contents: content, id: activeNote.id, title: title, tag: tag, hover: false})
      } else {
        savingNote("new", {contents: content, id: Date.now(), title: title, tag: tag, hover: false})
      }

      setNote('preview')
      console.log(content)
    }
    console.log("activeNote:", activeNote)
    return (
    <div className={'grid relative w-full h-full'} style={{ padding: "20px", margin: "0 auto", gridTemplateColumns: "1fr 68px"}}>
      <div className="w-[99%] ">
      <BlockNoteView editor={editor} theme="light" />
      
      </div>
      <Rnd default={{ x: 1150, y: 50, width: 400, height: 256 }}>
        <div className=" z-999 grid w-full h-full bg-surface border border-stroke rounded-2xl p-4  fixed bottom-8" style={{gridTemplateRows: "42px 1fr"}}>
          <div className="">
            <UniversalCom icon={<DragIcon />} oclass={'mt-3'}/>
          </div>
          <div className="flex flex-col ">
            <input placeholder="Title..." className="border borderBottom mb-4" onChange={(e) => setTitle(e.target.value)} value={title}/>
            <input placeholder="#Tag..." className="border borderBottom" onChange={(e) => setTag(e.target.value)} value={tag}/>
          </div>
        </div>
      </Rnd>
      <div className="bg-default h-full border border-stroke rounded-2xl flex justify-center">
      <UniversalCom icon={<BookMarkPlusIcon />} oclass={'mt-4 bg-text text-white rounded-[12px] w-[95%]'} iconClass={`w-8 h-8 flex items-center justify-center`} nclass={`flex items-center justify-center`} clicked={() => functSave()}/>
      </div>
    </div>
  );
}
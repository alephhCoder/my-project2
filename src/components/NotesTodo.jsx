import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { UniversalCom } from "./universalBtns";
import {BookMarkPlusIcon } from "./icons";
import Draggable from 'react-draggable'

export function NoteEditor({saveNote, setNote}) {
    const editor = useCreateBlockNote({
        initialContent: [{type: "heading", content: "Note & Todolist"}, {type: "checkListItem", props: {checked: false}, content: "you can add Lists!"}, {type: "paragraph", content: "the extended when you add more notes"}, {type: "paragraph"}]
    })

    function functSave() {
      const content = editor.document
      
      saveNote({contents: content, id: Date.now(),})

      setNote(false)
      console.log(content)
    }
    
    return (
    <div className={'grid relative'} style={{ padding: "20px", margin: "0 auto", width: "100%", height: "100%", gridTemplateColumns: "1fr 68px"}}>
      <div className="w-[99%] ">
      <BlockNoteView editor={editor} theme="light" />
      
      </div>
      <Draggable>
        <div className="w-32 h-32 bg-surface border border-stroke rounded p-4 cursor-grab fixed bottom-8">

        </div>
      </Draggable>
      <div className="bg-default h-full border border-stroke rounded-2xl flex justify-center">
      <UniversalCom icon={<BookMarkPlusIcon />} oclass={'mt-4 bg-text text-white rounded-[12px] w-[95%]'} iconClass={`w-8 h-8 flex items-center justify-center`} nclass={`flex items-center justify-center`} clicked={() => functSave()}/>
      </div>
    </div>
  );
}
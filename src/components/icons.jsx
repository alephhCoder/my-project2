import {CirclePlus, Columns2, Archive, Settings, House, Copy, ArrowDownUp, Bookmark, BookmarkPlus, X, GripHorizontal, Pencil} from 'lucide-react'

export function Add() {
    return <CirclePlus color='#c7c7c7' className='w-6 h-6'/>
}
export function Panel() {
    return <Columns2 color='#c7c7c7' strokeWidth={1.5}/>
}
export function ArchiveBox() {
    return <Archive color='#c7c7c7'/>
}
export function SettingsIcon() {
    return <Settings color='#c7c7c7' strokeWidth={2}/>
}
export function HomeBtn() {
    return <House color='#c7c7c7' strokeWidth={2}/>
}
export function CopyIcon() {
    return <Copy color='#c7c7c7' strokeWidth={2}/>
}
export function ChangeIcon() {
    return <ArrowDownUp color='#c7c7c7' strokeWidth={2}/>
}
export function BookmarkIcon() {
    return <Bookmark color='#c7c7c7' strokeWidth={2}/>
}
export function BookMarkPlusIcon() {
    return <BookmarkPlus color='#c7c7c7' strokeWidth={2}/>
}
export function DeleteIcon() {
    return <X color='#c7c7c7' strokeWidth={2}/>
}
export function DragIcon() {
    return <GripHorizontal color='#c7c7c7' strokeWidth={2}/>
}
export function EditIcon() {
    return <Pencil color='#c7c7c7' strokeWidth={2}/>
}
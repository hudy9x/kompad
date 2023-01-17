import { Outline, useOutlineStore } from "../../store/outlines"

export const OutlineList = () => {
 const { outlineList } = useOutlineStore();

 const arrangeOutline = (value: Outline) => {
  switch(value.level) {
   case 'h2':
    return (
     <a className='pl-3 block' href={`#${value.title}`} >{value.title}</a>
    )
   case 'h3':
    return (
     <a className='pl-5 block' href={`#${value.title}`} >{value.title}</a>
    )
   case 'h4':
    return (
     <a className='pl-9 block' href={`#${value.title}`} >{value.title}</a>
    )
  }
 }

 return (
  <>
   {outlineList.map((value) => {
    return arrangeOutline(value)
   })}
  </>
 )
}
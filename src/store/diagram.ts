import create from "zustand";
import produce from "immer";

export interface IDiagram {
 isPreview: boolean,
 setIsPreview: () => void,
}

export const useDiagramStore = create<IDiagram>((set) => ({
 isPreview: false,
 setIsPreview: () => {
   set(
     produce<IDiagram>((state) => {
       state.isPreview = !state.isPreview;
     })
   )
 },
}))

export const { setState: setIsPreview } = useDiagramStore

import { Editor } from "@tiptap/react";
import { listen } from '@tauri-apps/api/event'
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { getFileUrl, uploadFileToPad } from "../../services/files";
import { useEffect } from "react"
import { message } from "../message";


function loadXHR(url: string) {
  return new Promise<Blob>(function(resolve, reject) {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.onerror = function() { reject("Network error.") };
      xhr.onload = function() {
        if (xhr.status === 200) { resolve(xhr.response) }
        else { reject("Loading error:" + xhr.statusText) }
      };
      xhr.send();
    }
    catch (err) {
      console.log(err)
    }
  });
}

interface Props {
  id: string
  editor: Editor
}

export default function PadDropZone({ id, editor }: Props) {

  const toggleDragOverEffect = () => {
    const box = document.querySelector('.tiptap-box')
    if (!box) return;

    box.classList.toggle('is-dragging-over')
  }

  useEffect(() => {
    const unlisten = listen('tauri://file-drop-hover', () => {
      toggleDragOverEffect()
    })


    const unlisten2 = listen('tauri://file-drop-cancelled', () => {
      toggleDragOverEffect()
    })

    return () => { 
      unlisten.then(f => f());
      unlisten2.then(f => f());
    }
  }, [])

  useEffect(() => {
    const unlisten = listen('tauri://file-drop', (event: any) => {
      const src = convertFileSrc(event.payload[0])
      const url = new URL(src)
      const splittedPath = decodeURI(url.pathname).split('\\');
      const name = splittedPath[splittedPath.length - 1];

      if (["jpg", "jpeg", "png", "gif"].indexOf(name.toLowerCase()) === -1) {
        message.error("Only accept images")
        return;
      }

      loadXHR(src).then(blob => {
        const size = blob.size / 1024 / 1024; // MB

        if (size >= 3) {
          message.error("The image size exceeds 3mb. Please attach a smaller image")
          return;
        }

        const randomID = new Date().getTime()

        uploadFileToPad(`${randomID}-${name}`, blob).then((res) => {
          getFileUrl(res).then(src => {
            editor.chain()
              .focus()
              .setImage({ src })
              .run()
          })
        }).catch(() => {
        })
      });
    })

    return () => { unlisten.then(f => f()) }

  }, [id, editor])

  return <></>

}

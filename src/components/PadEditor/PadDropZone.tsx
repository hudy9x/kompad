import { Editor } from "@tiptap/react";
import { listen } from '@tauri-apps/api/event'
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { getFileUrl, uploadFileToPad } from "../../services/files";
import { useEffect } from "react"


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

  useEffect(() => {
    const unlisten = listen('tauri://file-drop', (event: any) => {
      const src = convertFileSrc(event.payload[0])
      loadXHR(src).then(blob => {
        const url = new URL(src)
        const splittedPath = decodeURI(url.pathname).split('\\');
        const name = splittedPath[splittedPath.length - 1]

        uploadFileToPad(`pad-${id}/${name}`, blob).then((res) => {
          console.log(res)
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

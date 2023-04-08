import { appWindow } from "@tauri-apps/api/window"
import { useState } from "react"
import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
  VscChromeRestore,
} from "react-icons/vsc"

function TitlebarAction() {
  const [isMaximize, setIsMaximize] = useState(false)

  const onMaximize = () => {
    console.log("onMaximize")
    setIsMaximize(true)
    appWindow.toggleMaximize()
  }
  const onRestore = () => {
    console.log("onRestore")
    setIsMaximize(false)
    appWindow.toggleMaximize()
  }

  const onClose = () => {
    appWindow.close()
  }

  const onMinimize = () => {
    appWindow.minimize()
  }

  return (
    <div className="flex items-center">
      <span onClick={onMinimize} className="ttb-icon ttb-min">
        <VscChromeMinimize />
      </span>
      {!isMaximize && (
        <span onClick={onMaximize} className="ttb-icon ttb-max">
          <VscChromeMaximize />
        </span>
      )}

      {isMaximize && (
        <span onClick={onRestore} className="ttb-icon ttb-restore">
          <VscChromeRestore />
        </span>
      )}

      <span onClick={onClose} className="ttb-icon ttb-close">
        <VscChromeClose />
      </span>
    </div>
  )
}

export default TitlebarAction

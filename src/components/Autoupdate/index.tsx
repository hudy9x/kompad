import { useEffect, useState } from "react"
import { relaunch } from "@tauri-apps/api/process"
import { emit, listen } from "@tauri-apps/api/event"
import Modal from "../Modal"
import { IoInformationOutline } from "react-icons/io5"
import { useModalStore } from "../../store/modal"
import { message } from "../message"
import DownloadProgress from "./DownloadProgress"

function Autoupdate() {
  const updateStatus = useModalStore((state) => state.modals.update)
  const setUpdateStatus = useModalStore((state) => state.setVisible)

  const [visible, setVisible] = useState(false)
  const [dlvisible, setDlVisible] = useState(false)

  useEffect(() => {
    setVisible(updateStatus)
  }, [updateStatus])

  useEffect(() => {
    setUpdateStatus("update", visible)

    // eslint-disable-next-line
  }, [visible])

  useEffect(() => {
    let e = ""
    listen<{ error: string | null; status: string }>(
      "tauri://update-status",
      function (res) {
        const { error, status } = res.payload
        if (error) {
          if (e === error) {
            return
          }

          console.log(error)
          message.error(error)
          e = error

          return
        }

        if (status === "UPTODATE") {
          // message.info("App version is latest !");
          return
        }

        if (status === "DOWNLOADED") {
          // message.info("Downloaded")
        }

        if (status === "DONE") {
          // message.success("Done")
          relaunch()
        }

        console.log(status)
      }
    )
  })

  const doUpdate = () => {
    setDlVisible(true)
    setVisible(false)
    setTimeout(() => {
      emit("tauri://update-install")
    }, 800)
  }

  return (
    <>
      <Modal visible={dlvisible} setVisible={setDlVisible}>
        <DownloadProgress />
      </Modal>
      <Modal visible={visible} setVisible={setVisible}>
        <div className="sm:flex sm:items-start w-80">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
            <IoInformationOutline
              className="h-6 w-6 text-blue-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg leading-6 font-medium">
              New update available
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                An update to the latest version is available. Would you like to
                install it now ?
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:ml-10 sm:pl-4 sm:flex">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={doUpdate}
          >
            Update
          </button>
          <button
            type="button"
            className="btn btn-lg ml-4"
            onClick={() => setVisible(false)}
            // ref={cancelButtonRef}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  )
}

export default Autoupdate

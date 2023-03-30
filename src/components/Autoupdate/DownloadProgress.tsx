import { listen } from "@tauri-apps/api/event"
import { useEffect, useState } from "react"
import { logg } from "../../libs/log"

export default function DownloadProgress() {
  const [size, setsize] = useState({
    contentLength: 0,
    chunkLength: 0,
  })

  useEffect(() => {
    listen("tauri://update-download-progress", (res) => {
      logg.info("downloading", { payload: JSON.stringify(res.payload) })

      const payload = res.payload as {
        chunkLength: number
        contentLength: number
      }

      setsize((size) => ({
        ...size,
        ...{
          chunkLength: size.chunkLength + payload.chunkLength,
          contentLength: size.contentLength,
        },
      }))
    })
  }, [])

  return (
    <div className="sm:flex sm:items-start w-80 flex-col justify-center">
      <div className="mx-auto text-center space-y-3 ">
        <h3 className="text-lg leading-6 font-medium">
          Downloading new version
        </h3>
        <p className="text-sm text-gray-500">
          Please do not close the app as the download process will take some
          time to complete
        </p>
        <svg
          className="animate-spin h-5 w-5 text-white inline-flex"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        {size.chunkLength && size.contentLength ? (
          <p>
            {size.chunkLength}/{size.contentLength}
          </p>
        ) : null}
      </div>
    </div>
  )
}

import { listen } from "@tauri-apps/api/event"
import { useEffect, useState } from "react"
// import { logg } from "../../libs/log"
import { toMb } from "../../libs/utils"
import checkPng from "../../assets/check.png"

export default function DownloadProgress() {
  const [size, setsize] = useState({
    contentLength: 0,
    chunkLength: 0,
  })

  useEffect(() => {
    listen("tauri://update-download-progress", (res) => {
      // logg.info("downloading", { payload: JSON.stringify(res.payload) })

      const payload = res.payload as {
        chunkLength: number
        contentLength: number
      }

      setsize((size) => ({
        ...size,
        ...{
          chunkLength: size.chunkLength + payload.chunkLength,
          contentLength: payload.contentLength,
        },
      }))
    })

    // used for testing

    // setInterval(() => {
    //   setsize((size) => ({
    //     ...size,
    //     ...{
    //       chunkLength: size.chunkLength + 16384,
    //       contentLength: 2286360,
    //     },
    //   }))
    // }, 550)
  }, [])

  let percent =
    size.contentLength === 0 ? 0 : (size.chunkLength / size.contentLength) * 100
  percent = percent <= 100 ? (percent < 0 ? 0 : percent) : 100

  console.log(percent, size)

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
        <img
          src={checkPng}
          className={`w-14 h-14 mx-auto ${percent >= 100 ? "block" : "hidden"}`}
          alt="dowloadn-progress"
        />
        <div className={`space-y-3 ${percent < 100 ? "" : "hidden"}`}>
          <div className={`relative w-52 h-2 rounded bg-gray-900 mx-auto mt-3`}>
            <div
              className="absolute top-0 left-0 h-full rounded-sm bg-green-400"
              style={{ width: `${percent}%` }}
            ></div>
          </div>
          <p className="text-sm flex items-center gap-2 justify-center">
            <svg
              className="animate-spin h-3 w-3 text-white inline-flex"
              style={{ animationDuration: "0.6s" }}
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
            <span>
              {toMb(size.chunkLength)}/{toMb(size.contentLength, 2)} Mb
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

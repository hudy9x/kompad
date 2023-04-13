import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"
import { HiOutlinePaperClip } from "react-icons/hi"
import {
  MdBattery20,
  MdBattery30,
  MdBattery50,
  MdBattery60,
  MdBattery80,
  MdBattery90,
  MdBatteryFull,
} from "react-icons/md"
import Button from "../../components/Button"
import ScrollBar from "../../components/ScrollBar"
import { getAllFileByUser, IFile } from "../../services/files"
import { getCurrentStorageSize, MAX_STORAGE_SIZE } from "../../services/plans"

const generateIconByRatio = (percent: number) => {
  const icons = [] // 0: remaining  1: used
  const size = "w-12 h-12"
  const colors = [
    "text-green-400",
    "text-yellow-300",
    "text-red-400",
    "text-gray-100",
  ]

  console.log(percent)
  if (percent === 0) {
    icons[0] = <MdBatteryFull className={`${size} ${colors[2]}`} />
    icons[1] = <MdBatteryFull className={`${size} ${colors[2]}`} />
  } else if (0 < percent && percent <= 10) {
    icons[0] = <MdBattery20 className={`${size} ${colors[2]}`} />
    icons[1] = <MdBattery80 className={`${size} ${colors[2]}`} />
  } else if (10 < percent && percent <= 20) {
    icons[0] = <MdBattery20 className={`${size} ${colors[1]}`} />
    icons[1] = <MdBattery80 className={`${size} ${colors[1]}`} />
  } else if (20 < percent && percent <= 30) {
    icons[0] = <MdBattery20 className={`${size} ${colors[1]}`} />
    icons[1] = <MdBattery80 className={`${size} ${colors[1]}`} />
  } else if (30 < percent && percent <= 50) {
    icons[0] = <MdBattery30 className={`${size} ${colors[0]}`} />
    icons[1] = <MdBattery60 className={`${size} ${colors[0]}`} />
  } else if (50 < percent && percent <= 60) {
    icons[0] = <MdBattery50 className={`${size} ${colors[0]}`} />
    icons[1] = <MdBattery50 className={`${size} ${colors[0]}`} />
  } else if (60 < percent && percent <= 80) {
    icons[0] = <MdBattery80 className={`${size} ${colors[0]}`} />
    icons[1] = <MdBattery20 className={`${size} ${colors[0]}`} />
  } else if (80 < percent && percent <= 99) {
    icons[0] = <MdBattery90 className={`${size} ${colors[0]}`} />
    icons[1] = <MdBattery20 className={`${size} ${colors[0]}`} />
  } else {
    icons[0] = <MdBatteryFull className={`${size} ${colors[0]}`} />
    icons[1] = <MdBatteryFull className={`${size} text-green-200`} />
  }

  return icons
}

const FileManager = () => {
  const [files, setFiles] = useState<IFile[]>([])
  const [size, setSize] = useState(0)
  const [next, setNext] = useState<QueryDocumentSnapshot<DocumentData> | null>(
    null
  )
  const [end, setEnd] = useState(false)

  const viewMore = () => {
    loadFile()
  }

  const loadFile = useCallback(() => {
    console.log("=======================")
    console.log("next", next)
    if (end) return

    getAllFileByUser(next || undefined).then((res) => {
      const { lastDoc, data } = res
      setFiles((prev) => [...prev, ...data])
      setNext(lastDoc)
      setEnd(true)
    })
  }, [next, end])

  const getStorageSize = () => {
    getCurrentStorageSize().then((size) => {
      setSize(size)
    })
  }

  useEffect(() => {
    loadFile()
    getStorageSize()
    // eslint-disable-next-line
  }, [])

  const remainingSize = (MAX_STORAGE_SIZE - size).toFixed(2)
  const remainingSizeRatio = Math.ceil(
    (+remainingSize / MAX_STORAGE_SIZE) * 100
  )
  const icons = generateIconByRatio(remainingSizeRatio)

  return (
    <div className="shadow border border-color-base sm:rounded-md sm:overflow-hidden">
      <div className="advanced-setting-card px-0">
        <div className="flex items-center justify-around border-b border-color-base pb-4">
          <div className="box flex items-center gap-2">
            {icons[0]}
            <div>
              <h2 className="title">Remaining</h2>
              <p className="text-2xl font-extrabold">{remainingSize}mb</p>
            </div>
          </div>
          <div className="box flex items-center gap-2">
            {icons[1]}
            <div>
              <h2 className="title">Used</h2>
              <p className="text-2xl font-extrabold">{size.toFixed(2)}mb</p>
            </div>
          </div>
        </div>
        <div className="px-6 space-y-3">
          <ScrollBar height="500px">
            <div className="space-y-2">
              {files.map((file) => {
                return (
                  <div
                    key={file.id}
                    className="file-item flex items-center gap-2"
                  >
                    <HiOutlinePaperClip />
                    <span className="text-xs">{file.name}</span>
                    <small className="bg-light rounded-full min-w-[50px] shrink-0 px-2 py-0.5 text-2xs">
                      {file.size.toFixed(2)} mb
                    </small>
                  </div>
                )
              })}
            </div>
          </ScrollBar>

          {end ? null : <Button onClick={viewMore}>View more file</Button>}
        </div>
      </div>
    </div>
  )
}

export default FileManager

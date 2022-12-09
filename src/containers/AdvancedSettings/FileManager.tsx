import { useEffect } from "react"
import { getAllFileByUser } from "../../services/files"

export default function FileManager() {

  useEffect(() => {
    getAllFileByUser().then(res => {
      console.log(res)
    })
  }, [])

  return <div className="shadow border border-color-base sm:rounded-md sm:overflow-hidden">
    <div className="advanced-setting-card">
      somethign else
    </div>
  </div> 
}

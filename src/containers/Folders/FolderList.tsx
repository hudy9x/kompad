import { useCacheQuery } from "../../hooks/useCacheQuery"
import { getFolders, IFolder } from "../../services/folders"
import { QUERY_FOLDER, QUERY_FOLDER_FIELD, QUERY_FOLDER_TIME } from "../../services/query-cache"
import { useFolderStore } from "../../store/folder"
import FolderItem from "./FolderItem"

function FolderList() {
  const { folders, updateFolders } = useFolderStore()

  useCacheQuery<IFolder[]>({
    queryName: QUERY_FOLDER,
    queryTimeName: QUERY_FOLDER_TIME,
    updateDatas: (data) => updateFolders(data),
    getDatas: getFolders,
    queryCounterField: QUERY_FOLDER_FIELD,
  })

  return (
    <>
      {folders.map((folder) => {
        return <FolderItem key={folder.id} folder={folder} />
      })}
    </>
  )
}

export default FolderList

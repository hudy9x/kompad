import { Unsubscribe } from "firebase/firestore";
import { useEffect } from "react";
import { BsFolder } from "react-icons/bs";
import { HiX } from "react-icons/hi";
import { useAuth } from "../../hooks/useAuth";
import { delFolder, watchFolders } from "../../services/folders";
import { useFolderStore } from "../../store/folder";

function FolderList() {
  const { user } = useAuth();
  const { folders, updateFolders } = useFolderStore();
  const onDelete = (id: string) => {
    delFolder(id);
  };

  useEffect(() => {
    let unsub: Unsubscribe | null;
    if (user) {
      unsub = watchFolders((err, data) => {
        console.log(err);
        if (err) {
          return;
        }

        updateFolders(data);
      });
    }

    return () => {
      unsub && unsub();
    };
    // eslint-disable-next-line
  }, [user]);

  return (
    <>
      {folders.map((folder) => {
        return (
          <div
            key={folder.id}
            className="flex items-center justify-between group cursor-pointer"
          >
            <div className="sec-item" key={folder.id}>
              <BsFolder style={{ color: folder.color }} />
              <span>{folder.title}</span>
            </div>
            <HiX
              onClick={() => onDelete(folder.id || "")}
              className="mr-5 group-hover:block hidden text-gray-400"
            />
          </div>
        );
      })}
    </>
  );
}

export default FolderList;

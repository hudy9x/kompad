import { HiX } from "react-icons/hi";
import { message } from "../../components/message";
import { delFolderByPadId } from "../../services/pads";

function FolderDelete({ pid, className }: { pid: string; className?: string }) {
  return (
    <HiX
      className={`folder-del cursor-pointer bg-gray-100 text-gray-400 hover:text-gray-700 h-3 ${className}`}
      onClick={async () => {
        const result = await delFolderByPadId(pid);
        if (!result) {
          message.error("Delete tag error !");
        }
      }}
    />
  );
}

export default FolderDelete;

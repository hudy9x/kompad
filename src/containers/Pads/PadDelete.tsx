import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { delPad } from "../../services/pads";
import { usePadStore } from "../../store";
import { message } from "../../components/message";

function PadDelete({ id }: { id: string }) {
  const [deleting, setDeleting] = useState(false);
  const setNeedToUpdate = usePadStore((state) => state.setNeedToUpdate);

  return (
    <HiOutlineTrash
      onClick={async () => {
        if (deleting) {
          message.warning("The pad is in deleting process");
          return;
        }

        setDeleting(true);
        await delPad(id);
        setNeedToUpdate();
        setDeleting(false);
        message.success("Deleted pad successfully");
      }}
      className="w-8 h-8 p-2 rounded-md text-white hover:bg-gray-800"
    />
  );
}

export default PadDelete;

import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { delPad } from "../../services/pads";
import { usePadStore } from "../../store";
import { message } from "../../components/message";
import { decreasePlanRecord } from "../../services/plans";
import { useNavigate } from "react-router-dom";

function PadDelete({ id }: { id: string }) {
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
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
        await decreasePlanRecord();

        setNeedToUpdate();
        setDeleting(false);
        navigate("/app/pad/");
        message.success("Deleted pad successfully");
      }}
      className="w-7 h-7 p-1.5 rounded-md text-gray-600 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800"
    />
  );
}

export default PadDelete;

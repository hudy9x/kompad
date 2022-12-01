import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { delPad } from "../../services/pads";
import { usePadStore } from "../../store";
import { message } from "../../components/message";
import { decreasePlanRecord } from "../../services/plans";
import { useNavigate } from "react-router-dom";
import { deleteAllImageInOnePad } from "../../services/files";

export const PadDelete = ({ idx }: { idx: string }) => {
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const setNeedToUpdate = usePadStore((state) => state.setNeedToUpdate);

  const handleDeleteItem = async () => {
    if (deleting) {
      message.warning("The pad is in deleting process");
      return;
    }

    setDeleting(true);

    console.log('owiejroiwjeroij')
    await Promise.all([delPad(idx), deleteAllImageInOnePad(idx)]);
    // await Promise.all([deleteAllImageInOnePad(idx)]);
    await decreasePlanRecord();

    setNeedToUpdate();
    setDeleting(false);
    navigate("/app/pad/");
    message.success("Deleted pad successfully");
  }
  return (
    <a
      href="#delete"
      className="group dropdown-content flex items-center px-4 py-2 text-sm"
      onClick={handleDeleteItem}
    >
      <HiOutlineTrash
        aria-hidden="true"
        className="dropdown-icon"
      />
      <span className="dropdown-text">Delete</span>
    </a>
  )
}

export default PadDelete;

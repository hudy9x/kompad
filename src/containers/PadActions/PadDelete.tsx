import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { delPad } from "../../services/pads";
import { usePadStore } from "../../store";
import { message } from "../../components/message";
import { decreasePlanRecord } from "../../services/plans";
import { useNavigate } from "react-router-dom";
import { deleteAllImageInOnePad } from "../../services/files";
import { confirmDanger } from "../../components/Confirm";

export const PadDelete = ({ idx }: { idx: string }) => {
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const setNeedToUpdate = usePadStore((state) => state.setNeedToUpdate);

  const yes = async () => {
    if (deleting) {
      message.warning("The pad is in deleting process");
      return;
    }

    setDeleting(true);

    await Promise.all([delPad(idx), deleteAllImageInOnePad(idx)]);
    // await Promise.all([deleteAllImageInOnePad(idx)]);
    await decreasePlanRecord();

    setNeedToUpdate();
    setDeleting(false);
    navigate("/app/pad/");
    message.success("Deleted pad successfully");
  }

  const handleDeleteItem = () => {
    confirmDanger({
      title: 'Delete this note',
      desc: 'Are you sure to delete this note ? All of your content will be delete permanently removed from our servers. This action cannot be undone.',
      yes: yes,
    });
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

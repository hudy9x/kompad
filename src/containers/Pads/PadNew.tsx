import { HiOutlinePlus } from "react-icons/hi";
import Button from "../../components/Button";
import { usePadStore } from "../../store";
import PadNewModal from "./PadNewModal";

function PadNew() {
  const openPadModal = usePadStore((state) => state.setNewPadModalStatus);

  const createNewPad = async () => {
    openPadModal(true);
  };

  return (
    <div className="">
      <Button onClick={createNewPad} size="px-2 py-2">
        <HiOutlinePlus className="h-3" aria-hidden="true" />
      </Button>
      <PadNewModal />
    </div>
  );
}

export default PadNew;

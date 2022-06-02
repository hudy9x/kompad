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
    <div className="px-4 pb-4 border-b border-gray-200 dark:border-gray-900">
      <Button block onClick={createNewPad}>
        <HiOutlinePlus className="-ml-5 mr-2 h-5 w-5" aria-hidden="true" />
        <span>New pad</span>
      </Button>
      <PadNewModal />
    </div>
  );
}

export default PadNew;

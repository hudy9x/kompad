import { HiOutlinePlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { addPad } from "../../services/pads";

function PadNew() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const createNewPad = async () => {
    if (!user || !user.uid) return;
    const id = await addPad(user.uid);
    navigate(`/app/pad/${id}`);
  };
  return (
    <div className="px-4 pb-4 border-b border-gray-200">
      <Button onClick={createNewPad}>
        <HiOutlinePlus className="-ml-5 mr-2 h-5 w-5" aria-hidden="true" />
        <span>New pad</span>
      </Button>
    </div>
  );
}

export default PadNew;

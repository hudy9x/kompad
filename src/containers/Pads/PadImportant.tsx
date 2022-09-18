import { message } from "../../components/message";
import { HiOutlineStar } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { importantPad, statusImporantPad } from "../../services/pads";
export const PadImportant = ({ id,statusImportant }: { id: string;statusImportant: boolean}) => {
  const navigate = useNavigate();
  return (
    <HiOutlineStar
      onClick={async () => {
        await importantPad(id);
        const notifyImportant = await statusImporantPad(id);
        navigate("/app/pad/");
        if (notifyImportant) {
          message.success("Important pad successfully");
        } else {
          message.error("Remove important");
        }
      }}
      style={statusImportant ? {color:"red"} : {color: "#4B5563"}}
      className="w-7 h-7 p-1.5 rounded-md text-gray-600 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800"
    />
  );
};

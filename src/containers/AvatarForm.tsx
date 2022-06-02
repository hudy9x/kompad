import { useEffect, useState } from "react";
import { getAllPublicAvatars } from "../services/files";
import Modal from "../components/Modal";
// import { getAllPublicAvatars } from "../../services/files";

interface IAvatarFormProps {
  defaultValue?: string;
  onSelect: (selected: string) => void;
}

function AvatarForm({
  onSelect,
  defaultValue = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
}: IAvatarFormProps) {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const [publicAvatars, setPublicAvatars] = useState<string[]>([]);

  useEffect(() => {
    getAllPublicAvatars().then((publicAvatars) => {
      setPublicAvatars(publicAvatars);
    });
  }, []);

  useEffect(() => {
    setSelected(defaultValue);
  }, [defaultValue]);

  return (
    <div>
      <img
        onClick={() => setVisible(true)}
        className="inline-block h-14 w-14 rounded-md shadow-md cursor-pointer border-2 border-transparent hover:border-white"
        src={selected}
        alt=""
      />

      <Modal visible={visible} setVisible={setVisible}>
        <div className="flex gap-3 flex-wrap">
          {publicAvatars.map((avatar, index) => {
            const selectedStatus = avatar === selected ? "selected-avatar" : "";
            return (
              <div
                key={index}
                onClick={() => setSelected(avatar)}
                className="h-14 w-14 flex-shrink-0 cursor-pointer group"
              >
                <img
                  className={`inline-block w-full h-full rounded-md outline outline-offset-2 outline-2 outline-gray-50 opacity-90 group-hover:opacity-100 ${selectedStatus}`}
                  src={avatar}
                  alt=""
                />
              </div>
            );
          })}
        </div>
        <div className="mt-5 sm:mt-6">
          <button
            type="button"
            onClick={() => {
              onSelect(selected);
              setVisible(false);
            }}
            className="inline-flex w-full justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Select it
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default AvatarForm;

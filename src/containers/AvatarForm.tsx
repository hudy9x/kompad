import { useEffect, useState } from "react";
import { getAllPublicAvatars } from "../services/files";
import Modal from "../components/Modal";
import { OutsideClickHandler } from "../components/OutsideClickHandler";

// import { getAllPublicAvatars } from "../../services/files";

interface IAvatarFormProps {
  defaultValue?: string;
  onSelect: (selected: string) => void;
}

function AvatarForm({
  onSelect,
  defaultValue = "",
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

  const onOutsideClick = () => {
    setSelected(defaultValue);
  }

  return (
    <div>
      <img
        onClick={() => setVisible(true)}
        className="inline-block h-14 w-14 bg-zinc-600 rounded-md shadow-md cursor-pointer hover:opacity-90"
        src={selected}
        title="Your avatar here"
        alt=""
      />

      <Modal visible={visible} setVisible={setVisible}>
        <OutsideClickHandler onOutsideClick={onOutsideClick}>
          <div className="flex gap-3 flex-wrap w-[260px]">
            {publicAvatars.map((avatar, index) => {
              const selectedStatus = avatar === selected ? "selected-avatar" : "";
              return (
                <div
                  key={index}
                  onClick={() => setSelected(avatar)}
                  className="h-14 w-14 flex-shrink-0 cursor-pointer group"
                >
                  <img
                    className={`inline-block w-full h-full rounded-md outline outline-offset-2 outline-2 outline-transparent opacity-90 group-hover:opacity-100 ${selectedStatus}`}
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
              className="btn btn-lg btn-block"
            >
              Select it
            </button>
          </div>
        </OutsideClickHandler>
      </Modal>
    </div>
  );
}

export default AvatarForm;

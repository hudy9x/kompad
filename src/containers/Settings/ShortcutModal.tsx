import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { useModalStore } from "../../store/modal";

function ShortcutModal() {
  const shortcutStatus = useModalStore((state) => state.modals.shorcut);
  const setShortcurVisible = useModalStore((state) => state.setVisible);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(shortcutStatus);
  }, [shortcutStatus]);

  useEffect(() => {
    setShortcurVisible("shorcut", visible);
    // eslint-disable-next-line
  }, [visible]);

  const shortcutKeys = [
    { title: "Show / hide side bar", kbds: ["Ctrl", "Shift", "B"] },
    { title: "Create new pad", kbds: ["Ctrl", "N"] },
    { title: "Open search palette", kbds: ["Alt", "P"] },
  ];

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <div id="shorcut-wrapper" className="w-80">
        <h2 className="text-lg mb-4">Shortcut keys</h2>
        <div className="shorcut-container max-h-64 overflow-auto">
          {shortcutKeys.map((shortcut, index) => {
            return (
              <div
                key={index}
                className="flex justify-between items-center text-sm py-1"
              >
                <h4>{shortcut.title}</h4>
                <div className="kbds flex items-center gap-2">
                  {shortcut.kbds.map((kbd) => (
                    <kbd
                      className="kbd-btn"
                      key={kbd}
                    >
                      {kbd}
                    </kbd>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}

export default ShortcutModal;

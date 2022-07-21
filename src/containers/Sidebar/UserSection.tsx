import { getVersion } from "@tauri-apps/api/app";
import { emit, listen } from "@tauri-apps/api/event";
import { useEffect, useState } from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { showUpdateModal } from "../../store/modal";
import Settings from "../Settings";

function UserSection() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [version, setVersion] = useState("");
  const { info } = useCurrentUser();

  const openUpdateModal = () => {
    if (updateAvailable) {
      showUpdateModal();
    }
  };

  useEffect(() => {
    getVersion().then((version) => {
      setVersion(version);
    });

    listen("tauri://update-available", function (res) {
      console.log('tauri://update-available', res)
      setUpdateAvailable(true);
    });

    emit("tauri://update");
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 px-4 py-3 border-t border-t-gray-200 dark:border-t-gray-800 dark:border-b-gray-900 flex items-center justify-between">
      <div className="flex-shrink-0 group block">
        <div className="flex items-center">
          <div>
            <img
              className="inline-block h-9 w-9 rounded-full"
              src={info?.photoURL}
              alt=""
            />
          </div>
          <div className="ml-3">
            <p
              className={`text-sm font-medium text-gray-700 dark:text-gray-300`}
            >
              {info?.fullname}
            </p>
            <div
              onClick={openUpdateModal}
              className={`text-xs font-medium text-gray-500 flex items-center gap-1 ${
                updateAvailable ? "cursor-pointer" : ""
              }`}
            >
              <span
                title={`${updateAvailable ? "New version available" : ""}`}
                className="hover:text-gray-400"
              >
                v{version}
              </span>

              {updateAvailable ? (
                <div className="relative w-2">
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <Settings />
    </div>
  );
}

export default UserSection;

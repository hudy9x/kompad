import { getVersion } from "@tauri-apps/api/app";
import { emit, listen } from "@tauri-apps/api/event";
import { useEffect, useState } from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { isDesktopApp } from "../../libs/utils";
import { showUpdateModal } from "../../store/modal";
import Settings from "../Settings";

function UserSection() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [version, setVersion] = useState("");
  const { info } = useCurrentUser();
  const isApp = isDesktopApp();

  const openUpdateModal = () => {
    if (updateAvailable && isApp) {
      showUpdateModal();
    }
  };

  useEffect(() => {
    if (isApp) {
      getVersion().then((version) => {
        setVersion(version);
      });

      listen("tauri://update-available", function(res) {
        console.log("tauri://update-available", res);
        setUpdateAvailable(true);
      });

      emit("tauri://update");
    }
  }, [isApp]);

  return (
    <div className="user-settings h-[66px]">
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
            <p className="usetting-fullname">
              {info?.fullname}
            </p>
            <div
              onClick={openUpdateModal}
              className={`app-version ${updateAvailable ? "cursor-pointer" : ""
                }`}
            >
              <span title={`${updateAvailable ? "New version available" : ""}`}>
                {isApp ? `v${version}` : 'Web app'}
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

import { useCurrentUser } from "../../hooks/useCurrentUser";
import Settings from "../Settings";

function UserSection() {
  const { info } = useCurrentUser();

  return (
    <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-y border-t-gray-200 border-b-gray-400 dark:border-t-gray-900 dark:border-b-gray-900 flex items-center justify-between">
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
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 ">
              {info?.fullname}
            </p>
            <p className="text-xs font-medium text-gray-500 ">View profile</p>
          </div>
        </div>
      </div>

      <Settings />
    </div>
  );
}

export default UserSection;

import { HiOutlineLogout } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";

function UserSection() {
  const { info } = useCurrentUser();

  console.log(info);

  return (
    <div className="bg-gray-50 px-4 py-3 border-y border-t-gray-200 border-b-gray-400 flex items-center justify-between">
      <a href="#" className="flex-shrink-0 group block">
        <div className="flex items-center">
          <div>
            <img
              className="inline-block h-9 w-9 rounded-full"
              src={info?.photoURL}
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
              {info?.fullname}
            </p>
            <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
              View profile
            </p>
          </div>
        </div>
      </a>

      <Link to={"/signout"}>
        <HiOutlineLogout
          className="h-9 w-9 p-2 rounded-lg hover:bg-gray-100 text-gray-400 cursor-pointer hover:text-gray-500"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}

export default UserSection;

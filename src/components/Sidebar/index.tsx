import {
  HiOutlineLogout,
  HiOutlinePlus,
  HiOutlineSearch,
} from "react-icons/hi";
import { Link } from "react-router-dom";

// const messages = [
//   {
//     id: 1,
//     subject: "Velit placeat sit ducimus non sed",
//     sender: "Gloria Roberston",
//     time: "1d ago",
//     datetime: "2021-01-27T16:35",
//     preview:
//       "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum",
//   },
//   {
//     id: 2,
//     subject: "Velit placeat sit ducimus non sed",
//     sender: "Gloria Roberston",
//     time: "1d ago",
//     datetime: "2021-01-27T16:35",
//     preview:
//       "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum",
//   },
//   {
//     id: 3,
//     subject: "Velit placeat sit ducimus non sed",
//     sender: "Gloria Roberston",
//     time: "1d ago",
//     datetime: "2021-01-27T16:35",
//     preview:
//       "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum",
//   },
//   {
//     id: 4,
//     subject: "Velit placeat sit ducimus non sed",
//     sender: "Gloria Roberston",
//     time: "1d ago",
//     datetime: "2021-01-27T16:35",
//     preview:
//       "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum",
//   },
//   {
//     id: 5,
//     subject: "Velit placeat sit ducimus non sed",
//     sender: "Gloria Roberston",
//     time: "1d ago",
//     datetime: "2021-01-27T16:35",
//     preview:
//       "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum",
//   },
//   // More messages...
// ];

export default function Sidebar() {
  const messages = Array(12)
    .fill(1)
    .map((value, index) => ({
      id: index + 1,
      subject: "Velit placeat sit ducimus non sed",
      sender: "Gloria Roberston",
      time: "1d ago",
      datetime: "2021-01-27T16:35",
      preview:
        "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum",
    }));
  return (
    <aside className="sidebar">
      <div className="flex justify-between items-center px-4">
        <h2 className="py-3 text-xl font-bold">Kompad</h2>
        <HiOutlineSearch
          className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-500"
          aria-hidden="true"
        />
      </div>

      <div className="px-4 pb-4 border-b border-gray-200">
        <button
          type="button"
          className="inline-flex w-full justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <HiOutlinePlus className="-ml-5 mr-2 h-5 w-5" aria-hidden="true" />
          New document
        </button>
      </div>

      <ul role="list" className="pad-list divide-y divide-gray-200">
        {messages.map((message) => (
          <li
            key={message.id}
            className="relative  bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
          >
            <div className="flex justify-between space-x-3">
              <div className="min-w-0 flex-1">
                <a href="#" className="block focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {message.sender}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {message.subject}
                  </p>
                </a>
              </div>
              <time
                dateTime={message.datetime}
                className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500"
              >
                {message.time}
              </time>
            </div>
            <div className="mt-1">
              <p className="line-clamp-2 text-sm text-gray-600">
                {message.preview}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="bg-gray-50 px-4 py-3 border-y border-t-gray-200 border-b-gray-400 flex items-center justify-between">
        <a href="#" className="flex-shrink-0 group block">
          <div className="flex items-center">
            <div>
              <img
                className="inline-block h-9 w-9 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                Tom Cook
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
    </aside>
  );
}

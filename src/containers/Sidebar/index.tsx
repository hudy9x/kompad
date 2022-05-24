import { HiOutlinePlus, HiOutlineSearch } from "react-icons/hi";
import UserSection from "./UserSection";

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

      <ul className="pad-list divide-y divide-gray-200">
        {messages.map((message) => (
          <li
            key={message.id}
            className="relative  bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
          >
            <div className="flex justify-between space-x-3">
              <div className="min-w-0 flex-1">
                <span className="block focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {message.sender}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {message.subject}
                  </p>
                </span>
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
      <UserSection />
    </aside>
  );
}

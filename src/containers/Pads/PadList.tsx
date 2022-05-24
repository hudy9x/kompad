
function PadList() {
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
          <div className="flex gap-1 mt-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
              Badge
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
              Badge
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
              Badge
            </span>
          </div>
          {/* <div className="mt-1">
              <p className="line-clamp-2 text-sm text-gray-600">
                {message.preview}
              </p>
            </div> */}
        </li>
      ))}
    </ul>
  );
}

export default PadList;

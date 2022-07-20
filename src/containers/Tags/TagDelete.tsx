import React from "react";
import { HiX } from "react-icons/hi";
import { message } from "../../components/message";
import { delTagByPadId } from "../../services/pads";

function TagDelete({
  pid,
  tid,
  className,
}: {
  pid: string;
  tid: string;
  className?: string;
}) {
  return (
    <HiX
      className={`cursor-pointer bg-gray-100 dark:bg-gray-700 dark:text-gray-200 text-gray-400 hover:text-gray-700 h-3 ${className}`}
      onClick={async () => {
        const result = await delTagByPadId(pid, tid);
        if (!result) {
          message.error("Delete tag error !");
        }
      }}
    />
  );
}

export default TagDelete;

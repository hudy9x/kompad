import React from "react";
import { BsFolder } from "react-icons/bs";
import PadTag from "./PadTag";

function PadInfo() {
  return (
    <div className="pad-infos pb-3">
      <input
        className="mx-8 mb-5 h-12 md:w-[700px] xl:w-[800px] m-auto text-4xl text-gray-700 font-extrabold outline-none"
        placeholder="Untitled"
      />
      <div className="pad-details mx-8 space-y-2 text-gray-600">
        <div className="flex items-center text-sm">
          <span className="text-gray-400 w-32">Created at:</span>
          <span>12 Sep 2022</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="text-gray-400 w-32">Tags:</span>
          <PadTag selected={[]} />
        </div>
        <div className="flex items-center text-sm">
          <span className="text-gray-400 w-32">Folder:</span>
          <div className="flex gap-2 items-center">
            <BsFolder />
            <span>Training</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PadInfo;

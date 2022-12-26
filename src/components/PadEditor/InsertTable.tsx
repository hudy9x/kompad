import { useState } from "react";
import { CustomPopover } from "../CustomPopover";

const columns = [1, 2, 3, 4, 5, 6];
const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const InsertTable = () => {
  const [selectedRow, setSelectedRow] = useState<number>(9);
  const [selectedColumn, setSelectedColumn] = useState<number>(3);

  return (
    <CustomPopover>
      <div className="border-bottom dark:border-gray-700 flex justify-center">
        <table className="border-separate my-5">
          {rows.map((row) => (
            <tr className={'row'}>
              {columns.map((column) => {
                const isSelected = row <= selectedRow && column <= selectedColumn
                return <td className={`${isSelected ? 'column--selected' : ''} column`} >{ }</td>
              })}
            </tr>
          ))}
        </table>
      </div>
      <div className="flex justify-center my-4">
        <input type="text"
          name="title"
          id="pad-title"
          value={'5'}
          className="w-9 h-9"/>
        <div className="mx-3 flex items-center">X</div>
        <input type="text"
          name="title"
          id="pad-title"
          value={'5'}
          className="w-9 h-9"/>
      </div>
    </CustomPopover>
  )
}

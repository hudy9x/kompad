import { useState } from "react";
import { CustomPopover } from "../CustomPopover";

const columns = [1, 2, 3, 4, 5, 6];
const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const InsertTable = () => {
  const [selectedRows, setSelectedRow] = useState<number>(9);
  const [selectedColumn, setSelectedColumn] = useState<number>(3);

  const onMouseMove = (row: number, column: number) => {
    setSelectedRow(row);
    setSelectedColumn(column);
  }

  return (
    <CustomPopover>
      <div className="border-bottom dark:border-gray-700 flex justify-center">
        <table className="border-separate my-5">
          {rows.map((row) => (
            <tr className={'row'}>
              {columns.map((column) => {
                const isSelected = row <= selectedRows && column <= selectedColumn
                return <td onMouseMove={() => onMouseMove(row, column)} className={`${isSelected ? 'column--selected' : ''} column`} >{ }</td>
              })}
            </tr>
          ))}
        </table>
      </div>
      <div className="flex justify-center my-4 form-control">
        <input type="text"
          name="column"
          id="column"
          value={selectedColumn}
          className=""/>
        <div className="mx-3 flex items-center">X</div>
        <input type="text"
          name="rows"
          id="rows"
          value={selectedRows}
          className=""/>
      </div>
    </CustomPopover>
  )
}

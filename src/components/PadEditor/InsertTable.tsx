import { Popover } from "@headlessui/react";
import { useRef, useState } from "react";
import { useTableStore } from "../../store/table";
import { CustomPopover } from "../CustomPopover";

const columns = [1, 2, 3, 4, 5, 6];
const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const InsertTable = () => {
  const { selectedColumn, selectedRow, setSelectedColumn, setSelectedRow, selectedColumnInput, setSelectedRowInput, selectedRowInput, setSelectedColumnInput } = useTableStore();
  const [movingRow, setMovingRow] = useState<number>(0);
  const [movingColumn, setMovingColumn] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const startMouseMove = useRef<boolean>(false);

  const onMouseMove = (row: number, column: number) => {
    startMouseMove.current = true;

    setSelectedRowInput(row);
    setSelectedColumnInput(column);

    setMovingRow(row);
    setMovingColumn(column);
  }

  const onClose = (close: (focusableElement?: HTMLElement | React.MutableRefObject<HTMLElement | null> | undefined) => void) => {
    startMouseMove.current = false;

    setSelectedRowInput(movingRow);
    setSelectedColumnInput(movingColumn);

    setSelectedRow(movingRow);
    setSelectedColumn(movingColumn);

    close();
  }

  const onMouseLeave = () => {
    setSelectedRowInput(selectedRow);
    setSelectedColumnInput(selectedColumn)

    setMovingColumn(0);
    setMovingRow(0);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    if (value === "") {
      value = '0';
    }
    if (name === 'column') {
      setSelectedColumnInput(parseFloat(value));
    } else {
      setSelectedRowInput(parseFloat(value));
    }
  }

  const onClick = (close: (focusableElement?: HTMLElement | React.MutableRefObject<HTMLElement | null> | undefined) => void) => {
    setSelectedColumn(selectedColumnInput);
    setSelectedRow(selectedRowInput)
    close();
  }

  return (
    <CustomPopover>
      <div className="border-bottom dark:border-gray-700 flex justify-center">
        <Popover.Panel>
          {({ close }) => (
            <table className="border-separate my-5" onClick={() => onClose(close)} onMouseLeave={onMouseLeave}>
              {rows.map((row) => (
                <tr className={'row'}>
                  {columns.map((column) => {
                    const isSelected = row <= selectedRow && column <= selectedColumn;
                    const isMoving = row <= movingRow && column <= movingColumn;
                    return <td onMouseMove={() => onMouseMove(row, column)} className={`${isMoving && startMouseMove.current && 'mouse-moving'} ${isSelected && 'bg-zinc-400'} column`} ></td>
                  })}
                </tr>
              ))}
            </table>
          )}
        </Popover.Panel>
      </div>
      <div className="table-input" >
        <div className="flex justify-center my-4 form-control">
          <input type="text"
            name="column"
            value={selectedColumnInput.toString()}
            onChange={(e) => handleInputChange(e)}
            onClick={() => setOpen(true)}
            className="input-table h-full" />
          <p className="flex items-center mx-1">X</p>
          <input type="text"
            name="row"
            value={selectedRowInput.toString()}
            onChange={(e) => handleInputChange(e)}
            onClick={() => setOpen(true)}
            className="input-table mr-3 h-full" />
          {open && <Popover.Panel>
            {({ close }) => (
              <button onClick={() => onClick(close)} className="btn w-9 h-full undefined px-1.5 py-1.5 btn-primary">OK</button>
            )}
          </Popover.Panel>}
        </div>
      </div>
    </CustomPopover>
  )
}


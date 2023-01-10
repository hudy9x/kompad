import { Popover } from "@headlessui/react";
import { Editor } from "@tiptap/react";
import { useRef, useState } from "react";
import { CustomPopover } from "../CustomPopover";
import { HiX } from "react-icons/hi"

const columns = [1, 2, 3, 4, 5, 6];
const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface RowProps {
  selectedRow: number,
  selectedRowInput: number,
  movingRow: number
}

interface ColumnProps {
  selectedColumn: number,
  selectedColumnInput: number,
  movingColumn: number
}

export const QuickAddTableModal = ({ editor }: { editor: Editor | null }) => {
  const [row, setRow] = useState<RowProps>({
    selectedRow: 0,
    selectedRowInput: 0,
    movingRow: 0
  })
  const [column, setColumn] = useState<ColumnProps>({
    selectedColumn: 0,
    selectedColumnInput: 0,
    movingColumn: 0
  })
  const [open, setOpen] = useState<boolean>(false);
  const startMouseMove = useRef<boolean>(false);

  const onMouseMove = (row: number, column: number) => {
    startMouseMove.current = true;

    setRow(prev => {
      return { ...prev, selectedRowInput: row, movingRow: row }
    })
    setColumn(prev => {
      return { ...prev, selectedColumnInput: column, movingColumn: column }
    })
  }

  const onClose = (close: (focusableElement?: HTMLElement | React.MutableRefObject<HTMLElement | null> | undefined) => void) => {
    startMouseMove.current = false;

    setRow(prev => {
      return { ...prev, selectedRowInput: row.movingRow, selectedRow: row.movingRow }
    })
    setColumn(prev => {
      return { ...prev, selectedColumnInput: column.movingColumn, selectedColumn: column.movingColumn }
    })

    editor?.chain().focus().insertTable({ rows: row.movingRow, cols: column.movingColumn, withHeaderRow: true }).run()

    close();
  }

  const onMouseLeave = () => {
    setRow(prev => {
      return { ...prev, selectedRowInput: row.selectedRow, movingRow: row.movingRow }
    })

    setColumn(prev => {
      return { ...prev, selectedColumnInput: column.selectedColumn, movingColumn: column.movingColumn }
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    if (value === "") {
      value = '0';
    }
    if (name === 'column') {
      setColumn(prev => {
        return { ...prev, selectedColumnInput: parseFloat(value) }
      })
    } else {
      setRow(prev => {
        return { ...prev, selectedRowInput: parseFloat(value) }
      })
    }
  }

  const onClick = (close: (focusableElement?: HTMLElement | React.MutableRefObject<HTMLElement | null> | undefined) => void) => {
    setColumn(prev => {
      return { ...prev, selectedColumn: column.selectedColumnInput }
    })
    setRow(prev => {
      return { ...prev, selectedRow: row.selectedRowInput }
    })

    close();
  }

  return (
    <CustomPopover>
      <div className="border-bottom dark:border-gray-700 flex justify-center">
        <Popover.Panel>
          {({ close }) => (
            <table className="border-separate my-5" onClick={() => onClose(close)} onMouseLeave={onMouseLeave}>
              {rows.map((rw) => (
                <tr className={'row'}>
                  {columns.map((cln) => {
                    const isSelected = rw <= row.selectedRow && cln <= column.selectedColumn;
                    const isMoving = rw <= row.movingRow && cln <= column.movingColumn;
                    return <td onMouseMove={() => onMouseMove(rw, cln)} className={`${isMoving && startMouseMove.current && 'mouse-moving'} ${isSelected && 'bg-zinc-400'} column`} ></td>
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
            value={column.selectedColumnInput.toString()}
            onChange={(e) => handleInputChange(e)}
            onClick={() => setOpen(true)}
            className="h-full" />
          <div className="flex items-center px-1">
            <HiX />
          </div>
          <input type="text"
            name="row"
            value={row.selectedRowInput.toString()}
            onChange={(e) => handleInputChange(e)}
            onClick={() => setOpen(true)}
            className="mr-3 h-full" />
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


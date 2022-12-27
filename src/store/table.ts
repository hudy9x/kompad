import create from "zustand";
import produce from "immer";
interface ITableStore {
  selectedRow: number;
  selectedColumn: number;
  selectedRowInput: number;
  selectedColumnInput: number;
  setSelectedRow: (selectedRow: number) => void;
  setSelectedColumn: (selectedColumn: number) => void;
  setSelectedRowInput: (selectedRow: number) => void;
  setSelectedColumnInput: (selectedColumn: number) => void;
}

//configure store
export const useTableStore = create<ITableStore>((set) => ({
  selectedRow: 0,
  selectedColumn: 0,
  selectedRowInput: 0,
  selectedColumnInput: 0,
  setSelectedRow: (selectedRow: number) =>
    set(
      produce<ITableStore>((state) => {
        state.selectedRow = selectedRow;
      })
    ),

  setSelectedColumn: (selectedColumn: number) =>
    set(
      produce<ITableStore>((state) => {
        state.selectedColumn = selectedColumn;
      })
    ),

  setSelectedRowInput: (selectedRow: number) =>
    set(
      produce<ITableStore>((state) => {
        state.selectedRowInput = selectedRow;
      })
    ),

  setSelectedColumnInput: (selectedColumn: number) =>
    set(
      produce<ITableStore>((state) => {
        state.selectedColumnInput = selectedColumn;
      })
    )
}));

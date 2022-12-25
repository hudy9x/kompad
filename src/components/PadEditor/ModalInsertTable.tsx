import { async } from "@firebase/util";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { usePadStore } from "../../store";
import Modal from "../Modal";

export const ModalInsertTable = () => {
 const [visible, setVisible] = useState<boolean>(false);
 const status = usePadStore((state) => state.insertTableStatus);
 const setInsertTableStatus = usePadStore((state) => state.setInsertTableStatus);
 const { user } = useAuth();

 const formik = useFormik({
  initialValues: {
   columns: "",
   rowns: ""
  },
  onSubmit: async () => {
   if (!user || !user.uid) return;

   
  }
 })

 useEffect(() => {
  setVisible(status);
 }, [status])

 useEffect(() => {
  setInsertTableStatus(visible);
 }, [visible])

 return (
  <Modal visible={visible} setVisible={setVisible} type='EDITOR' >
   <form
    onSubmit={formik.handleSubmit}
    className="text-color-base"
   >
    <h2 className="text-lg leading-6 pb-4 border-bottom dark:border-gray-700" > Insert Table </h2>
    <div className="flex" >
     <div className="form-control no-icon flex items-center">
      <label>
       Columns
      </label>
      <div className="p-3">
       <input type="text" name="title" id="prompt-title" value={formik.values.columns} onChange={formik.handleChange} />
      </div>
     </div>
     <div className="form-control no-icon flex items-center" >
      <label>
       Rowns
      </label>
      <div className="p-3">
       <input type="text" name="title" id="prompt-title" value={formik.values.rowns} onChange={formik.handleChange} />
      </div>
     </div>
    </div>
    <div className="mt-4">
     <div className="flex gap-4 flex-row-reverse">
      <button
       type="submit"
       className="btn btn-primary btn-lg"
      >
       Create
      </button>
      <button
       type="button"
       onClick={() => setVisible(false)}
       className="btn btn-lg"
      >
       Close
      </button>
     </div>
    </div>
   </form>
  </Modal>
 )
}

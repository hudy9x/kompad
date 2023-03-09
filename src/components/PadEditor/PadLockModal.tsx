import Modal from "../Modal"
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { HiOutlineLockClosed } from "react-icons/hi";
import { auth } from "../../libs/firebase";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { message } from "../message";
import { useNavigate, useParams } from "react-router-dom";
import { useModalStore } from "../../store/modal";

export const PadLockModal = (props: any) => {
 const lockStatus = useModalStore((state) => state.modals.lock);
 const setLockVisible = useModalStore((state) => state.setVisible);
 const [visible, setVisible] = useState(true);
 const navigate = useNavigate();
 const { id } = useParams(); 

 const formik = useFormik({
  initialValues: {
   password: ''
  },
  onSubmit: async (values) => {

   const user = auth.currentUser;
   if (!user?.email) {
    return;
   }

   const credential = EmailAuthProvider.credential(
    user.email,
    values.password
   );

   await reauthenticateWithCredential(user, credential).then(() => {
    message.success('Password is correct');
    
    navigate(`/app/pad/${id}`)
   }).catch(() => {
    message.error('Wrong password')
   })
  },
 });

 useEffect(() => {
  setVisible(lockStatus);
}, [lockStatus]);

useEffect(() => {
 setLockVisible("lock", visible);
 // eslint-disable-next-line
}, [visible]);

 return (
  <Modal visible={visible} setVisible={setVisible}>
   <form
    onSubmit={formik.handleSubmit}
    className="w-80 text-color-base"
   >
    <h3 className="text-lg leading-6 pb-4 border-bottom dark:border-gray-700">
     Please enter a password
    </h3>
    <div className="form-control">
     <div className="mt-3">
      <div className="form-icon">
       <HiOutlineLockClosed
        className="h-5 w-5"
        aria-hidden="true"
       />
      </div>
      <input
       type="password"
       name="password"
       id="password"
       onChange={formik.handleChange}
       value={formik.values.password}
       className=""
       placeholder="Password"
      />
     </div>
    </div>
    <div className="mt-4">
     <div className="flex gap-4 flex-row-reverse">
      <button
       type="submit"
       className="btn btn-primary btn-lg"
      >
       Submit
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
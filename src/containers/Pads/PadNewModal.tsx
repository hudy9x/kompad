import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "../../components/message";
import Modal from "../../components/Modal";
import { useAuth } from "../../hooks/useAuth";
import { addPad } from "../../services/pads";
import { IPlan, isPlanExceed, updatePlanByUid } from "../../services/plans";
import { usePadStore } from "../../store";

export default function PadNewModal() {
  const [visible, setVisible] = useState(false);
  const status = usePadStore((state) => state.newPadModalStatus);
  const setModalStatus = usePadStore((state) => state.setNewPadModalStatus);

  const { user } = useAuth();
  const navigate = useNavigate();
  const increaseNewPaddAdded = usePadStore((state) => state.setNeedToUpdate);

  const formik = useFormik({
    initialValues: {
      title: "Untitled",
      desc: "",
    },
    onSubmit: async (values) => {
      if (!user || !user.uid) return;

      try {
        const planData = (await isPlanExceed()) as IPlan;

        const id = await addPad({
          uid: user.uid,
          title: values.title,
          shortDesc: values.desc,
        });

        updatePlanByUid({ currentRecord: planData.currentRecord + 1 });
        navigate(`/app/pad/${id}`);
        increaseNewPaddAdded();
        setModalStatus(false);
      } catch (error) {
        console.log(error);
        if (error === "EXCEED_PLAN") {
          message.warning("Current plan is exceeded !");
        } else {
          message.error("Create new pad error !");
        }
      }
    },
  });

  // watch shortcut key triggers
  useEffect(() => {
    setVisible(status);
  }, [status]);

  // update modal status in store when user closes modal via setVisible function
  useEffect(() => {
    setModalStatus(visible);
    //eslint-disable-next-line
  }, [visible]);

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <form
        onSubmit={formik.handleSubmit}
        className="w-80 text-color-base"
      >
        <h3 className="text-lg leading-6 pb-4 border-bottom dark:border-gray-700">
          Create new pad
        </h3>

        <div className="mt-4">
          <div className="form-control no-icon">
            <label htmlFor="pad-title" className="block text-sm font-medium ">
              Title
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="title"
                id="pad-title"
                value={formik.values.title}
                onChange={formik.handleChange}
                className=""
              />
            </div>
          </div>
          <div className="form-control no-icon mt-4">
            <label htmlFor="pad-desc" className="block text-sm font-medium ">
              Description
            </label>
            <div className="mt-1">
              <textarea
                name="desc"
                id="pad-desc"
                value={formik.values.desc}
                onChange={formik.handleChange}
                className=""
              />
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
        </div>
      </form>
    </Modal>
  );
}

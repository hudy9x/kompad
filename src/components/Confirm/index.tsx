import { FC } from "react";
import { render } from "react-dom";
import { ConfirmFCProps, RenderFunc } from "./type";
import "./style.css";

const container = document.createElement("div");
const backdrop = document.createElement("div");
let wrapper = document.querySelector<HTMLElement>("modal-wrapper");

const _createElement = () => {
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.classList.add("modal-wrapper");
    document.body.appendChild(wrapper);
  }

  wrapper.classList.remove("modal-none");
  container.classList.add('modal-container');
  backdrop.classList.add('modal-backdrop');

  wrapper.appendChild(backdrop);
  wrapper.appendChild(container);

  return container;
}

const Confirm: FC<ConfirmFCProps> = (props) => {
  const { title, desc, yes, no, isHiddenClose } = props;

  const onYes = () => {
    if (!wrapper) {
      return;
    }
    yes();
    wrapper.classList.add('modal-none');
  }

  const onNo = () => {
    if (!wrapper) {
      return;
    }
    if (no) {
      no();
    }
    wrapper.classList.add('modal-none');
  }

  const onClose = () => {
    if (!wrapper) {
      return;
    }
    wrapper.classList.add('modal-none');
  }

  return (
    <div className="modal-box w-auto p-5 relative" >
      {!isHiddenClose && <button className="close" onClick={onClose} ></button> }
      <h3 className="text-lg leading-6 pb-4 border-bottom dark:border-gray-700">
        {title}
      </h3>
      <p className="block text-sm font-medium pt-2">{desc}</p>
      <div className="mt-4">
        <div className="flex gap-4 flex-row-reverse">
          <button
            onClick={onYes}
            type="submit"
            className="yes btn btn-primary btn-lg"
          >
            Yes
          </button>
          <button
            onClick={onNo}
            type="button"
            className="no btn btn-lg"
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
}

const handleClickOutSide = (e: MouseEvent) => {
  if (!wrapper || e.target !== backdrop) {
    return;
  }

  wrapper.classList.add('modal-none');
}

const _render = ({ title, container, desc, yes, no, isHiddenClose }: RenderFunc) => {
  render(<Confirm title={title} desc={desc} yes={yes} no={no} isHiddenClose={isHiddenClose} />, container);

  window.addEventListener('click', (e) => handleClickOutSide(e));

}

const _create = ({ title, desc, yes, no, isHiddenClose }: ConfirmFCProps) => {
  const container = _createElement();

  _render({
    title,
    container,
    desc,
    yes,
    no,
    isHiddenClose
  });
}

export const confirm = ({ title, desc, yes, no, isHiddenClose }: ConfirmFCProps) => {
  _create({
    title,
    desc,
    yes,
    no,
    isHiddenClose
  })
}


import { FC } from "react";
import { render } from "react-dom";
import { ConfirmFCProps, EConfirmBoxType, RenderFunc } from "./type";
import { HiOutlineExclamation, HiOutlineExclamationCircle } from "react-icons/hi"
import "./style.css";

const container = document.createElement("div");
const backdrop = document.createElement("div");
let wrapper = document.querySelector<HTMLElement>("modal-wrapper");
let confirmBoxType: EConfirmBoxType = EConfirmBoxType.DANGER;

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
  const { title, desc, yes, no } = props;

  const onYes = () => {
    if (!wrapper) {
      return;
    }
    yes();
    wrapper.classList.add('modal-none');
  }

  const onNo = () => {
    console.log(wrapper)
    if (!wrapper) {
      return;
    }
    no && no();
    wrapper.classList.add('modal-none');
  }

  const renderIcon = () => {
    if (confirmBoxType === EConfirmBoxType.DANGER) {
      return <HiOutlineExclamation className="w-10 h-10 rounded-full text-red-400 bg-red-300 bg-opacity-30 p-2 mt-3 m-auto mb-2" />
    }

    if (confirmBoxType === EConfirmBoxType.INFO) {
      return <HiOutlineExclamationCircle className="w-10 h-10 rounded-full text-blue-500 bg-blue-300 bg-opacity-30 p-2 mt-3 m-auto mb-2" />
    }

    return null;

  }

  return (
    <div className="modal-box w-auto p-5 relative" >
      <h3 className="text-lg font-medium leading-6 pb-2 text-center">
        {renderIcon()}
        {title}
      </h3>
      <p className="block text-sm pt-2 text-center w-72">{desc}</p>
      <div className="pt-5">
        <div className="grid grid-cols-2 gap-4">
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

const closeByPressingEsc = (e: KeyboardEvent) => {
  if (e.key !== 'Escape' || !wrapper) {
    return;
  }

  wrapper.classList.add('modal-none');
  console.log('iqouweoiu')
}

const _render = (props: RenderFunc) => {
  const {container, ...restProps} = props
  render(<Confirm {...restProps}/>, container);


  document.removeEventListener('click', handleClickOutSide)
  document.addEventListener('click', handleClickOutSide);

  document.removeEventListener('keyup', closeByPressingEsc);
  document.addEventListener('keyup', closeByPressingEsc);

}

const _create = ({ title, desc, yes, no }: ConfirmFCProps) => {
  const container = _createElement();

  _render({
    title,
    container,
    desc,
    yes,
    no,
  });
}

export const confirmDanger = (props: ConfirmFCProps) => {
 confirmBoxType = EConfirmBoxType.DANGER; 
  _create(props)
}

export const confirmInfo = (props: ConfirmFCProps) => {
  confirmBoxType = EConfirmBoxType.INFO
  _create(props)
}


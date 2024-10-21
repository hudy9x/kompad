import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { HiOutlineExclamation } from "react-icons/hi";
import "./style.css";

interface Props {
  title?: string;
  desc?: string | JSX.Element;
  trailingDesc?: string | JSX.Element
  onValidate?: (val: string) => boolean
  onOk: (val: string) => void;
  onCancel?: () => void;
  closePrompt?: () => void
}

let mainContainer = document.createElement('div')

const _createContainer = () => {
  let container = document.querySelector<HTMLElement>(".prompt-container");
  console.log(container);
  if (container) {
    container.remove();
  }

  container = document.createElement("div");
  container.classList.add("prompt-container");

  const backdrop = document.createElement("div");
  backdrop.classList.add("modal-backdrop");

  mainContainer = document.createElement("div");
  mainContainer.classList.add("prompt-main-container");

  container.appendChild(backdrop);
  container.appendChild(mainContainer);
  document.body.appendChild(container);

  return mainContainer;
};

function Prompt({ title, desc, onOk, onCancel, closePrompt, onValidate, trailingDesc }: Props) {
  const [val, setval] = useState("");
  const inpRef = useRef<HTMLInputElement>(null)

  const onSubmitHandler = () => {
    let validate = true;

    if (onValidate) {
      validate = onValidate(val)
    }

    if (!validate) return;

    setval(val)
    onOk(val)
    closePrompt && closePrompt()
  }

  const onCancelHandler = () => {
    onCancel && onCancel()
    closePrompt && closePrompt()
  }

  useEffect(() => {
    setTimeout(() => {
      inpRef.current && inpRef.current.focus()
    }, 500);
  }, [inpRef])

  return (
    <div className={`modal-box w-auto p-5 relative`}>
      {title ? (
        <h3 className="text-lg font-medium leading-6 pb-2 text-center">
          <HiOutlineExclamation className="w-10 h-10 rounded-full text-red-400 bg-red-300 bg-opacity-30 p-2 mt-3 m-auto mb-2" />
          {title}
        </h3>
      ) : null}
      {desc ? (
        <p className="block text-sm pt-2 text-center w-72">{desc}</p>
      ) : null}

      <div className="form-control pt-4">
        <input
          ref={inpRef}
          onKeyUp={ev => {
            if (ev.key === 'Enter') {
              onSubmitHandler()
            }
          }}
          type="password"
          name="promptInput"
          id="promptInput"
          onChange={(ev) => setval(ev.target.value)}
          value={val}
          className="text-center"
          placeholder="..."
        />
      </div>

      {trailingDesc}

      <div className="pt-5">
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onSubmitHandler}
            type="submit"
            className="yes btn btn-primary btn-lg"
          >
            Submit
          </button>
          <button onClick={onCancelHandler} type="button" className="no btn btn-lg">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}



export default function promptBox(props: Omit<Props, 'closePrompt'>) {
  const container = _createContainer();
  const root = createRoot(container)

  const closePrompt = () => {
    root.unmount()
    setTimeout(() => {
      document.querySelector('.prompt-container')?.remove()
    }, 100);
  }
  const mergedProps = { ...props, ...{ closePrompt: closePrompt } }

  root.render(<Prompt {...mergedProps} />);
}

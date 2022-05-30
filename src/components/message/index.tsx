import { FC } from "react";
import { render, unmountComponentAtNode } from "react-dom";
// import { createRoot, Root } from 'react-dom/client';
import { IconSuccess, IconInfo, IconError, IconWarn } from "./MessageIcon";
import {
  MessageClearFuncRetType,
  MessageCreateFunc,
  MessageFCProps,
  MessageFunc,
} from "./type";
import "./style.css";

const _getIcon = (type: string): FC => {
  switch (type) {
    case "success":
      return IconSuccess;
    case "error":
      return IconError;
    case "warn":
      return IconWarn;
    default:
      return IconInfo;
  }
};

const Message: FC<MessageFCProps> = (props) => {
  const { type, content } = props;
  const MessageIcon = _getIcon(type);

  return (
    <div className={`message ${type}`}>
      <MessageIcon />
      <p>{content}</p>
    </div>
  );
};

const _createContainer = () => {
  const container = document.createElement("div");
  let wrapper = document.querySelector(".message-wrapper");

  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.classList.add("message-wrapper");
    document.body.appendChild(wrapper);
  }

  container.classList.add("message-container");
  wrapper.appendChild(container);

  return container;
};

// const _isReactV18OrGreater = () => {
//   const version = React.version.split('.');

//   return parseInt(version[0], 10) >= 18;
// };

const _render = async (
  type: string,
  content: string,
  container: HTMLElement,
  timeout: number
) => {
  // const isGreaterV18 = _isReactV18OrGreater();
  // if (isGreaterV18) {
  //   const root = createRoot(container);
  //   root.render(<Message type={type} content={content} />);
  //   return {
  //     container,
  //     timeout,
  //     root,
  //   };
  // } else {
  render(<Message type={type} content={content} />, container);
  return {
    container,
    timeout,
    root: null,
  };
  // }
};

const _hide = ({
  container,
  timeout,
  root,
}: {
  container: HTMLElement;
  timeout: number;
  // root: Root | null;
  root: null;
}) => {
  return new Promise<MessageClearFuncRetType>((resolve) => {
    setTimeout(() => {
      container.classList.add("hide");
      return resolve({ root, container });
    }, timeout);
  });
};

const _clear = ({ root, container }: MessageClearFuncRetType) => {
  setTimeout(() => {
    // const isGreaterV18 = _isReactV18OrGreater();
    // if (isGreaterV18) {
    //   root.unmount();
    // } else {
    unmountComponentAtNode(container);
    // }
    container.remove();
  }, 500);
};

const _create: MessageCreateFunc = (type, content, timeout = 3000) => {
  const container = _createContainer();

  _render(type, content, container, timeout).then(_hide).then(_clear);
};

// Public messsage api ==================================
const success: MessageFunc = (content, timeout) => {
  _create("success", content, timeout);
};

const error: MessageFunc = (content, timeout) => {
  _create("error", content, timeout);
};

const info: MessageFunc = (content, timeout) => {
  _create("info", content, timeout);
};

const warning: MessageFunc = (content, timeout) => {
  _create("warn", content, timeout);
};

export const message = {
  success,
  error,
  info,
  warning,
};

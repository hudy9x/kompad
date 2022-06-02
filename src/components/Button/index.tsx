interface IButtonProp {
  onClick?: () => void;
  submit?: boolean;
  block?: boolean;
  children: JSX.Element | JSX.Element[] | React.ReactNode;
}

function Button({
  children,
  submit = false,
  block = false,
  ...rest
}: IButtonProp) {
  return (
    <button
      {...rest}
      type={submit ? "submit" : "button"}
      className={`inline-flex ${
        block ? "w-full" : ""
      } justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-yellow-900 bg-yellow-400 hover:bg-yellow-300`}
    >
      {children}
    </button>
  );
}

export default Button;

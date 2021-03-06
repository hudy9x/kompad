interface IButtonProp {
  onClick?: () => void;
  submit?: boolean;
  block?: boolean;
  className?: string;
  size?: string;
  children: JSX.Element | JSX.Element[] | React.ReactNode;
}

function Button({
  className,
  children,
  submit = false,
  block = false,
  size = "px-4 py-2",
  ...rest
}: IButtonProp) {
  return (
    <button
      {...rest}
      type={submit ? "submit" : "button"}
      className={`inline-flex ${
        block ? "w-full" : ""
      } ${className} justify-center items-center ${size} border border-transparent shadow-sm text-sm font-medium rounded-md text-yellow-900 bg-yellow-400 hover:bg-yellow-300`}
    >
      {children}
    </button>
  );
}

export default Button;

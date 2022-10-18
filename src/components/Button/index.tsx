interface IButtonProp {
  onClick?: () => void;
  submit?: boolean;
  block?: boolean;
  className?: string;
  size?: string;
  secondary?: boolean;
  children: JSX.Element | JSX.Element[] | React.ReactNode;
}

function Button({
  className,
  secondary = false,
  children,
  submit = false,
  block = false,
  size = "px-4 py-2",
  ...rest
}: IButtonProp) {

  let color = 'text-yellow-900 bg-yellow-400 hover:bg-yellow-300'
  if (secondary) {
    color = 'text-gray-400 bg-white hover:bg-gray-100 border-gray-200'
  }

  return (
    <button
      {...rest}
      type={submit ? "submit" : "button"}
      className={`inline-flex ${block ? "w-full" : ""
        } ${className} justify-center items-center ${size} border border-transparent shadow-sm text-sm font-medium rounded-md ${color}`}
    >
      {children}
    </button>
  );
}

export default Button;

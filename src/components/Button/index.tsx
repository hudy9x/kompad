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

  let color = secondary ? '' : 'btn-primary';

  return (
    <button
      {...rest}
      type={submit ? "submit" : "button"}
      className={`btn ${block ? "w-full" : ""
        } ${className} ${size} ${color}`}
    >
      {children}
    </button>
  );
}

export default Button;

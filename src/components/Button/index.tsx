interface IButtonProp {
  onClick: () => void;
  children: JSX.Element | JSX.Element[];
}

function Button({ children, ...rest }: IButtonProp) {
  return (
    <button
      {...rest}
      type="button"
      className="inline-flex w-full justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-yellow-900 bg-yellow-400 hover:bg-yellow-300 "
    >
      {children}
    </button>
  );
}

export default Button;

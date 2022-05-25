interface IButtonProp {
  onClick: () => void;
  children: JSX.Element | JSX.Element[];
}

function Button({ children, ...rest }: IButtonProp) {
  return (
    <button
      {...rest}
      type="button"
      className="inline-flex w-full justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {children}
    </button>
  );
}

export default Button;

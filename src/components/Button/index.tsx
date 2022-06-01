interface IButtonProp {
  onClick: () => void;
  children: JSX.Element | JSX.Element[];
}

function Button({ children, ...rest }: IButtonProp) {
  return (
    <button
      {...rest}
      type="button"
      className="inline-flex w-full justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 dark:bg-gray-500 dark:hover:bg-gray-700"
    >
      {children}
    </button>
  );
}

export default Button;

export const Button = ({ value, onclick }: any) => {
  return (
    <div className="mt-3">
      <button
        onClick={onclick}
        className="flex  items-center justify-center font-semibold text-white rounded-md w-full bg-black pt-1 pb-2 text-xs"
      >
        {value}
      </button>
    </div>
  );
};

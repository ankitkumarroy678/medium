import { ChangeEvent } from "react";

interface LabelledType {
  value: string;
  lable: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const InputBox = ({ value, lable, type, onChange }: LabelledType) => {
  return (
    <div className="w-full space-y-1">
      <div className="text-xs font-semibold">{lable}</div>
      <input
        type={type}
        placeholder={value}
        className="text-xs border border-gray-200 rounded-sm px-2 py-1 items-center w-full"
        onChange={onChange}
      />
    </div>
  );
};

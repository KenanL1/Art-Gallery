import React from "react";

interface Form {
  labelName: string;
  type: string;
  name: string;
  placeholder?: string;
  value: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSurpriseMe?: boolean;
  handleSurpriseMe?: () => void;
}

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}: Form) => (
  <div>
    <div className="flex items-center gap-2 mb-2">
      <label htmlFor={name}>{labelName}</label>
      {isSurpriseMe && (
        <button
          type="button"
          onClick={handleSurpriseMe}
          className="font-semibold text-xs bg-slate-300 py-1 px-2 rounded-[5px] text-black"
        >
          Surprise me
        </button>
      )}
    </div>
    <input
      type={type}
      id={name}
      name={name}
      className=" text-gray-900 text-sm focus:ring-[#6469ff] focus:border-[#6469ff] outline-none "
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
    />
  </div>
);

export default FormField;

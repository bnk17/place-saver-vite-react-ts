type InputProps = {
  label: string;
  type: 'text' | 'textarea' | 'number';
  name: string;
  placeholder: string;
  value: string;
  onValueInputChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onValueTextAreaChange?:
    | React.ChangeEventHandler<HTMLTextAreaElement>
    | undefined;
  labelClassName?: string;
  inputClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  inputRef?: React.Ref<HTMLInputElement> | undefined;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

const inputSizes = {
  sm: 'px-2 py-1.5 text-sm rounded-sm',
  md: 'px-4 py-2 text-base rounded-md',
  lg: 'px-6 py-3 text-lg rounded-lg',
};

export const Input = ({
  inputRef,
  label,
  name,
  placeholder,
  type,
  value,
  size = 'sm',
  labelClassName,
  inputClassName,
  onValueInputChange,
  onValueTextAreaChange,
  ...props
}: InputProps) => {
  if (type === 'textarea') {
    return (
      <textarea
        className={`${inputClassName} ${inputSizes[size]} w-full border-2 border-slate-300 focus:border-blue-700 focus:border-2 outline-0`}
        name={name}
        value={value}
        placeholder={placeholder}
        rows={3}
        cols={20}
        onChange={onValueTextAreaChange}
      />
    );
  }
  return (
    <div className="w-full flex flex-col gap-1 mt-2">
      <label htmlFor={label} className={labelClassName}>
        {label}
      </label>
      <input
        {...props}
        ref={inputRef}
        className={`${inputClassName} ${inputSizes[size]} w-full border-2 border-slate-300 focus:border-blue-700 focus:border-2 outline-0`}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onValueInputChange}
      />
    </div>
  );
};

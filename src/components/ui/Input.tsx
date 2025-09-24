type InputProps = {
  name: string;
  placeholder: string;
  value: string;
  onValueChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  inputRef?: React.Ref<HTMLInputElement> | undefined;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
  inputRef,
  name,
  placeholder,
  value,
  onValueChange: onValueTextAreaChange,
  ...props
}: InputProps) => {
  return (
    <input
      ref={inputRef}
      className="w-full resize-none text-lg outline-none"
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onValueTextAreaChange}
      {...props}
    />
  );
};

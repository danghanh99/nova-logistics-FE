import { ChangeEventHandler } from 'react';

interface IProps {
  className?: string;
  type?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Input = (props: IProps) => {
  return (
    <input
      className={props.className}
      type={props.type}
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  );
};

export default Input;

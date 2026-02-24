import styles from './Input.module.scss';
import * as React from 'react';
interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  className?: string;
  placeholder: string;
  name: string;
}
const Input = ({
  name,
  className,
  onChange,
  children,
  type = 'text',
  placeholder,
  value,
}: InputProps) => {
  return (
    <>
      <input
        className={`${className ?? ''} ${styles.input}`}
        id={name}
        name={name}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        value={value}
      >
        {children}
      </input>
    </>
  );
};
export default Input;

import styles from './Input.module.scss';
import * as React from 'react';
interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  className?: string;
  labelText: string;
  placeholder: string;
  name: string;
}
const Input = ({
  name,
  labelText,
  className,
  onChange,
  children,
  type = 'text',
  placeholder,
  value,
}: InputProps) => {
  return (
    <>
      <label htmlFor={name} className={styles.label}>
        <p>{labelText}</p>
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
      </label>
    </>
  );
};
export default Input;

import styles from './Input.module.scss';
import * as React from 'react';
interface InputProps {
  className?: string;
  labelText: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
  type?: 'text' | 'email' | 'password' | 'date' | 'checkbox' | 'radio';
  placeholder: string;
  name: string;
  value?: string;
  required: boolean;
  disabled: boolean;
  minLength?: number;
  autoComplete?: 'off' | 'on';
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
  required,
  disabled,
  minLength,
  autoComplete,
}: InputProps) => {
  return (
    <div className="form-group">
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
          required={required}
          disabled={disabled}
          minLength={minLength}
          autoComplete={autoComplete}
        >
          {children}
        </input>
      </label>
    </div>
  );
};
export default Input;

import styles from './Input.module.scss';
import type { ComponentPropsWithoutRef } from 'react';
interface InputProps extends ComponentPropsWithoutRef<'input'> {
  labelText?: string;
  isBlock?: boolean;
}
const Input = ({ className, labelText, isBlock, ...props }: InputProps) => {
  return (
    <div
      className={`${styles.input_wrapper}${isBlock ? ` ${styles.column}` : ''}`}
    >
      {labelText && (
        <label htmlFor={props.name} className={styles.label}>
          {labelText}
        </label>
      )}

      <input
        className={`${className ?? ''} ${styles.input}`}
        {...props}
      ></input>
    </div>
  );
};
export default Input;

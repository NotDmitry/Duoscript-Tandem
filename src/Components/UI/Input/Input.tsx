import styles from './Input.module.scss';
import type { ComponentPropsWithoutRef } from 'react';
interface InputProps extends ComponentPropsWithoutRef<'input'> {
  labelText?: string;
}
const Input = ({ className, labelText, ...props }: InputProps) => {
  return (
    <>
      {labelText && (
        <label htmlFor={props.name} className={styles.label}>
          <p>{labelText}</p>
        </label>
      )}

      <input
        className={`${className ?? ''} ${styles.input}`}
        {...props}
      ></input>
    </>
  );
};
export default Input;

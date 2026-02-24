import styles from './Button.module.scss';
import * as React from 'react';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode;
}

const Button = ({
  onClick,
  children,
  disabled,
  type = 'button',
}: ButtonProps) => (
  <button
    className={styles.button}
    onClick={onClick}
    disabled={disabled}
    type={type}
  >
    {children}
  </button>
);

export default Button;

import styles from './Button.module.scss';
import * as React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
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

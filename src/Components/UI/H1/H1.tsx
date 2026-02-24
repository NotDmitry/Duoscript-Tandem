import styles from './H1.module.scss';
import * as React from 'react';

interface H1Props extends React.ComponentPropsWithoutRef<'h1'> {
  children: React.ReactNode;
}

export default function H1({ children, ...rest }: H1Props) {
  return (
    <h1 className={styles.header_h1} {...rest}>
      {children}
    </h1>
  );
}

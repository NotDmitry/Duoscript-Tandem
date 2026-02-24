import styles from './H4.module.scss';
import * as React from 'react';

interface H4Props extends React.ComponentPropsWithoutRef<'h4'> {
  children: React.ReactNode;
}

export default function H4({ children, ...rest }: H4Props) {
  return (
    <h4 className={styles.header_h4} {...rest}>
      {children}
    </h4>
  );
}

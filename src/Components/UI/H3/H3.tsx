import styles from './H3.module.scss';
import * as React from 'react';

interface H3Props extends React.ComponentPropsWithoutRef<'h3'> {
  children: React.ReactNode;
}

export default function H3({ children, ...rest }: H3Props) {
  return (
    <h3 className={styles.header_h3} {...rest}>
      {children}
    </h3>
  );
}

import styles from './H2.module.scss';
import * as React from 'react';

interface H2Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export default function H2({ children, ...rest }: H2Props) {
  return (
    <h2 className={styles.header_h2} {...rest}>
      {children}
    </h2>
  );
}

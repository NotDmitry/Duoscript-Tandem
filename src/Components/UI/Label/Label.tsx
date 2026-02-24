import styles from './Label.module.scss';
import * as React from 'react';

interface LabelProps extends React.ComponentPropsWithoutRef<'label'> {
  children: React.ReactNode;
}

export default function Label({ children, ...rest }: LabelProps) {
  return (
    <label className={styles.label} {...rest}>
      {children}
    </label>
  );
}

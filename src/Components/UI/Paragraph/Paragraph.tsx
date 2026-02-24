import styles from './Paragraph.module.scss';
import * as React from 'react';

interface ParagraphProps extends React.ComponentPropsWithoutRef<'p'> {
  children: React.ReactNode;
}

export default function Paragraph({ children, ...rest }: ParagraphProps) {
  return (
    <p className={styles.paragraph} {...rest}>
      {children}
    </p>
  );
}

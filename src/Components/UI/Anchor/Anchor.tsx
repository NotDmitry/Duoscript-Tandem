import styles from './Anchor.module.scss';
import * as React from 'react';

interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: string | React.ReactNode;
  href: string;
}

export default function Anchor({
  target,
  rel,
  children,
  ...rest
}: AnchorProps) {
  const safeRel = target === '_blank' ? 'noopener noreferrer' : rel;
  return (
    <a className={styles.anchor} target={target} rel={safeRel} {...rest}>
      {children}
    </a>
  );
}

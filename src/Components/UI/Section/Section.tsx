import * as React from 'react';

type SectionProps = React.HTMLAttributes<HTMLElement>;

export default function Section(props: SectionProps) {
  return <section {...props}></section>;
}

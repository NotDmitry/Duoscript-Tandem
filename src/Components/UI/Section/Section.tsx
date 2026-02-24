import * as React from 'react';

type SectionProps = React.ComponentPropsWithoutRef<'section'>;

export default function Section(props: SectionProps) {
  return <section {...props}></section>;
}

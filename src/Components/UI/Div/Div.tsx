import * as React from 'react';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

export default function Div(props: DivProps) {
  return <div {...props}></div>;
}

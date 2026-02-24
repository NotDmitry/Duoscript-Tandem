import * as React from 'react';

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export default function Div(props: DivProps) {
  return <div {...props}></div>;
}

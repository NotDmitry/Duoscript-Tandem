import styles from './Article.module.scss';
import * as React from 'react';

type ArticleProps = React.HTMLAttributes<HTMLElement>;

export default function Article(props: ArticleProps) {
  return <article className={styles.article} {...props}></article>;
}

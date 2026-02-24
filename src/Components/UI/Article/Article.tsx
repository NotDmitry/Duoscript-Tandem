import styles from './Article.module.scss';
import * as React from 'react';

type ArticleProps = React.ComponentPropsWithoutRef<'article'>;

export default function Article(props: ArticleProps) {
  return <article className={styles.article} {...props}></article>;
}

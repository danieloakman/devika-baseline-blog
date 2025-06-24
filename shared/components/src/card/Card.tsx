import React, { ReactNode } from 'react';
import { Card as ReactstrapCard, type CardProps, CardBody } from 'reactstrap';
import styles from './Card.module.scss';

export declare namespace Card {
  export interface Props extends CardProps {}
}

export function Card({ children, className = '', ...props }: Card.Props) {
  return (
    <ReactstrapCard className={`${styles.card} ${className}`} {...props}>
      <CardBody className={styles.body}>{children}</CardBody>
    </ReactstrapCard>
  );
}

export default Card;

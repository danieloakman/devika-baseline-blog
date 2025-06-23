import React, { MouseEventHandler, ReactNode } from 'react';
import { Card, CardTitle, CardText, CardBody } from 'reactstrap';
import styles from './CardButton.module.scss';

export declare namespace CardButton {
  interface Props {
    title: string;
    description: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
    icon?: ReactNode;
  }
}

export function CardButton({
  title,
  description,
  onClick,
  icon,
}: CardButton.Props) {
  return (
    <Card onClick={onClick}>
      <CardBody>
        <div className={styles.icon}>{icon}</div>
        <CardTitle>{title}</CardTitle>
        <CardText>{description}</CardText>
      </CardBody>
    </Card>
  );
}

export default CardButton;

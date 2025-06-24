import React, { MouseEventHandler, ReactNode } from 'react';
import { Card, CardTitle, CardText, CardBody } from 'reactstrap';
import styles from './CardButton.module.scss';
import { ChevronRight } from 'lucide-react';

export declare namespace CardButton {
  interface Props {
    title: string;
    description: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
    icon: ReactNode;
  }
}

export function CardButton({
  title,
  description,
  onClick,
  icon,
}: CardButton.Props) {
  return (
    <Card onClick={onClick} className={styles.card}>
      <CardBody className={styles.body}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.content}>
          <CardTitle className={styles.title}>{title}</CardTitle>
          <CardText className={styles.description}>{description}</CardText>
        </div>
        <ChevronRight className={styles.chevron} size={36} />
      </CardBody>
    </Card>
  );
}

export default CardButton;

import React, { MouseEventHandler, ReactNode } from 'react';
import { CardTitle, CardText } from 'reactstrap';
import styles from './CardButton.module.scss';
import { ChevronRight } from 'lucide-react';
import { Card } from '@baseline/components';

export declare namespace CardButton {
  interface Props {
    title: string;
    description: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
    icon: ReactNode;
    className?: string;
  }
}

export function CardButton({
  title,
  description,
  onClick,
  icon,
  className = '',
}: CardButton.Props) {
  return (
    <Card onClick={onClick} className={className}>
      <div className={styles.card}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.content}>
          <CardTitle className={styles.title}>{title}</CardTitle>
          <CardText className={styles.description}>{description}</CardText>
        </div>
        <ChevronRight className={styles.chevron} size={36} />
      </div>
    </Card>
  );
}

export default CardButton;

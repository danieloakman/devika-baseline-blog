import React, { type ReactNode } from "react";
import styles from "./EmptyState.module.scss";

export declare namespace EmptyState {
  export interface Props {
    title: string;
    description: string;
    icon: ReactNode;
    children?: ReactNode;
    className?: string;
  }
}

export function EmptyState({ title, description, icon, children, className = '' }: EmptyState.Props) {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.icon}>{icon}</div>
      <span className={styles.title}>{title}</span>
      <span className={styles.description}>{description}</span>
      {children}
    </div>
  );
}

export default EmptyState;

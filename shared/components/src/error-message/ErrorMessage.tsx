import React, { ReactNode, useMemo } from 'react';
import styles from './ErrorMessage.module.scss';
import { Alert } from 'reactstrap';
import { AlertCircle } from 'lucide-react';

export declare namespace ErrorMessage {
  export interface Props {
    children: ReactNode | Error;
  }
}

export function ErrorMessage({ children }: ErrorMessage.Props) {
  console.log(import.meta.env.DEV);
  const error = useMemo(() => {
    if (typeof children === 'string') return children;
    if (children instanceof Error)
      return import.meta.env.DEV ? (
        <pre>{JSON.stringify(children, null, 2)}</pre>
      ) : (
        children.message
      );
    return 'Unknown error';
  }, [children]);

  return (
    <Alert color="danger" className={styles.container}>
      <AlertCircle className={styles.icon} />
      {error}
    </Alert>
  );
}

export default ErrorMessage;

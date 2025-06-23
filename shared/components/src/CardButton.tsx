import React from 'react';
import {
  Card,
  Button,
  CardTitle,
  CardText,
  CardBody,
  CardFooter,
} from 'reactstrap';

export declare namespace CardButton {
  interface Props {
    title: string;
    description: string;
    link: string;
  }
}

function CardButton({ title, description, link }: CardButton.Props) {
  return (
    <Card>
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardText>{description}</CardText>
      </CardBody>
      <CardFooter>
        <Button href={link}>{link}</Button>
      </CardFooter>
    </Card>
  );
}

export default CardButton;

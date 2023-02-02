import React from "react";

//CSS
import { Container, Title, Amount } from "./styles";

// Interface
interface Props {
  title: string;
  amount: string;
  color: string;
}

export function HistoryCard({ title, color, amount }: Props) {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
}

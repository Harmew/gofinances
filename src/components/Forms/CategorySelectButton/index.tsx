import React from "react";

//CSS
import { Container, Categoty, Icon } from "./styles";

// Interface
interface Props {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({ title, onPress }: Props) {
  return (
    <Container onPress={onPress}>
      <Categoty>{title}</Categoty>
      <Icon name="chevron-down" />
    </Container>
  );
}

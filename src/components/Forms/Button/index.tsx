import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

//CSS
import { Container, Title } from "./styles";

// Interface
interface Props extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export function Button({ title, onPress, ...rest }: Props) {
  return (
    <Container {...rest} onPress={onPress}>
      <Title>{title}</Title>
    </Container>
  );
}

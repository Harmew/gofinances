import React from "react";
import { TextInputProps } from "react-native";

//CSS
import { Container } from "./styles";

// Type
type Props = TextInputProps;

export function Input({ ...rest }: Props) {
  return <Container {...rest} />;
}

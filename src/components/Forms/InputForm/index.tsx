import React from "react";
import { TextInputProps } from "react-native";
import { Control, Controller } from "react-hook-form";
import { FieldError } from "react-hook-form";
import { FieldErrorsImpl, Merge } from "react-hook-form/dist/types";

//CSS
import { Container, Error } from "./styles";

// Components
import { Input } from "../Input";

// Interface
interface Props extends TextInputProps {
  control: Control;
  name: string;
  error:
    | string
    | undefined
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>;
}

export function InputForm({ control, name, error, ...rest }: Props) {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => {
          return <Input {...rest} onChangeText={onChange} value={value} />;
        }}
        name={name}
      />
      {error && <Error>{String(error)}</Error>}
    </Container>
  );
}

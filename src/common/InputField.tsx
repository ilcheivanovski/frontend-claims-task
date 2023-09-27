import React from "react";
import { useField } from "formik";
import {
  ErrorMessage,
  InputContainer,
  InputLabel,
  InputField as IField,
} from "../styles-components/common/InputField";

const InputField = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);

  return (
    <InputContainer>
      {label && (
        <InputLabel htmlFor={props.id || props.name}>{label}</InputLabel>
      )}
      <IField {...field} {...props} />
      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </InputContainer>
  );
};

export default InputField;

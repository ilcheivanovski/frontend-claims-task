import styled from "styled-components";

const InputContainer = styled.div`
  margin-bottom: 16px;
  margin-right: 10px;
  width: 180px;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 2px;
`;

export { InputContainer, InputLabel, InputField, ErrorMessage };

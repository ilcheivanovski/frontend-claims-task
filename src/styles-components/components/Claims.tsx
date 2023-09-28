import styled from "styled-components";

const Row = styled.div`
  display: contents;
`;

const HeaderRow = styled(Row)`
  display: contents;
  font-weight: bold;
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(6, auto);
  column-gap: 5px;
`;

const Wrapper = styled.div`
  width: 1020px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff; /* Adjust the color as needed */
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  margin-top: 29px;
  height: 37px;

  &:hover {
    background-color: #0056b3; /* Adjust the hover color as needed */
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export { Row, HeaderRow, Table, Wrapper, SubmitButton, Container };

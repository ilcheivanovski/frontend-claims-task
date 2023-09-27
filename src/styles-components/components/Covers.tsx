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
  grid-template-columns: repeat(5, auto);
  column-gap: 5px;
`;

const Wrapper = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export { HeaderRow, Table, Wrapper };

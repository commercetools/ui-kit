import styled from '@emotion/styled';

const Box = styled.div`
  width: 64px;
  height: 64px;
`;

export const ColorDemo = ({ value }: { value: string }) => {
  return <Box style={{ backgroundColor: value }} />;
};

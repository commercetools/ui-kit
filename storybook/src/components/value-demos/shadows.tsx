import styled from '@emotion/styled';

const Box = styled.div`
  width: 64px;
  height: 64px;
`;

export const ShadowDemo = ({ value }: { value: string }) => {
  return <Box style={{ boxShadow: value }} />;
};

import styled from '@emotion/styled';

const Container = styled.div`
  width: 64px;
  height: 64px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.0675);
`;

const Box = styled.div`
  width: 128px;
  height: 128px;
  border: 2px solid currentColor;
  position: relative;
  left: 25%;
  top: 25%;
`;

export const BorderRadiusDemo = ({ value }: { value: string }) => {
  return (
    <Container>
      <Box style={{ borderRadius: value }} />
    </Container>
  );
};

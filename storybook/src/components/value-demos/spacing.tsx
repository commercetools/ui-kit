import styled from '@emotion/styled';

const Space = styled.div`
  height: 32px;
  background-color: rebeccapurple;
`;

export const SpacingDemo = ({ value }: { value: string }) => {
  return <Space style={{ width: value }} />;
};

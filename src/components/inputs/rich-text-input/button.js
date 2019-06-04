import styled from '@emotion/styled';

const Button = styled.span`
  cursor: pointer;
  color: ${props => (props.active ? 'black' : '#aaa')};
  font-size: 14px;
`;

export default Button;

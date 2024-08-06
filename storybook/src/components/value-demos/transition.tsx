import styled from '@emotion/styled';
import { keyframes } from '@emotion/css';
import { useState } from 'react';

const Rail = styled.div`
  width: 256px;
  height: 32px;
  overflow: hidden;
  border: 1px solid rebeccapurple;
  cursor: pointer;
`;

const move = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }

  100% {

    transform: translate3d(224px, -1px ,0);
  }
`;

const Knob = styled.div`
  display: block;
  width: 32px;
  height: 32px;
  border: 1px solid rebeccapurple;
  background-color: rebeccapurple;
  animation: ${move} 5s forwards;
`;

export const TransitionDemo = ({ value }: { value: string }) => {
  const [key, setKey] = useState(1);
  const [timing, easing] = value.split(' ');
  return (
    <Rail key={key} onMouseDown={() => setKey(key + 1)}>
      <Knob
        style={{ animationDuration: timing, animationTimingFunction: easing }}
      />
    </Rail>
  );
};

import styled from '@emotion/styled';

const AccessibleHidden = styled.div`
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
`;
AccessibleHidden.displayName = 'AccessibleHidden';

export default AccessibleHidden;

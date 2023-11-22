import styled from '@emotion/styled';
import { PrimaryButton, Tooltip, Spacings, CollapsiblePanel } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../test/percy';

const title = 'What kind of bear is best';
const longTitle = 'What kind of bear is best? Everyones knows its a panda.';
const noop = () => {};

const Body = styled.div`
  color: red;
  margin-top: 12px;
`;

const ContainerWithPadding = styled.div`
  padding-top: 50px;
`;

export const routePath = '/tooltip';

export const component = () => {
  return (
    <Suite>
      <Spec label="Closed">
        <Tooltip title={title}>
          <PrimaryButton onClick={noop} label="Hello" />
        </Tooltip>
      </Spec>
      <Spec label="Open" listPropsOfNestedChild={true}>
        <ContainerWithPadding>
          <Tooltip title={title} isOpen={true}>
            <PrimaryButton onClick={noop} label="Hello" />
          </Tooltip>
        </ContainerWithPadding>
      </Spec>
      <Spec
        label="Open with custom body component"
        listPropsOfNestedChild={true}
      >
        <ContainerWithPadding>
          <Tooltip
            title={title}
            isOpen={true}
            components={{ BodyComponent: Body }}
          >
            <PrimaryButton onClick={noop} label="Hello" />
          </Tooltip>
        </ContainerWithPadding>
      </Spec>
      <Spec
        label="CollapsiblePanel as a parent"
        listPropsOfNestedChild={true}
      >
        <CollapsiblePanel
          theme="dark"
          header={
            <Spacings.Inline scale="m" alignItems="center">
              <CollapsiblePanel.Header>
                Header
              </CollapsiblePanel.Header>
              <Tooltip 
                title={longTitle} 
                isOpen={true}
                horizontalConstraint={6}
                placement='bottom'
              >
                <PrimaryButton onClick={noop} label="Hello" />
              </Tooltip>
            </Spacings.Inline>
          }
        >
          <div>Some content</div>
        </CollapsiblePanel>
      </Spec>
    </Suite>
  );
};
/*
 */

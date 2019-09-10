import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import {
  withKnobs,
  boolean,
  text,
  select,
  number,
} from '@storybook/addon-knobs/react';
import Section from '../../../.storybook/decorators/section';
import Readme from './README.md';
import Tooltip from './tooltip';
import PrimaryButton from '../buttons/primary-button';

const CustomWrapper = styled.div`
  display: block;
  background-color: pink;
`;

const CustomBody = styled.div`
  font-size: 0.875rem;
  color: red;
`;

storiesOf('Components|Tooltips', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('Tooltip bug', () => {
    const label = text('children', 'Dat is quite long text, ya know, lad.');

    const constraint = select(
      'constraint',
      ['xs', 's', 'm', 'l', 'xl', 'scale'],
      'scale'
    );

    const placement = select(
      'placement',
      {
        top: 'top',
        'top-start': 'top-start',
        'top-end': 'top-end',
        right: 'right',
        'right-start': 'right-start',
        'right-end': 'right-end',
        bottom: 'bottom',
        'bottom-start': 'bottom-start',
        'bottom-end': 'bottom-end',
        left: 'left',
        'left-start': 'left-start',
        'left-end': 'left-end',
      },
      'left'
    );

    const closeAfter = number('close after', 1000);

    const fullWidth = boolean('full width wrapper', false);
    const customBodyWrapper = boolean('custom body wrapper', false);

    const Screen = styled.div`
      width: 100%;
      height: 500px;
      background-color: white;
      display: flex;
      flex-grow: 1;
      flex-direction: row;
    `;

    const PageContainer = styled.div`
      background-color: pink;
      flex-grow: 1;
      overflow-y: scroll;
    `;

    const PageContent = styled.div`
      background-color: lightblue;
      height: 1000px;
      flex-grow: 1;
    `;

    const SidebarContainer = styled.div`
      background-color: yellow;
      display: flex;
      overflow-y: scroll;
      flex-shrink: 0;
      flex-direction: column;
    `;

    const Sidebar = styled.div`
      background-color: green;
      position: static;
      width: 150px;
      height: 100%;
    `;

    const SidebarHeader = styled.div`
      background-color: pink;
      position: absolute;
      height: 150px;
      width: 150px;
    `;

    const SidebarHeaderItem = styled.div`
      display: inline-block;
      background-color: green;
    `;

    return (
      <Screen>
        <PageContainer>
          <PageContent>I am a page content</PageContent>
        </PageContainer>
        <SidebarContainer>
          <Sidebar>
            <SidebarHeader>
              <SidebarHeaderItem>
                <Tooltip
                  off={boolean('off', false)}
                  title={label}
                  closeAfter={closeAfter}
                  placement={placement}
                  horizontalConstraint={constraint}
                  components={{
                    WrapperComponent: fullWidth ? CustomWrapper : null,
                    BodyComponent: customBodyWrapper ? CustomBody : null,
                  }}
                >
                  <PrimaryButton
                    onClick={() => {}}
                    label="Submit"
                    isDisabled={boolean('button disabled', false)}
                  />
                </Tooltip>
              </SidebarHeaderItem>
            </SidebarHeader>
          </Sidebar>
        </SidebarContainer>
      </Screen>
    );
  });

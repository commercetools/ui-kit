import { useState, useCallback, useRef } from 'react';
import { Switch, Route } from 'react-router';
import { RichTextInput } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const minimalValue = 'Hello World';

const largeValue =
  '<h1>Hello world</h1><p>This is a longer text</p><ul><li>One</li><li>Two</li></ul>';

const emptyValue = '';

export const routePath = '/rich-text-input';

// this route will be used with puppeteer based testing.
const InteractiveRoute = () => {
  const [value, setValue] = useState(emptyValue);
  const ref = useRef(null);

  const handleReset = useCallback(() => {
    ref.current?.resetValue('<p><strong>Hello World</strong></p>');
  }, []);

  const onChange = useCallback(
    (event) => {
      setValue(event.target.value);
    },
    [setValue]
  );

  return (
    <Suite>
      <Spec label="minimal" omitPropsList testedThemes={['new']}>
        <div>
          <label htmlFor="reset-button">Reset value to Hello World</label>
          <button
            onMouseDown={(event) => {
              event.preventDefault();
              handleReset();
            }}
            id="reset-button"
          >
            Reset
          </button>
        </div>
        <label htmlFor="rich-text">Rich text</label>
        <RichTextInput
          data-testid="rich-text"
          id="rich-text"
          onChange={onChange}
          value={value}
          horizontalConstraint={7}
          ref={ref}
        />
      </Spec>
    </Suite>
  );
};

const DefaultRoute = () => (
  <Suite>
    <Spec label="minimal" omitPropsList>
      <RichTextInput
        onChange={() => {}}
        value={minimalValue}
        horizontalConstraint={7}
      />
    </Spec>

    <Spec
      label="with a longer value and defaultExpandMultilineText disabled"
      omitPropsList
    >
      <RichTextInput
        onChange={() => {}}
        value={largeValue}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec
      label="with a longer value and defaultExpandMultilineText enabled"
      omitPropsList
    >
      <RichTextInput
        onChange={() => {}}
        value={largeValue}
        defaultExpandMultilineText={true}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when placeholder is visible" omitPropsList>
      <RichTextInput
        onChange={() => {}}
        value={emptyValue}
        placeholder="Placeholder"
        defaultExpandMultilineText={true}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when hasWarning" omitPropsList>
      <RichTextInput
        onChange={() => {}}
        value={minimalValue}
        hasWarning={true}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when hasError" omitPropsList>
      <RichTextInput
        onChange={() => {}}
        value={minimalValue}
        hasError={true}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="with horizontalConstraint `l`" omitPropsList>
      <RichTextInput
        onChange={() => {}}
        value={minimalValue}
        horizontalConstraint={10}
      />
    </Spec>
    <Spec label="with horizontalConstraint `xl`" omitPropsList>
      <RichTextInput
        onChange={() => {}}
        value={minimalValue}
        horizontalConstraint={16}
      />
    </Spec>
    <Spec label="with horizontalConstraint `scale`" omitPropsList>
      <RichTextInput
        onChange={() => {}}
        value={minimalValue}
        horizontalConstraint="scale"
      />
    </Spec>
    <Spec label="with expand button" omitPropsList>
      <RichTextInput
        onChange={() => {}}
        value={minimalValue}
        showExpandIcon={true}
        onClickExpand={() => {}}
        horizontalConstraint="scale"
      />
    </Spec>
    <Spec label="when disabled" omitPropsList>
      <RichTextInput
        onChange={() => {}}
        value={minimalValue}
        isDisabled={true}
        onClickExpand={() => {}}
        horizontalConstraint="scale"
      />
    </Spec>
    <Spec label="when readonly" omitPropsList>
      <RichTextInput
        onChange={() => {}}
        value={minimalValue}
        isReadOnly={true}
        onClickExpand={() => {}}
        horizontalConstraint="scale"
      />
    </Spec>
  </Suite>
);

export const component = () => (
  <Switch>
    <Route path={`${routePath}/interactive`} component={InteractiveRoute} />
    <Route path={routePath} component={DefaultRoute} />
  </Switch>
);

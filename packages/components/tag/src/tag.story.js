import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { BrowserRouter as Router } from 'react-router-dom';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs/react';
import Constraints from '@commercetools-uikit/constraints';
import Section from '../../../../docs/.storybook/decorators/section';
import Tag from './tag';
import TagList from './tag-list/tag-list';
import Readme from '../README.md';

const examples = Array(15)
  .fill('')
  .map((_, i) => i + ' fish');

const TagStory = () => (
  <Section>
    <Tag
      type={select('type', ['normal', 'warning'], 'normal')}
      to={select('to', { '/foo': '/foo', Null: null }, '/foo')}
      isDisabled={boolean('isDisabled', false)}
      isDraggable={boolean('isDraggable', false)}
      onClick={boolean('onClick', false) ? action('onClick') : undefined}
      horizontalConstraint={select(
        'horizontalConstraint',
        Constraints.getAcceptedMaxPropValues(),
        7
      )}
      onRemove={boolean('onRemove', false) ? action('onRemove') : undefined}
    >
      {text('Children', 'Icecream')}
    </Tag>
  </Section>
);
TagStory.displayName = 'TagStory';

const TagListStory = () => (
  <Section>
    <TagList>
      {examples.map((tag, index) => (
        <Tag
          onRemove={boolean('onRemove', false) ? action('onRemove') : undefined}
          key={index}
        >
          {tag}
        </Tag>
      ))}
    </TagList>
  </Section>
);
TagListStory.displayName = 'TagListStory';

storiesOf('Components|Tags', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  // Router is required to support the Link component used by Tag
  .add('Tag', () => (
    <Router>
      <TagStory />
    </Router>
  ))
  .add('TagList', () => (
    <Router>
      <TagListStory />
    </Router>
  ));

import React from 'react';
import { navigateTo } from 'gatsby';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  AngleThinRightIcon,
  Spacings,
  SecondaryButton,
  Text,
  CodeViewIcon,
  customProperties,
} from 'ui-kit';
import Layout from '../components/layout';
// import Image from '../components/image';
import SEO from '../components/seo';
import CodeEditor from '../components/code-editor';
import pkg from '../../../package.json';

const Hero = styled.div`
  background-color: ${customProperties.colorNavy40};
`;
const HeroMessage = styled.div`
  font-size: 2.5rem;
  color: ${customProperties.colorNavy98};
  line-height: 3rem;
  flex: 1;
  flex-grow: 2;
`;
const ContentWrapper = styled.div`
  padding: 72px 0;
  width: 80%;
  max-width: 900px;
  margin: 0 auto;
`;
const HeroTextHighlighted = styled.span`
  color: ${customProperties.colorNavy40};
  background-color: ${customProperties.colorWhite};
  padding: ${customProperties.spacing4};
  font-weight: 100;
`;

const IndexPage = () => (
  <Layout showSidebar={false}>
    <SEO title="Home" keywords={pkg.keywords} />
    <Hero>
      <ContentWrapper>
        <Spacings.Stack scale="m">
          <Spacings.Inline scale="xl" alignItems="center">
            <HeroMessage>
              <div>
                {`A `}
                <HeroTextHighlighted>{'component library'}</HeroTextHighlighted>
                {` for building User Interfaces.`}
              </div>
              <Text.Subheadline elementType="h5" tone="inverted">
                {`Based on commercetools `}
                <span
                  css={css`
                    text-decoration: underline;
                  `}
                >
                  {'Design System'}
                </span>
              </Text.Subheadline>
            </HeroMessage>
            <div
              css={css`
                flex: 1;
                flex-grow: 1;
              `}
            >
              <CodeViewIcon size="scale" theme="white" />
            </div>
          </Spacings.Inline>
          <Spacings.Inline scale="xl">
            <SecondaryButton
              label="Getting started"
              iconLeft={<AngleThinRightIcon />}
              onClick={() => navigateTo('/getting-started')}
            />
            <SecondaryButton
              label="API Documentation"
              iconLeft={<AngleThinRightIcon />}
              onClick={() => navigateTo('/components')}
            />
          </Spacings.Inline>
        </Spacings.Stack>
      </ContentWrapper>
    </Hero>
    <ContentWrapper>
      <CodeEditor
        noInline={true}
        code={`const Example = () => (
<Formik
  initialValues={{ email: '', password: '' }}
  validate={values => {
    const errors = {};
    if (TextInput.isEmpty(values.email))
      errors.email = { missing: true };
    if (TextInput.isEmpty(values.password))
      errors.password = { missing: true };
    return errors;
  }}
  onSubmit={formValues => { console.log(formValues); }}
  render={formikProps => (
    <form onSubmit={formikProps.handleSubmit}>
      <Spacings.Stack scale="m">
        <TextField
          name="email"
          title="Email"
          isRequired={true}
          value={formikProps.values.email}
          touched={formikProps.touched.email}
          errors={formikProps.errors.email}
          onChange={formikProps.handleChange}
          onBlur={formikProps.handleBlur}
          onFocus={formikProps.handleFocus}
          isDisabled={formikProps.isSubmitting}
          horizontalConstraint="m"
        />
        <PasswordField
          name="password"
          title="Password"
          isRequired={true}
          value={formikProps.values.password}
          touched={formikProps.touched.password}
          errors={formikProps.errors.password}
          onChange={formikProps.handleChange}
          onBlur={formikProps.handleBlur}
          onFocus={formikProps.handleFocus}
          isDisabled={formikProps.isSubmitting}
          horizontalConstraint="m"
        />
        <PrimaryButton
          type="submit"
          label="Submit"
          onClick={formikProps.handleSubmit}
        />
      </Spacings.Stack>
    </form>
  )}
/>);

render(<Example />);
`}
      />
    </ContentWrapper>
  </Layout>
);
IndexPage.displayName = 'IndexPage';

export default IndexPage;

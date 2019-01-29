import React from 'react';
import { navigateTo } from 'gatsby';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  AngleThinRightIcon,
  Spacings,
  SecondaryButton,
  customProperties,
} from 'ui-kit';
import Layout from '../components/layout';
// import Image from '../components/image';
import SEO from '../components/seo';
import CodeEditor from '../components/code-editor';
import pkg from '../../../package.json';

const Hero = styled.div`
  background-color: ${customProperties.colorGreen};
`;
const ContentWrapper = styled.div`
  padding: 72px 0;
  width: 80%;
  max-width: 900px;
  margin: 0 auto;
`;

const IndexPage = () => (
  <Layout showSidebar={false}>
    <SEO title="Home" keywords={pkg.keywords} />
    <Hero>
      <ContentWrapper>
        <Spacings.Stack scale="m">
          <Spacings.Inline scale="xl" alignItems="center">
            <div
              css={css`
                font-size: 2rem;
                color: ${customProperties.colorGreen85};
              `}
            >
              <div>
                {`A `}
                <span
                  css={css`
                    color: ${customProperties.colorGreen95};
                    font-weight: 100;
                  `}
                >
                  {'component library'}
                </span>
                {` for building User Interfaces.`}
              </div>
              <div
                css={css`
                  font-size: 1.5rem;
                `}
              >
                {`Based on commercetools `}
                <span
                  css={css`
                    color: ${customProperties.colorGreen95};
                    font-weight: 100;
                  `}
                >
                  {'Design System'}
                </span>
              </div>
            </div>
            <div
              css={css`
                font-size: 10rem;
              `}
            >
              {'👩‍🎨'}
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
        code={`<Formik
  initialValues={{ email: '', password: '' }}
  validate={values => {
    const errors = {};
    if (TextInput.isEmpty(values.email)) {
      errors.email = { missing: true };
    }
    if (TextInput.isEmpty(values.password)) {
      errors.password = { missing: true };
    }
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
/>
`}
      />
    </ContentWrapper>
  </Layout>
);
IndexPage.displayName = 'IndexPage';

export default IndexPage;

# Testing

We split our testing in two parts: functionality and visual. We use separate tools for these, and we try to avoid overlap.

## Functionality testing

- write tests from a user perspective, not from a dev perspective
- we test using `react-testing-library`
  - we have `test-utils` as a thin wrapper which sets up the context of tested components
  - we use `baseProps` or `createTestProps`
  - we avoid `beforeEach` as it leads to test coupling
  - it is okay to have many `expect` statements in an `it`
  - an `it` can describe the flow of a user
  - code comments can help explain the `expect`s better
- avoid testing for visuals (classnames or the DOM structure)
  - the user does not care about these
  - use visual testing instead (see below)
- if mocking is required, try to do it at the level the user interacts with the component
  - Examples
    - good: mocking network responses
    - bad: mocking a fetching component
  - Try to keep mocking minimal. The less we mock, and the later we mock, the more our tests will cover and the more confidence we gain that our components work

## Visual testing

- we will use a tool for visual regressions (not set up yet)

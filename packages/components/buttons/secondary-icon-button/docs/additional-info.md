The component further forwards all valid HTML attributes to the underlying `button` component.

## Note

The size of the button should be adjusted directly on the passed `Icon` component. Example:

```jsx
<SecondaryIconButton
  icon={<ArrowRightIcon size="small" />}
  label="Next"
  onClick={() => alert('Button clicked')}
/>
```

## Examples in the Merchant Center

Mostly in all places where you just need a "clickable" icon, without the complex behaviors of the `IconButton`.

- Pagination list: Go to next page

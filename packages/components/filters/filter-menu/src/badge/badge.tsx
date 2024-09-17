export type TFilterMenuBadgeProps = {
  label: string;
};

function Badge(props: TFilterMenuBadgeProps) {
  return (
    <div
      style={{
        backgroundColor: 'royalblue',
        color: 'aliceblue',
        margin: '0 2px',
      }}
    >
      {props.label}
    </div>
  );
}

export default Badge;

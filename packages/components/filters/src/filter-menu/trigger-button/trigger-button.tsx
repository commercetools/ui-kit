export type TFilterMenuTriggerButtonProps = {
  label: string;
};

const TriggerButton = (props: TFilterMenuTriggerButtonProps) => {
  return (
    <button>
      <div>{props.label}</div>
    </button>
  );
};

export default TriggerButton;

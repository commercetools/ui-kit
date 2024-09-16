import { Badge } from '../badge';
import { Chip } from '../chip';

export type TFilterMenuTriggerButtonProps = {
  label: string;
};

const TriggerButton = (props: TFilterMenuTriggerButtonProps) => {
  return (
    <button>
      <div>{props.label}</div>
      <Badge />
      <Chip />
    </button>
  );
};

export default TriggerButton;

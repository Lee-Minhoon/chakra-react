import { IconButton, Tooltip } from "@chakra-ui/react";

interface ChangerBaseProps {
  ariaLabel: string;
  label?: string;
  children?: React.ReactNode;
  onToggle?: () => void;
}

const ChangerBase = ({
  ariaLabel,
  label,
  children,
  onToggle,
}: ChangerBaseProps) => {
  return (
    <Tooltip hasArrow label={label}>
      <IconButton aria-label={ariaLabel} onClick={onToggle}>
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default ChangerBase;

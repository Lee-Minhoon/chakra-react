import { IconButton, Tooltip } from "@chakra-ui/react";

interface TogglerBaseProps {
  ariaLabel: string;
  label?: string;
  children?: React.ReactNode;
  onToggle?: () => void;
}

const TogglerBase = ({
  ariaLabel,
  label,
  children,
  onToggle,
}: TogglerBaseProps) => {
  return (
    <Tooltip hasArrow label={label}>
      <IconButton aria-label={ariaLabel} onClick={onToggle}>
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default TogglerBase;

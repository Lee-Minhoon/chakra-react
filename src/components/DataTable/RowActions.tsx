import { Button, Flex } from "@chakra-ui/react";

interface RowActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

const RowActions = ({ onEdit, onDelete }: RowActionsProps) => {
  return (
    <Flex>
      {onEdit && <Button onClick={onEdit}>Edit</Button>}
      {onDelete && <Button onClick={onDelete}>Delete</Button>}
    </Flex>
  );
};

export default RowActions;

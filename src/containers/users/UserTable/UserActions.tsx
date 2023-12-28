import { Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import { TbEdit, TbTrash } from "react-icons/tb";

interface UserActionsProps {
  onUpdate: MouseEventHandler<HTMLButtonElement>;
  onDelete: MouseEventHandler<HTMLButtonElement>;
}

const UserActions = ({ onUpdate, onDelete }: UserActionsProps) => {
  return (
    <Flex gap={2}>
      <Tooltip hasArrow label={"Edit User"}>
        <IconButton
          aria-label="edit"
          size={"sm"}
          icon={<TbEdit />}
          onClick={onUpdate}
        />
      </Tooltip>
      <Tooltip hasArrow label={"Delete User"}>
        <IconButton
          aria-label="delete"
          size={"sm"}
          icon={<TbTrash />}
          onClick={onDelete}
        />
      </Tooltip>
    </Flex>
  );
};

export default UserActions;

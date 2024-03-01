import { Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { TbEdit, TbTrash } from "react-icons/tb";

interface UserActionsProps {
  onUpdate: MouseEventHandler<HTMLButtonElement>;
  onDelete: MouseEventHandler<HTMLButtonElement>;
}

const UserActions = ({ onUpdate, onDelete }: UserActionsProps) => {
  const { t } = useTranslation();

  return (
    <Flex gap={"2"}>
      <Tooltip hasArrow label={t("Edit User")}>
        <IconButton aria-label="edit" icon={<TbEdit />} onClick={onUpdate} />
      </Tooltip>
      <Tooltip hasArrow label={t("Delete User")}>
        <IconButton aria-label="delete" icon={<TbTrash />} onClick={onDelete} />
      </Tooltip>
    </Flex>
  );
};

export default UserActions;

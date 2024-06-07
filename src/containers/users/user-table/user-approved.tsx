import { User } from "@/apis";
import { Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { TbCheck } from "react-icons/tb";

interface UserApprovedProps {
  approved: User["approved"];
  onApprove: MouseEventHandler<HTMLButtonElement>;
}

const UserApproved = ({ approved, onApprove }: UserApprovedProps) => {
  const { t } = useTranslation();

  return (
    <Flex>
      {approved ? (
        t("Approved")
      ) : (
        <Tooltip hasArrow label={t("Approve User")}>
          <IconButton
            aria-label="approve"
            icon={<TbCheck />}
            onClick={onApprove}
          />
        </Tooltip>
      )}
    </Flex>
  );
};

export default UserApproved;

import { User } from "@/apis";
import { Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import { TbCheck } from "react-icons/tb";

interface UserApprovedProps {
  approved: User["approved"];
  onApprove: MouseEventHandler<HTMLButtonElement>;
}

const UserApproved = ({ approved, onApprove }: UserApprovedProps) => {
  return (
    <Flex>
      {approved ? (
        "Approved"
      ) : (
        <Tooltip hasArrow label={"Approve User"}>
          <IconButton
            aria-label="approve"
            size={"sm"}
            icon={<TbCheck />}
            onClick={onApprove}
          />
        </Tooltip>
      )}
    </Flex>
  );
};

export default UserApproved;

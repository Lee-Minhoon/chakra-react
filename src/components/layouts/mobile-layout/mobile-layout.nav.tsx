import { Drawer, DrawerContent, DrawerOverlay } from "@chakra-ui/react";
import { Sidebar } from "../common";

interface MobileLayoutNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileLayoutNav = ({ isOpen, onClose }: MobileLayoutNavProps) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement={"left"}>
      <DrawerOverlay />
      <DrawerContent maxW={"fit-content"}>
        <Sidebar />
      </DrawerContent>
    </Drawer>
  );
};

export default MobileLayoutNav;

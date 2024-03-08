import { Drawer, DrawerContent, DrawerOverlay } from "@chakra-ui/react";
import { Sidebar } from "../common";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation = ({ isOpen, onClose }: MobileNavigationProps) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement={"left"}>
      <DrawerOverlay />
      <DrawerContent maxW={"fit-content"}>
        <Sidebar />
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNavigation;

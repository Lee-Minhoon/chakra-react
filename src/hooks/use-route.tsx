import { toUrl } from "@/utils";
import { useCallback } from "react";
import {
  Location,
  NavigateOptions,
  useLocation,
  useNavigate,
} from "react-router-dom";

type Destination = {
  pathname: string;
  search?: React.SetStateAction<Record<string, string>>;
};

const parseDestination = (
  origin: Location,
  destination: Destination
): string => {
  const searchParams =
    typeof destination.search === "function"
      ? destination.search(
          Object.fromEntries(new URLSearchParams(origin.search))
        )
      : destination.search;
  return toUrl(destination.pathname, searchParams);
};

const useRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const route = useCallback(
    (to: Destination, options?: NavigateOptions) => {
      navigate(parseDestination(location, to), options);
    },
    [location, navigate]
  );

  return { navigate, location, route };
};

export default useRoute;

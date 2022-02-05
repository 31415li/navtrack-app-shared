import { useGetDevicesTypes } from "../../api";

export const useDevicesTypesQuery = () => {
  const query = useGetDevicesTypes({
    query: { refetchOnMount: false, refetchOnWindowFocus: false }
  });

  return { deviceTypes: query.data?.items ?? [] };
};

import { useGetUser } from "../../api";

export const useGetCurrentUserQuery = () => {
  const query = useGetUser({
    query: {
      refetchOnWindowFocus: false,
      refetchOnMount: false
    }
  });

  return query;
};

import { useGetAssetsAssetIdUsers } from "../../api";

interface IUseAssetUsersQuery {
  assetId: string;
}

export const useAssetUsersQuery = (props: IUseAssetUsersQuery) => {
  const query = useGetAssetsAssetIdUsers(props.assetId, {
    query: {
      refetchOnWindowFocus: false
    }
  });

  return query;
};

import { useGetAssetsAssetIdDevices } from "../../api";

export const useAssetDevicesQuery = (assetId?: string) => {
  const query = useGetAssetsAssetIdDevices(`${assetId}`, {
    query: {
      refetchOnWindowFocus: false,
      enabled: !!assetId
    }
  });

  return query;
};

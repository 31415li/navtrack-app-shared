import { useRecoilValue } from "recoil";
import { currentAssetSelector } from "../../state/assets";

export const useCurrentAsset = () => {
  const currentAsset = useRecoilValue(currentAssetSelector);

  return currentAsset;
};

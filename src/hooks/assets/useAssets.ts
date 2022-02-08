import { useRecoilValue } from "recoil";
import { assetsAtom } from "../../state/assets";

export const useAssets = () => {
  const currentAsset = useRecoilValue(assetsAtom);

  return currentAsset;
};

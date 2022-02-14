import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { currentAssetIdAtom } from "../../state/assets";
import { useAssets } from "./useAssets";

export const useSetCurrentAssetOnInit = () => {
  const [currentAssetId, setCurrentAssetId] =
    useRecoilState(currentAssetIdAtom);
  const assets = useAssets();

  useEffect(() => {
    if (!currentAssetId && assets.length > 0) {
      setCurrentAssetId(assets[0].shortId);
    }
  }, [assets, currentAssetId, setCurrentAssetId]);
};

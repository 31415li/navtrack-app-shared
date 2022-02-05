import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Config, configAtom } from "../../state/app.config";

export const useFetchConfig = (defaultConfig?: Config) => {
  const [state, setState] = useRecoilState(configAtom);

  useEffect(() => {
    if (state.config === undefined && !state.initialized) {
      if (defaultConfig !== undefined) {
        setState({ config: defaultConfig, initialized: true });
      } else {
        axios({
          url: "/config.json"
        }).then((response) => {
          setState({ config: response.data, initialized: true });
        });
      }
    }
  }, [defaultConfig, setState, state]);

  return state.initialized;
};

import { useCallback, useState } from "react";
import { useGetTokenMutation } from "../mutations/useGetTokenMutation";
import { useSetRecoilState } from "recoil";
import { add } from "date-fns";
import { authenticationAtom } from "../../state/app.authentication";

export interface ILoginValues {
  username: string;
  password: string;
}

interface IUseLogin {
  clientId: string;
  onSuccess?: () => void;
}

export const useLogin = (props: IUseLogin) => {
  const setState = useSetRecoilState(authenticationAtom);
  const [internalLoginError, setInternalLoginError] = useState(false);
  const [externalLoginError, setExternalLoginError] = useState(false);

  const getTokenMutation = useGetTokenMutation({
    onSuccess: (data) => {
      setState((current) => ({
        ...current,
        initialized: true,
        isAuthenticated: true,
        token: {
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          expiryDate: add(new Date(), {
            seconds: data.expires_in
          }).toISOString()
        }
      }));

      props.onSuccess?.();
    },
    onError: (e, data) => {
      if (data.grant_type === "password") {
        setInternalLoginError(true);
      } else {
        setExternalLoginError(true);
      }
    }
  });

  const internalLogin = useCallback(
    (values: ILoginValues) => {
      const data = {
        grant_type: "password",
        username: values.username,
        password: values.password,
        scope: "offline_access IdentityServerApi openid",
        client_id: props.clientId
      };

      setInternalLoginError(false);
      setExternalLoginError(false);
      getTokenMutation.mutate(data);
    },
    [getTokenMutation, props.clientId]
  );

  const externalLogin = useCallback(
    (code: string, grantType: "apple" | "microsoft" | "google") => {
      const data = {
        grant_type: grantType,
        code: code,
        scope: "offline_access IdentityServerApi openid",
        client_id: props.clientId
      };

      setInternalLoginError(false);
      setExternalLoginError(false);
      getTokenMutation.mutate(data);
    },
    [getTokenMutation, props.clientId]
  );

  return {
    internalLogin,
    externalLogin,
    loading: getTokenMutation.isLoading,
    internalLoginError,
    externalLoginError
  };
};

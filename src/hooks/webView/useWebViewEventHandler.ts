import { useCallback, useEffect } from "react";
import { WebViewMapEvents } from "./types";

interface IUseWebViewEventHandler<T> {
  eventName: keyof typeof WebViewMapEvents;
  handler: (payload: T) => void;
}

export function useWebViewEventHandler<T>(props: IUseWebViewEventHandler<T>) {
  const handleEvent = useCallback(
    (event: Event) => {
      const custom = event as CustomEvent<T>;
      props.handler(custom.detail);
    },
    [props]
  );

  useEffect(() => {
    window.addEventListener(props.eventName, handleEvent);

    return () => {
      window.removeEventListener(props.eventName, handleEvent);
    };
  });
}

import { useState } from "react";

export function usePackageHook() {
  const [state, setState] = useState("");
  const [state2, setState2] = useState("");

  return { state, setState, state2 };
}

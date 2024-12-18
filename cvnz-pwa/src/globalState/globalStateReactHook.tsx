
import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
  organisation: {}
});

export { useGlobalState, setGlobalState };

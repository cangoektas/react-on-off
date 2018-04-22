import { createContext } from "react";

import noop from "./utils/noop";

const defaultContext = {
  on: undefined,
  setOn: noop,
  setOff: noop,
  toggle: noop,
  registerItem: id => id || "_internalDefaultId",
  unregisterItem: noop
};
const { Provider, Consumer } = createContext(defaultContext);

export { Provider, Consumer };

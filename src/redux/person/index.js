import saga from "./saga.js";
import reducer from "./reducer.js";
import { store, sagaMiddleware } from "../store.js";

store.addReducers({
  person: reducer,
});

sagaMiddleware.run(saga);

export * as selectors from "./selectors.js";
export * as actions from "./actions.js";

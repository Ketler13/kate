import { useReducer } from "react";

import {AuthStateContext, AuthDispatchContext} from './context';
import { reducer, initialState } from "./reducer";
import { getUser } from "./user";

export function AuthProvider(props) {
  const [state, dispatch] = useReducer(reducer, { ...initialState, user: getUser() });

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {props.children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}
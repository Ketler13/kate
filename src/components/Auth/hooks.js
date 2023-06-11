import { useContext } from "react";

import { AuthStateContext, AuthDispatchContext } from './context';

export function useAuthState() {
  const context = useContext(AuthStateContext);
  if (!context) throw new Error("useAuthState must be used in AuthProvider");

  return context;
}

export function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (!context) throw new Error("useAuthDispatch must be used in AuthProvider");

  return context;
}
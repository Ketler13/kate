export const initialState = {
  status: "idle",
  user: null,
  error: null
};

export function reducer(currentState, newState) {
  return { ...currentState, ...newState };
}
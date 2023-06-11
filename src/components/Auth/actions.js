import { signIn as fbSignIn, signUp as fbSignUp } from '../../services/auth'
import { initialState } from './reducer';
import { setUser, deleteUser } from "./user";

export async function signIn({ email, password }, dispatch) {
  try {
    dispatch({ status: "pending" });

    const result = await fbSignIn(email, password);
    setUser(result);
    dispatch({
      status: "resolved",
      user: result,
      error: null
    });
  } catch (error) {
    dispatch({ status: "rejected", error });
  }
}

export async function signUp({ email, password }) {
  await fbSignUp(email, password);
}

export function signOut(dispatch) {
  deleteUser();
  dispatch(initialState);
}
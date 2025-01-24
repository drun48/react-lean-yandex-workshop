import { describe, it, expect } from "@jest/globals";
import {
  sliceUser,
  initialState,
  setIsAuthChecked,
  setUser,
  setIsActiveforgotPassword,
} from "./slice";
import {
  edit,
  forgotPassword,
  login,
  register,
  resetPassword,
} from "./actions";

const user = {
  email: "test@mail.ru",
  name: "test",
};

describe("Reducer User", () => {
  it("should return the initial state", () => {
    expect(sliceUser.reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should return state with status active Auth", () => {
    const statusAuth = true;
    expect(sliceUser.reducer(undefined, setIsAuthChecked(statusAuth))).toEqual({
      ...initialState,
      isAuthChecked: statusAuth,
    });
  });

  it("should return state with user(setUser)", () => {
    expect(sliceUser.reducer(undefined, setUser(user))).toEqual({
      ...initialState,
      user: user,
    });
  });

  it("should return state with status active forgot password", () => {
    const status = true;
    expect(
      sliceUser.reducer(undefined, setIsActiveforgotPassword(status))
    ).toEqual({ ...initialState, isActiveforgotPassword: status });
  });

  it("should return state active loading from register", () => {
    expect(
      sliceUser.reducer(undefined, { type: register.pending.type })
    ).toEqual({ ...initialState, loading: true });
  });

  it("should return state user from register", () => {
    expect(
      sliceUser.reducer(undefined, {
        type: register.fulfilled.type,
        payload: user,
      })
    ).toEqual({ ...initialState, loading: false, user: user });
  });

  it("should return state active loading from login", () => {
    expect(sliceUser.reducer(undefined, { type: login.pending.type })).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it("should return state user from login", () => {
    expect(
      sliceUser.reducer(undefined, {
        type: login.fulfilled.type,
        payload: user,
      })
    ).toEqual({ ...initialState, loading: false, user: user });
  });

  it("should return state active loading from edit", () => {
    expect(sliceUser.reducer(undefined, { type: edit.pending.type })).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it("should return state user from edit", () => {
    expect(
      sliceUser.reducer(undefined, {
        type: edit.fulfilled.type,
        payload: user,
      })
    ).toEqual({ ...initialState, loading: false, user: user });
  });

  it("should return state active loading from forgotPassword", () => {
    expect(
      sliceUser.reducer(undefined, { type: forgotPassword.pending.type })
    ).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it("should return state with status active forgot password from forgotPassword", () => {
    expect(
      sliceUser.reducer(undefined, {
        type: forgotPassword.fulfilled.type,
        payload: true,
      })
    ).toEqual({
      ...initialState,
      loading: false,
      isActiveforgotPassword: true,
    });
  });

  it("should return state active loading from resetPassword", () => {
    expect(
      sliceUser.reducer(undefined, { type: resetPassword.pending.type })
    ).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it("should return state with status non-active forgot password from resetPassword", () => {
    expect(
      sliceUser.reducer(undefined, {
        type: forgotPassword.fulfilled.type,
        payload: false,
      })
    ).toEqual({
      ...initialState,
      loading: false,
      isActiveforgotPassword: false,
    });
  });
});

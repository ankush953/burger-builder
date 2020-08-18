import auth from "./auth";
import * as actionTypes from "../actions/actionTypes";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("<Auth Reducer testing />", () => {
  it("initial state should be set", () => {
    expect(auth(undefined, {})).toEqual({
      token: null,
      userId: null,
      loading: false,
      error: null,
      authRedirectPath: "/",
    });
  });

  it("token should be some-token", () => {
    expect(
      auth(
        {
          token: null,
          userId: null,
          loading: false,
          error: null,
          authRedirectPath: "/",
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          userId: "some-user-id",
          idToken: "some-token",
        }
      )
    ).toEqual({
      token: "some-token",
      userId: "some-user-id",
      loading: false,
      error: null,
      authRedirectPath: "/",
    })
  });
});

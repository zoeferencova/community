import React from "react";
import { shallow, mount, render } from "enzyme";
import AuthenticatedApp from "./AuthenticatedApp";

it("expect to render AuthenticatedApp component", () => {
    expect(shallow(<AuthenticatedApp />)).toMatchSnapshot()
})

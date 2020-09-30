import React from "react";
import { shallow } from "enzyme";
import ErrorBoundary from "./ErrorBoundary";

const Something = () => null;

describe("ErrorBoundary", () => {
  it("should display an error message if wrapped component throws", () => {
    const wrapper = shallow(
      <ErrorBoundary>
        <Something />
      </ErrorBoundary>
    );

    const error = new Error("test");

    wrapper.find(Something).simulateError(error);

    expect(wrapper.state('error')).toEqual(error);
  });
});
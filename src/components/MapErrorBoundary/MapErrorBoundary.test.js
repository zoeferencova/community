import React from "react";
import { shallow } from "enzyme";
import MapErrorBoundary from "./MapErrorBoundary";

const Something = () => null;

describe("MapErrorBoundary", () => {
  it("should display an error message if wrapped component throws", () => {
    const wrapper = shallow(
      <MapErrorBoundary>
        <Something />
      </MapErrorBoundary>
    );

    const error = new Error("test");

    wrapper.find(Something).simulateError(error);

    expect(wrapper.state('error')).toEqual(error);
  })
})
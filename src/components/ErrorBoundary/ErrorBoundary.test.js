import React from "react";
import { BrowserRouter } from "react-router-dom";
import { mount } from "enzyme";
import ErrorBoundary from "./ErrorBoundary";

const Something = () => null;

describe("ErrorBoundary", () => {
  it("should display an error message if wrapped component throws", () => {
    const wrapper = mount(
      <BrowserRouter>
        <ErrorBoundary>
          <Something />
        </ErrorBoundary>
      </BrowserRouter>
    );

    const error = new Error("test");

    wrapper.find(Something).simulateError(error);

    expect(wrapper.find("ErrorBoundary").state("error")).toEqual(error);
  });
});
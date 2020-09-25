import React from "react";
import { render } from "enzyme";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

describe("App", () => {
  it("renders App component", () => {
    const wrapper = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    expect(wrapper).toMatchSnapshot();
  })
})




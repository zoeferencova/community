import React from "react";
import { render } from "enzyme";
import Nav from "./Nav";
import { BrowserRouter } from "react-router-dom";

describe("Nav", () => {
  it("renders Nav component when not logged in", () => {
    const mockProps = {
        isLoggedIn: false
    }

    const wrapper = render(
      <BrowserRouter>
        <Nav {...mockProps} />
      </BrowserRouter>
    );
    
    expect(wrapper).toMatchSnapshot();
  });

  it("renders Nav component when logged in", () => {
    const mockProps = {
        isLoggedIn: true,
        first_name: "Zoe"
    }

    const wrapper = render(
      <BrowserRouter>
        <Nav {...mockProps} />
      </BrowserRouter>
    );
    
    expect(wrapper).toMatchSnapshot();
  });
});




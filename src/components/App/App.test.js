import React from "react";
import { mount } from "enzyme";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

describe("App", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });
  
  it("renders App component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("renders only the UnauthenticatedApp component if the isLoggedIn state is false", () => {
    wrapper.find("App").setState({ isLoggedIn: false })
    expect(wrapper.find("UnauthenticatedApp").length).toBe(1);
    expect(wrapper.find("AuthenticatedApp").length).toBe(0);
  });

  it("renders only the AuthenticatedApp component if the isLoggedIn state is true", () => {
    wrapper.find("App").setState({ isLoggedIn: true })
    expect(wrapper.find("AuthenticatedApp").length).toBe(1);
    expect(wrapper.find("UnauthenticatedApp").length).toBe(0);
  });

  it("passing false to setLoggedIn updates the isLoggedIn state to false", () => {
    wrapper.find("App").instance().setLoggedIn(false);
    expect(wrapper.find("App").state().isLoggedIn).toEqual(false);
  });

  it("passing true to setLoggedIn updates the isLoggedIn state to true", () => {
    wrapper.find("App").instance().setLoggedIn(true);
    expect(wrapper.find("App").state().isLoggedIn).toEqual(true);
  });
})




import React from "react";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";


describe("NotFoundPage", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BrowserRouter><NotFoundPage /></BrowserRouter>);
  })

  it("renders NotFoundPage component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("button redirects to /home if loggedin and / if not logged in", () => {
    wrapper = mount(<BrowserRouter><NotFoundPage isLoggedIn={true} /></BrowserRouter>);
    wrapper.find("button").simulate("click");

    expect(location.href).toEqual("http://localhost/home");

    wrapper = mount(<BrowserRouter><NotFoundPage isLoggedIn={false} /></BrowserRouter>);
    wrapper.find("button").simulate("click");

    expect(location.href).toEqual("http://localhost/");
  })
});





import React from "react";
import { shallow, mount, render } from "enzyme";
import HomePage from "./HomePage";
import { BrowserRouter } from "react-router-dom";
import CommUnityContext from "../../contexts/context";

import mockContext from "../../contexts/mock-context";

it("expect to render HomePage component", () => {
    const wrapper = render(<CommUnityContext.Provider value={mockContext}><BrowserRouter><HomePage /></BrowserRouter></CommUnityContext.Provider>)
    
    expect(wrapper).toMatchSnapshot();
})


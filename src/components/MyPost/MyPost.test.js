import React from "react";
import { render } from "enzyme";
import MyPost from "./MyPost";
import { BrowserRouter } from "react-router-dom";

describe("MyPost", () => {
  it("renders MyPost component", () => {
    const mockProps = {
        date_created: "2020-09-23T20:33:19.724Z",
        id: 40,
        post_type: "request"
    }

    const wrapper = render(
      <BrowserRouter>
        <MyPost {...mockProps} />
      </BrowserRouter>
    );
    
    expect(wrapper).toMatchSnapshot();
  })
})




import React from "react";
import { render } from "enzyme";
import moment from "moment";
import MyPost from "./MyPost";
import { BrowserRouter } from "react-router-dom";

describe("MyPost", () => {
  it("renders MyPost component", () => {
    const mockProps = {
        date_created: moment().format(),
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




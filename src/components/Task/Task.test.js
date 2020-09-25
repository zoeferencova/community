import React from "react";
import { shallow } from "enzyme";
import Task from "./Task";

describe("Task", () => {
    it("renders Task component", () => {
        const mockProps = {
            task: "Picking up supplies"
        }

        const wrapper = shallow(<Task {...mockProps} />);

        expect(wrapper).toMatchSnapshot();
    });
});
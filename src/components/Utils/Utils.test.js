import React from "react";
import { shallow } from "enzyme";
import { ButtonLight, ButtonDark, Input, Label, Textarea, ProfilePicture, Select, Error } from "./Utils";


describe("ButtonLight", () => {
    it("renders ButtonLight component with button text when not loading", () => {
        const wrapper = shallow(<ButtonLight loading="false">Hello</ButtonLight>);

        expect(wrapper).toMatchSnapshot();
    });

    it("renders ButtonLight component with loader icon when loading", () => {
        const wrapper = shallow(<ButtonLight loading="true">Hello</ButtonLight>);

        expect(wrapper).toMatchSnapshot();
    });
});

describe("ButtonDark", () => {
    it("renders ButtonDark component with button text when not loading", () => {
        const wrapper = shallow(<ButtonDark loading="false">Hello</ButtonDark>);

        expect(wrapper).toMatchSnapshot();
    });

    it("renders ButtonDark component with loader icon when loading", () => {
        const wrapper = shallow(<ButtonDark loading="true">Hello</ButtonDark>);

        expect(wrapper).toMatchSnapshot();
    });
});

describe("Input", () => {
    it("renders Input", () => {
        const wrapper = shallow(<Input />);

        expect(wrapper).toMatchSnapshot();
    });
});

describe("Label", () => {
    it("renders Label", () => {
        const wrapper = shallow(<Label />);

        expect(wrapper).toMatchSnapshot();
    });
});

describe("Textarea", () => {
    it("renders Textarea", () => {
        const wrapper = shallow(<Textarea />);

        expect(wrapper).toMatchSnapshot();
    });
});

describe("ProfilePicture", () => {
    const mockProps = {
        first_name: "Zoe"
    }

    it("renders ProfilePicture", () => {
        const wrapper = shallow(<ProfilePicture {...mockProps} />);

        expect(wrapper).toMatchSnapshot();
    });
});

describe("Select", () => {
    it("renders Select", () => {
        const wrapper = shallow(<Select />);

        expect(wrapper).toMatchSnapshot();
    });
});

describe("Error", () => {
    const mockProps = {
        message: "Error"
    }

    it("renders Error", () => {
        const wrapper = shallow(<Error {...mockProps} />);

        expect(wrapper).toMatchSnapshot();
    });
});




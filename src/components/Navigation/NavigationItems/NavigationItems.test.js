import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import navigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
  it("should render two Navigation Items if not authenticated", () => {
    const wrapper = shallow(<NavigationItems />);
    expect(wrapper.find(navigationItem)).toHaveLength(2);
  });
});

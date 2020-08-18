import React from "react";
import { BurgerBuilder } from "./BurgerBuilder";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />',() => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredientHandler={() => {}}/>);
    })

    it('should have build controls if ingredients are persent', () => {
        wrapper.setProps({ingredients: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })

    it('should have not build controls if ingredients are null', () => {
        wrapper.setProps({ingredients: null});
        expect(wrapper.find(BuildControls)).toHaveLength(0);
    })
})

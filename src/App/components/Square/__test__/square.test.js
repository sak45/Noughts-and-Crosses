import React from 'react';
import { shallow } from 'enzyme';

import Square from '../index';

describe.skip('Square', () => {

    it('renders the props.value passed in ', () => {
        const wrapper = shallow(<Square value='X'/>);
        expect(wrapper.find('button').text()).toEqual('X');
    });

    it('calls the click handler when the button is click', () => {
        const onClickHandler = jest.fn();
        const wrapper = shallow(<Square onClick={onClickHandler}/>);

        wrapper.find('button').simulate('click');
        expect(onClickHandler).toHaveBeenCalled()
    });

});
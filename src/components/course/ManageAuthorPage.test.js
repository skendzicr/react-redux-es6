import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import {ManageAuthorPage} from './ManageAuthorPage';

describe('ManageAuthorPage', () => {
    it('sets error message when trying to delete an author that is assigned to some course', () => {

        const props = {
            author: {
                    id: 'cory-house'
                },
            actions: { deleteAuthor: () => Promise.resolve()},
            courses: [{
                    authorId: "cory-house"
                }]
        };

        const wrapper = mount(<ManageAuthorPage {...props}/>);
        const deleteButton = wrapper.find('input').last();
        expect(deleteButton.prop('type')).toBe('submit');
        deleteButton.simulate('click');
        expect(wrapper.state().errors.delete).toBe('You cannot delete this author. He has assigned courses to him.');
    });
    it('doesn\'t sets error message when trying to delete author without courses', () => {

        const props = {
            author: {
                    id: 'cory-house'
                },
            actions: { deleteAuthor: (event) => Promise.resolve()},
            courses: [{
                    authorId: "radovan-skendzic"
                }]
        };

        const wrapper = mount(<ManageAuthorPage {...props}/>);
        const deleteButton = wrapper.find('input').last();
        expect(deleteButton.prop('type')).toBe('submit');
        deleteButton.simulate('click');
        expect(wrapper.state().errors.delete).toBe('');
    });
});
import expect from 'expect';
import { authorsFormattedForDropdown } from './selectors';

describe('Author Selectors', () => {
    describe('authorsFormattedForDropdown', () => {
        it('should return author data formated for use in a dropdown', () => {
            const authors = [
                {id: 'cory-house', firstName:'Cory', lastName:'House'},
                { id: 'igor-scekic', firstName: 'Igor', lastName: 'Scekic' },
                { id: 'radovan-skendzic', firstName: 'Radovan', lastName: 'Skendzic' }
                
            ];

            const expected = [
                {value: 'cory-house', text:'Cory House'},
                {value: 'igor-scekic', text:'Igor Scekic'},
                {value: 'radovan-skendzic', text:'Radovan Skendzic'}
            ];
            expect(authorsFormattedForDropdown(authors)).toEqual(expected);
        });
    });
});
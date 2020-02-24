import { create, act } from 'react-test-renderer';
import React from 'react';
import ReacDOM from 'react-dom';
import App from './App';

let root;

it('renders render app correctly', () => {
    const div = document.createElement('div');
    ReacDOM.render(<App />, div);
});


it('should create snapshot', () => {
    act(() => {
        root = create(<App />)
    });
    expect(root.toJSON()).toMatchSnapshot();
});
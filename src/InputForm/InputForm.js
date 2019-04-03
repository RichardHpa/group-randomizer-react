import React, { Component } from 'react';
import './InputForm.scss';

class InputForm extends Component {
    render() {
        return (
            <form>
                <p>Input the list of items you want to group. Place each item on a new line.</p>
                <textarea id="names" name="name" placeholder="Enter Names..."></textarea>
            </form>
        );
    }
}

export default InputForm;

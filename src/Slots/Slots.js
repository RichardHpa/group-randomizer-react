import React, { Component } from 'react';
import './Slots.scss';

class Slots extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinning: false
        }
    }

    render() {
        const {spinning} = this.state;
        let button;
        if(spinning){
            button = <button id="stopSpin" type="button" className="btn btn-stop">Stop</button>;
        } else {
            button = <button id="startGroup" type="button" className="btn btn-start">Make Group</button>;
        }
        return (
            <div className="">
                { button }
            </div>
        );
    }
}

export default Slots;

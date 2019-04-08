import React, { Component } from 'react';
import './Slots.scss';
var timerInt;
class Slots extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinning: false,
            names: []
        }
        this.startSpin = this.startSpin.bind(this);
        this.stopSpin = this.stopSpin.bind(this);
    }

    componentDidMount () {
        console.log(this.props)
        this.setState({
            names: this.props.originalNames
        })
    }

    startSpin(){
        this.setState({
            spinning: true
        })
        timerInt = setInterval(
            () => this.tick(),800
        );
    }

    stopSpin(){
        this.setState({
            spinning: false
        });
        clearInterval(timerInt);
    }

    tick(){
        var array = this.state.names;
        array.push(array.shift());
        this.setState({
            names: array
        })
    }

    render() {
        const {spinning} = this.state;
        let button;
        if(spinning){
            button = <button id="stopSpin" type="button" className="btn btn-stop" onClick={this.stopSpin}>Stop</button>;
        } else {
            button = <button id="startGroup" type="button" className="btn btn-start" onClick={this.startSpin}>Make Group</button>;
        }
        return (
            <div className="">
                <div id="slotContainer">
                    {
                        this.props.groups.map((group, i) => {
                            return <div key={i} className="slot">
                                <Slot
                                    names={this.state.names}
                                />
                            </div>
                        })
                    }
                </div>
                { button }
            </div>
        );
    }
}

export default Slots;

class Slot extends Component{
    render(){
        return(
            <ul>
            {
                this.props.names.map((name, i) => {
                    return <li key={i}>{name}</li>
                })
            }
            </ul>
        )
    }
}

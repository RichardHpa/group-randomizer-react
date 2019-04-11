import React, { Component } from 'react';
import './Slots.scss';

class Slots extends Component {
    constructor(props){
        super(props);
        var matches = [], slots = [];
        for (var i = 0; i < this.props.groups[0].length; i++) {
            matches.push(false);
        }

        for (var j = 0; j < this.props.groups.length; j++) {
            var newList = this.randomize(this.props.originalNames);
            let copyList = newList.slice();
            slots[j] = copyList;

        }

        this.state = {
            spinning: false,
            names: this.props.originalNames,
            groups: this.props.groups,
            currentSpin: 0,
            matched: matches,
            slots: slots
        }

        this.startSpin = this.startSpin.bind(this);
        this.stopSpin = this.stopSpin.bind(this);
        this.startOne = this.startOne.bind(this);
    }

    startSpin(){
        const self = this;
        this.setState({
            spinning: true
        });
        self.interval = []
        // for (var i = 0; i < this.state.groups.length; i++) {
        //     this.startOne(i)
        // }

        for (var i = 0; i < this.state.groups.length; i++) {
            let k = i;
            setTimeout(function(){
                self.startOne(k);
            }, 1000 * (k + 1));
        }

    }

    startOne(i){
        const self = this;
        self.interval[i] = setInterval(
            () => this.tick(i),1000
        )
    }

    stopSpin(){
        const self = this;
        for (var i = 0; i < this.state.groups.length; i++) {
            let k = i;
            setTimeout(function(){
                clearInterval(self.interval[k]);
            }, 1000 * (k + 1));
        }
        console.log(this.state);
        this.setState({
            spinning: false
        });
    }

    // handleMatch(slot){
    //     console.log(slot);
    // }

    tick(groupIt){
        let slots = this.state.slots.slice();
        let newGroup = slots[groupIt];
        newGroup.push(newGroup.shift());
        slots[groupIt] = newGroup;
        this.setState({
            slots: slots
        });
    }

    randomize(array){
        var currentIndex = array.length;
        var temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
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
            <div>
                <div id="slotContainer">
                    {
                        this.state.slots.map((group, i) => {
                            return <div key={i} className="slot">
                                <Slot
                                    names={this.state.slots[i]}
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
    constructor(props){
        super(props);
        this.state = {
            names: this.props.names
        }
    }

    render(){
        return(
            <ul>
            {
                this.state.names.map((name, i) => {
                    return <li
                        key={i}
                            >{name}
                        </li>
                })
            }
            </ul>
        )
    }
}

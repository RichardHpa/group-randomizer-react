import React, { Component } from 'react';
import './Slots.scss';

class Slots extends Component {
    constructor(props){
        super(props);
        var matches = [], slots = [];
        for (var i = 0; i < this.props.groups[0].length; i++) {
            matches.push(false);
        }

        for (var j = 0; j < this.props.groups[0].length; j++) {
            var newList = this.randomize(this.props.originalNames);
            let copyList = newList.slice();
            slots[j] = copyList;

        }

        this.state = {
            spinning: false,
            matching: false,
            names: this.props.originalNames,
            groups: this.props.groups,
            matched: matches,
            slots: slots,
            currentSlot: 0,
            currentGroupMatching: 0,
            buttonText: 'Make Group'
        }

        this.startSpin = this.startSpin.bind(this);
        this.stopSpin = this.stopSpin.bind(this);
        this.startOne = this.startOne.bind(this);
    }

    startSpin(){
        console.log(this.state.groups[this.state.currentGroupMatching]);
        const self = this;
        this.setState({
            spinning: true
        });
        self.interval = []
        for (var i = 0; i < this.state.slots.length; i++) {
            let k = i;
            setTimeout(function(){
                self.startOne(k);
            }, 500 * (k + 1));
        }
    }

    startOne(i){
        const self = this;
        self.interval[i] = setInterval(
            () => this.tick(i),500
        )
    }

    stopSpin(){
        const self = this;
        this.setState({
            matching: true,
            buttonText: 'Make Group'
        })
        let slots = this.state.slots
        let numberOfSlots = slots.length;
        let currentGroupMatching = this.state.currentGroupMatching;
        let currentSlot = this.state.currentSlot;
        if(currentSlot === numberOfSlots){
            this.setState({
                spinning: false,
                currentGroupMatching: currentGroupMatching + 1,
                currentSlot: 0,
                matching: false,
                buttonText: 'Make Next Group'
            });
            if(this.state.currentGroupMatching === this.state.groups.length){
                this.setState({
                    buttonText: 'Group Again',
                    currentGroupMatching: 0
                })
            }
            return;
        }

        let expected = this.state.groups[currentGroupMatching][currentSlot];
        let current = slots[currentSlot][0];
        clearInterval(self.interval[currentSlot]);

        if(expected !== current){
            self.slowDown(currentSlot);
        } else {
            this.setState({
                currentSlot:this.state.currentSlot + 1
            });
            self.stopSpin();
        }
    }

    slowDown(slotNum){
        const self = this;
        setTimeout(function(){
            self.tick(slotNum);
            self.stopSpin();
        }, 500);

    }

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
        const {spinning, matching, buttonText} = this.state;
        let button;

        if(matching){
            button = <button id="matchingButton" type="button" className="btn btn-matching" disabled>Grouping.....</button>;
        } else if(spinning){
            button = <button id="stopSpin" type="button" className="btn btn-stop" onClick={this.stopSpin}>Stop</button>;
        } else {
            button = <button id="startGroup" type="button" className="btn btn-start" onClick={this.startSpin}>{buttonText}</button>;
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

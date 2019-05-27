import React, { Component } from 'react';
import './Slots.scss';

class Slots extends Component {
    constructor(props){
        super(props);
        var slots = [];

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
            slots: slots,
            currentSlot: 0,
            currentGroupMatching: 0,
            buttonText: 'Make Group',
            groupsCreated: []
        }

        this.startSpin = this.startSpin.bind(this);
        this.stopSpin = this.stopSpin.bind(this);
        this.startOne = this.startOne.bind(this);
    }

    startSpin(){
        if(this.state.buttonText === 'Randomize Again'){
            var shuffled = this.randomize(this.state.names);
            var j = 0;
            var groups = [];
            for (var i = 0; i < this.props.numberOfGroups; i++) {
                groups.push([]);
            }
            for (var x = 0; x < shuffled.length; x++) {
                groups[j].push(shuffled[x]);
                j++;
                if(j === parseInt(this.props.numberOfGroups)){
                    j = 0;
                }
            }
            this.setState({
                names: shuffled,
                groups: groups
            })
        }

        // console.log(this.state.groups[this.state.currentGroupMatching]);
        const self = this;
        this.setState({
            spinning: true
        });
        self.interval = []
        for (var a = 0; a < this.state.slots.length; a++) {
            let k = a;
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
            let groupsMatched = this.state.groupsCreated;
            groupsMatched.push(this.state.groups[currentGroupMatching]);

            this.setState({
                spinning: false,
                currentGroupMatching: currentGroupMatching + 1,
                currentSlot: 0,
                matching: false,
                buttonText: 'Make Next Group',
                groupsCreated: groupsMatched
            });

            this.props.completedGroups(groupsMatched);

            if(this.state.currentGroupMatching === this.state.groups.length){
                this.setState({
                    buttonText: 'Randomize Again',
                    currentGroupMatching: 0,
                    groupsCreated: []
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

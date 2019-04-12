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
            names: this.props.originalNames,
            groups: this.props.groups,
            matched: matches,
            slots: slots,
            currentSlot: 0,
            currentGroupMatching: 0
        }

        this.startSpin = this.startSpin.bind(this);
        this.stopSpin = this.stopSpin.bind(this);
        this.startOne = this.startOne.bind(this);
    }

    startSpin(){
        console.log(this.state.groups[0]);
        const self = this;
        this.setState({
            spinning: true
        });
        self.interval = []
        for (var i = 0; i < this.state.slots.length; i++) {
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
        // const self = this;
        // for (var i = 0; i < this.state.groups.length; i++) {
        //     let k = i;
        //     setTimeout(function(){
        //         clearInterval(self.interval[k]);
        //     }, 1000 * (k + 1));
        // }
        // console.log(this.state);

        const self = this;
        let slots = this.state.slots
        let numberOfSlots = slots.length;
        let currentGroupMatching = this.state.currentGroupMatching;
        let currentSlot = this.state.currentSlot;
        if(currentSlot === numberOfSlots){
            this.setState({
                spinning: false
            });
            return;
        }
        // if(currentSlot === slotNumbers){
        //     return;
        // }
        let expected = this.state.groups[currentGroupMatching][currentSlot];
        let current = slots[currentSlot][0];
        console.log("needs to stop on " + expected);
        console.log("current is " + current);

        clearInterval(self.interval[currentSlot]);

        if(expected !== current){
            console.log("no match")
            self.slowDown(currentSlot);
        } else {
            this.setState({
                currentSlot:this.state.currentSlot + 1
            });
            self.stopSpin();
        }
        //     setTimeout(function(){
        //         self.tick(currentSlot);
        //         self.stopSpin();
        //     }, 800);
        // } else {
        //     console.log("matched");
        // }






        // console.log(slots[stoppingNum][0])
        // for (var i = 0; i < slotNumbers; i++) {
        //
        //     let k = i;
        //     let expected = this.state.groups[stoppingNum][k];
        //     let current = slots[k][0];
        //     console.log("needs to stop on " + this.state.groups[stoppingNum][k]);
        //     console.log("current is " + slots[k][0]);
        //     clearInterval(self.interval[k]);
        //     // while(expected !== current){
        //         self.tick(k)
        //     // }
        //     // if(expected !== current){
        //     //     self.tick(stoppingNum)
        //     // } else {
        //     //     console.log("match");
        //     //     // stoppingNum++;
        //     // }
        // }


    }

    slowDown(slotNum){
        console.log("need to slow down");
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

import React, { Component } from 'react';
import './Slots.scss';

class Slots extends Component {
    constructor(props){
        super(props);
        var matches = [];
        for (var i = 0; i < this.props.groups[0].length; i++) {
            matches.push(false);
        }
        this.state = {
            spinning: false,
            names: this.props.originalNames,
            groups: this.props.groups,
            currentSpin: 0,
            matched: matches
        }
        this.startSpin = this.startSpin.bind(this);
        this.stopSpin = this.stopSpin.bind(this);
        this.handleMatch = this.handleMatch.bind(this);
    }

    startSpin(){
        this.setState({
            spinning: true
        })
    }

    stopSpin(){
        this.setState({
            spinning: false
        });
    }

    handleMatch(slot){
        console.log(slot);
        // slot.props.matched = true;
        // console.log(slot);
        // console.log(match);
        // this.setState({
        //     currentSpin: this.state.currentSpin + 1
        // })
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
                                    slotNumber={i + 1}
                                    names={this.state.names}
                                    spinning={this.state.spinning}
                                    winningName={this.state.groups[this.state.currentSpin][i]}
                                    matched={false}
                                    handleMatched={this.handleMatch}
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
            slotNumber: this.props.slotNumber,
            winningNameNeeded: this.props.winningName,
            names: [],
            spinning: false
        }
        // console.log(this);
        // console.log("Slot " + this.state.slotNumber + " winner needs to be " + this.props.winningName);
    }

    componentDidMount() {

        setTimeout(() => {
            let newNames = this.randomize(this.props.names);
            console.log(newNames);
            this.setState({
                names: newNames,
            }, () => {
                console.log(this.state);
            });
        }, 1000 * this.props.slotNumber);



        // console.log(this);
        console.log("mount");
    }

    componentDidUpdate(prevProps){
        if(this.props.spinning && !this.state.spinning){
            console.log("spinning");
            this.setState({
                spinning: true
            })
            setTimeout(() => {
                this.startSpin();
            }, 1000 * this.props.slotNumber);
        } else if(this.props.spinning === false && this.state.spinning){
            this.stopSpin();
        }
      //       console.log("START");
      //       this.setState({
      //           spinning: true
      //       });
      //       // this.array = this.props.names;
      //       setTimeout(() => {
      //         this.startSpin();
      //     }, 1000 * this.props.slotNumber);
      // } else if(this.props.spin !== prevProps.spin){
      //     console.log("STOP");
      //     clearInterval(this.interval);
      //     console.log(this);
      // }
    }

    startSpin(){
        console.log(this);
        // console.log("start slot "+this.props.slotNumber);
        // const self = this;
        // self.interval = setInterval(
        //     () => this.tick(),1000
        // )
    }

    tick(){
        console.log(this.state.names);
        // const self = this;
        // var array = self.state.names;
        // array.push(array.shift());
        // self.array = array;
        // this.setState({
        //     names: array,
        // }, () => {
        //     console.log(this.state.names[0])
        // });
    }

    stopSpin(){

        setTimeout(() => {
            this.setState({
                spinning: false
            })
            clearInterval(this.interval);
            console.log("STOP");
        }, 1000 * this.props.slotNumber);


        // this.props.handleMatched(this);
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

    render(){
        return(
            <ul>
                {
                    this.state.names.map((name, i) => {
                        let className;
                        if(i%2 === 0){
                            className = "secondItem";
                        } else {
                            className = "";
                        }
                        return <li
                            key={i}
                            className={className}
                                >{name}
                            </li>
                    })
                }
            </ul>
        )
    }
}

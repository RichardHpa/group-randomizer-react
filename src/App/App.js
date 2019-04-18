import React, { Component } from 'react';
import './App.scss';
import Loader from '../Loader/Loader';
import InputForm from '../InputForm/InputForm';
import Slots from '../Slots/Slots';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            originalNames: [],
            groups: [],
            groupsCreated: false,
            selectedOption: 'numGroup',
            numberOfGroups: 0

        }
        this.handleCreateSlots = this.handleCreateSlots.bind(this);
    }

    componentDidMount () {
        this.setState({
            loading: false
        });
    }

    handleCreateSlots(values){
        this.setState({
            loading: true
        })
        var numberOfGroups;
        // var maxNumber;
        if(values['option'] === 'numGroup'){
            numberOfGroups = values['number'];
            // maxNumber = Math.ceil(values['names'].length / values['number']);
        } else {
            numberOfGroups = Math.ceil(values['names'].length / values['number']);
            // maxNumber = values['number'];
        }
        var shuffled = this.randomize(values['names']);

        var j = 0;
        var groups = [];
        for (var i = 0; i < numberOfGroups; i++) {
            groups.push([]);
        }
        for (var x = 0; x < shuffled.length; x++) {
            groups[j].push(shuffled[x]);
            j++;
            if(j === parseInt(numberOfGroups)){
                j = 0;
            }
        }
        this.setState({
            originalNames: values['names'],
            selectedOption: values['option'],
            numberOfGroups: numberOfGroups,
            groupsCreated: true,
            loading: false,
            groups: groups
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
        const {loading, groupsCreated} = this.state;
        if(loading){
            return(
                <div id="App">
                    <Loader/>
                </div>
            )
        } else {
            return (
                <div id="App">
                    <h1>Random Group Slot Generator</h1>
                    {!groupsCreated && <InputForm
                        createSlots={this.handleCreateSlots}
                    />}
                    {groupsCreated && <Slots
                            originalNames={this.state.originalNames}
                            numberOfGroups={this.state.numberOfGroups}
                            groups={this.state.groups}
                        />}
                </div>
            );
        }

    }
}

export default App;

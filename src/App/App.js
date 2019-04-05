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
            groups: {},
            groupsCreated: false,
            selectedOption: 'numGroup',
            numberOfGroups: 0,

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
        var numberOfGroups
        if(values['option'] === 'numGroup'){
            numberOfGroups = values['number'];
        } else {
            numberOfGroups = Math.ceil(values['names'].length / values['number']);
        }
        var shuffled = this.randomize(values['names']);
        var groups = {};
        for (var k = 1; k <= numberOfGroups; k++) {
            groups['group'+(k)] = [];
        }
        var j = 1;
        for (var i = 0; i < shuffled.length; i++) {
            if(j )
            groups['group'+j].push({
                name: shuffled[i]
            })
            j++;
            if(j === numberOfGroups+1){
                j=1;
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
        const {loading, names, groupsCreated} = this.state;
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
                            names={names}
                        />}
                </div>
            );
        }

    }
}

export default App;

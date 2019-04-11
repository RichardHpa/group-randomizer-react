import React, { Component } from 'react';
import './InputForm.scss';

class InputForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedOption: 'numGroup',
            numberOf: 3,
            names: [],
            errors: {
                names: false,
                numbers: false
            }
        }
        this.createNames = this.createNames.bind(this);
        this.changeOption = this.changeOption.bind(this);
        this.changeNum = this.changeNum.bind(this);
        this.createSlots = this.createSlots.bind(this);
    }

    changeOption(e){
        this.setState({
            selectedOption: e.target.value
        })
    }

    changeNum(e){
        this.setState({
            numberOf: e.target.value
        })
    }

    createNames(e){
        var value = e.target.value;
        var splitResults = [];
        if (value.length){
            splitResults = value.trim().split('\n');
        }
        for (var i = 0; i < splitResults.length; i++) {
            if(splitResults[i] === ""){
                splitResults.splice(i,1);
            }
        }
        this.setState({
            names: splitResults
        })
    }

    createSlots(e){
        e.preventDefault();
        var errors = {
            names: false,
            numbers: false
        }
        if(this.state.names.length === 0){
            // errors['names'] = true;
        }
        if(!this.state.numberOf){
            errors['numbers'] = true;
        }

        this.setState({
            errors: errors
        });
        if(errors['names'] === false && errors['numbers']  === false){
            var values = {
                names: this.state.names,
                option: this.state.selectedOption,
                number: this.state.numberOf
            }
            this.props.createSlots(values);
        }
    }

    render() {
        const {errors} = this.state;
        return (
            <form onSubmit={this.createSlots}>
                <p>Input the list of items you want to group. Place each item on a new line.</p>
                <textarea
                    id="names"
                    name="name"
                    placeholder="Enter Names..."
                    className={(errors.names ? 'error' : '')}
                    onChange={this.createNames}
                    defaultValue="Andy&#13;Liam&#13;John&#13;Brayden&#13;Simon&#13;Ryley&#13;Matt&#13;Larissa&#13;Katherine&#13;Ruby&#13;Sophie&#13;Emma&#13;Yana&#13;Annie&#13;Antonia"
                    ></textarea>
                <div className="formRow">
                    <div className="formCol">
                        <label className="inputContainer">Number of Groups
                            <input type="radio" checked={this.state.selectedOption === 'numGroup'} name="type" value="numGroup" onChange={this.changeOption}/>
                            <span className="checkmark"></span>
                        </label>
                        <label className="inputContainer">Max Number in Groups
                            <input type="radio" checked={this.state.selectedOption === 'maxNum'} name="type" value="maxNum" onChange={this.changeOption}/>
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className="formCol">
                        <input
                            id="numberValue"
                            type="number"
                            className={(errors.numbers ? 'error' : '')}
                            name="number"
                            value={this.state.numberOf}
                            min="1"
                            onChange={this.changeNum}
                        />
                    </div>
                </div>
                <button type="submit" name="button" className="btn">Randomize</button>
            </form>
        );
    }
}

export default InputForm;

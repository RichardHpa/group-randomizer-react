import React, { Component } from 'react';
import './App.scss';
import Loader from '../Loader/Loader';
import InputForm from '../InputForm/InputForm';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount () {
        this.setState({
            loading: false
        });
    }


    render() {
        const {loading} = this.state;

        return (
            <div id="App">
                <h1>Random Group Slot Generator</h1>
                { loading && <Loader /> }
                {!loading && <InputForm />}
            </div>
        );
    }
}

export default App;

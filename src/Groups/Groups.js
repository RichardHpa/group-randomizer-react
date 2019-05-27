import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import './Groups.scss';

class Groups extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: true,
            groups: []
        }
        this.handleToggle = this.handleToggle.bind(this);
    }

    componentWillReceiveProps(){
        // console.log(this.props);
    }

    componentDidUpdate(){
        // console.log(this.props);
        // this.setState({
        //     groups: this.props.groups
        // })
    }

    handleToggle(){
        this.setState(prevState => ({
          open: !prevState.open
        }));
    }

    render() {
        const {open} = this.state;
        var arrow;
        if(open){
            arrow = <FontAwesomeIcon className="icon" icon={faChevronRight} />;
        } else {
            arrow = <FontAwesomeIcon className="icon" icon={faChevronLeft} />;
        }
        return (
            <div className={(open ? 'groups open' : 'groups')}>
                <div className="handle" onClick={this.handleToggle}>
                    {arrow}
                </div>
                <div className="groupLists">
                    <h2>Groups</h2>
                    {
                        this.props.groups.map((group, i) => {
                            return (
                                <div className="group" key={group}>
                                    <h3>Group {i+1}</h3>
                                    <ul className="listName">
                                        {group.map((name) => {
                                            return (
                                                <li key={name}>{name}</li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Groups;

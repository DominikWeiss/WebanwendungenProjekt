import React from 'react';
import { connect } from 'react-redux';
import { createResource } from 'redux-json-api';
import { Link, Redirect } from "react-router-dom";

class New extends React.Component {

    constructor(props) { // define the initial state of the component
        super(props);
        this.state = {
            code: '',
            name: '',
            semester: 'WS18/19',
            created: false
        }
    }

    // use a number of event listeners to update the state when the user provides input
    setCode = (ev) => {
        this.setState({
            code: ev.target.value
        });
    }

    setName = (ev) => {
        this.setState({
            name: ev.target.value
        });
    }

    setSemester = (ev) => {
        this.setState({
            semester: ev.target.value
        });
    }

    createModule = (ev) => {
        ev.preventDefault();
    
        let component = this;
        this.props.dispatch(createResource({
            type: 'modules',
            attributes: {
                code: this.state.code,
                name: this.state.name,
                semester: this.state.semester
            },
            relationships: {
                teacher: {
                    data: {
                        type: 'users',
                        id: 1
                    }
                }
            }
        })).then((data) => {
            component.setState({
                created: true
            });
        });
    }

    /**
     * Render the component
     */
    render() {
        if(this.state.created) {
            return (
                <Redirect to="/modules"/>
            )
        } else {
            return (
                <div>
                <div className="grid-x grid-padding-x">
                  <h1 className="cell">Create new Module</h1>
                </div>
                  <form className="grid-x grid-padding-x" onSubmit={this.createModule}>
                    <div className="cell large-4">
                      <label>Code
                        <input type="text" onChange={this.setCode}/>
                      </label>
                      <label>Name
                        <input type="text" onChange={this.setName}/>
                      </label>
                      <label>Semester
                        <select onChange={this.setSemester}>
                          <option value="WS18/19">Wintersemester 18/19</option>
                          <option value="SS18">Summersemester 18</option>
                        </select>
                      </label>
                      <div className="text-right">
                        <Link to="/modules" className="secondary button">Don't Create</Link>
                        <button className="button">Create</button>
                      </div>
                    </div>
                  </form>
                </div>
            )
        }
    }
}

export default connect()(New); // inject the store into our component
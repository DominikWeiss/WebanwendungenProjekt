import React from 'react';
import { connect } from 'react-redux';
import { readEndpoint, updateResource } from 'redux-json-api';
import { Link, Redirect } from "react-router-dom";

class Edit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            code: null,
            name: null,
            semester: null,
            updated: false
        }
    }

    componentDidMount() {
        this.props.dispatch(readEndpoint('modules/' + this.props.match.params.mid)).then(function(state) {
            state.dispatch(readEndpoint('users/' + state.body.data.relationships.teacher.data.id));
        });
    }

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

    updateModule = (ev) => {
        ev.preventDefault();
        let component = this;
        let module = this.props.modules[this.props.match.params.mid];
        let code = this.state.code || module.attributes.code;
        let name = this.state.name || module.attributes.name;
        let semester = this.state.semester || module.attributes.semester;
        this.props.dispatch(updateResource({
            type: 'modules',
            id: module.id,
            attributes: {
                code: code,
                name: name,
                semester: semester
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
                updated: true
            });
        });
    }

    /**
     * Render the component
     */
    render() {
        if(this.state.updated) {
            let path = '/modules/' + this.props.match.params.mid;
            return (
                <Redirect to={path}/>
            )
        } else {
            if (this.props.modules && this.props.modules[this.props.match.params.mid]) {
                let module = this.props.modules[this.props.match.params.mid];
                let code = this.state.code || module.attributes.code;
                let name = this.state.name || module.attributes.name;
                let semester = this.state.semester || module.attributes.semester;
                let abortPath = '/modules/' + module.id;
                return (
                    <div>
                      <div className="grid-x grid-padding-x">
                        <h1 className="cell">Edit {module.attributes.name}</h1>
                      </div>
                      <form className="grid-x grid-padding-x" onSubmit={this.updateModule}>
                        <div className="cell large-4">
                          <label>Code
                            <input type="text" value={code} onChange={this.setCode}/>
                          </label>
                          <label>Name
                            <input type="text" value={name} onChange={this.setName}/>
                          </label>
                          <label>Semester
                            <select value={semester} onChange={this.setSemester}>
                              <option value="WS18/19">Wintersemester 18/19</option>
                              <option value="SS18">Summersemester 18</option>
                            </select>
                          </label>
                          <div className="text-right">
                            <Link to={abortPath} className="secondary button">Don't Update</Link>
                            <button className="button">Update</button>
                          </div>
                        </div>
                      </form>
                    </div>
                )
            } else {
                return (
                    <div>Loading...</div>
                )
            }
        }
    }
}

function mapStateToProps(state) {
    let props = {
        modules: null,
        users: null
    }
    if (state.api && state.api.modules) {
        props.modules = {};
        state.api.modules.data.forEach((module) => {
            props.modules[module.id] = module;
        });
    }
    if (state.api && state.api.users) {
        props.users = {};
        state.api.users.data.forEach((user) => {
            props.users[user.id] = user;
        });
    }
    return props;
}

export default connect(mapStateToProps)(Edit);
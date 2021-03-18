import React from 'react';
import { connect } from 'react-redux';
import { readEndpoint } from 'redux-json-api';
import { Link } from "react-router-dom";

class View extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(readEndpoint('modules/' + this.props.match.params.mid)).then(function(state) { // access the dynamic component in our URL
            state.dispatch(readEndpoint('users/' + state.body.data.relationships.teacher.data.id));
        });
    }

    /**
     * Render the component
     */
    render() {
        if (this.props.modules && this.props.modules[this.props.match.params.mid]) {
            let module = this.props.modules[this.props.match.params.mid];
            let user = {
                attributes: {}
            };
            if (this.props.users && this.props.users[module.relationships.teacher.data.id]) {
                user = this.props.users[module.relationships.teacher.data.id];
            }
            let editPath = '/modules/' + module.id + '/edit';
            return (
                <div>
                  <main className="grid-container">
                    <div className="grid-x grid-padding-x">
                      <div className="cell">
                        <h1>{module.attributes.code} {module.attributes.name}</h1>
                        <dl>
                          <dt>Semester</dt>
                          <dd>{module.attributes.semester}</dd>
                          <dt>Contact</dt>
                          <dd>{user.attributes.email}</dd>
                        </dl>
                        <div>
                          <Link to={editPath} className="button">Edit</Link>
                        </div>
                      </div>
                    </div>
                  </main>
                </div>
            )
        } else {
            return (
                <div>Loading...</div>
            )
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

export default connect(mapStateToProps)(View);
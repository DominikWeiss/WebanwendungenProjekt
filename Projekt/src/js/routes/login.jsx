import React from 'react';

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loginValid: true
        }
    }

    updateEmail = (ev) => {
        this.setState({
            email: ev.target.value
        });
    }

    updatePassword = (ev) => {
        this.setState({
            password: ev.target.value
        });
    }

    handleLogin = (ev) => {
        ev.preventDefault();
        if (this.state.email === 'test@example.com' && this.state.password === 'password') {
            this.setState({
                loginValid: true
            });
        } else {
            this.setState({
                loginValid: false
            });
        }
    }

    /**
     * Render the component
     */
    render() {
        let errorTag = null;
        let errorLabel = null;
        let errorInput = null;
        if (!this.state.loginValid) {
            errorTag = (
                <span className="form-error is-visible">No user exists with the e-mail address {this.state.email} or the password is incorrect.</span>
            );
            errorLabel = 'is-invalid-label';
            errorInput = 'is-invalid-input';
        }
        return (
            <main className="grid-container-x small callout">
              <h1>Login</h1>
              <form action="index.html" onSubmit={this.handleLogin}>
                <div>
                  <label className={errorLabel}>E-Mail Address
                    <input type="email" name="email" placeholder="Your e-mail address" tabIndex="1" required="required" value={this.state.email} onChange={this.updateEmail} className={errorInput} />
                    {errorTag}
                  </label>
                </div>
                <div>
                  <label className={errorLabel}>Password
                    <input type="password" name="password" placeholder="Your password" tabIndex="2" required="required" value={this.state.password} onChange={this.updatePassword} className={errorInput} />
                    {errorTag}
                  </label>
                </div>
                <div className="text-right">
                  <button tabIndex="3" className="button">Login</button>
                </div>
              </form>
            </main>
        )
    }
}
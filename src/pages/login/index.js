import React, { Component } from 'react';
import api from '../../services/api';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false,
            isLoading: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    async handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password, returnUrl } = this.state;

        // stop here if form is invalid
        if (!(username && password)) {
            return;
        }

        this.setState({ isLoading: true });

        const response = await api.post(`/login?delay=2`, {username, password}).then(
            resp => resp.data,
            error => this.setState({ error, loading: false })
        );

        console.log(response.token);
        api.defaults.headers.common['Authorization'] = `bearer ${response.key}`;

        if(typeof response.token != "undefined") {
            const { from } = this.props.location.state || { from: { pathname: "/users" } };
            console.log(from);
            this.props.history.push(from);
        } 
    }

    render() {
        const { username, password, submitted, isLoading, error } = this.state;

        if(isLoading) {
            return(
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Usuários</h5>
                        <div className="text-center align-middle">
                            <div className="spinner-border align-middle" role="status">
                                <span className="sr-only align-middle">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Login</h5>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                            <label htmlFor="username">Usuário</label>
                            <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                            {submitted && !username &&
                                <div className="help-block">Digite um usuário</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                            <label htmlFor="password">Senha</label>
                            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                            {submitted && !password &&
                                <div className="help-block">Digite uma senha</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" disabled={isLoading}>Login</button>
                        </div>
                        {error &&
                            <div className={'alert alert-danger'}>{error}</div>
                        }
                    </form>
                </div>
            </div>
        );
    }
}
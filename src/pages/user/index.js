import React, { Component } from 'react';
import api from '../../services/api';

export default class User extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        user: {},
        isLoading: true,
        sucesso: {},
    };

    async componentDidMount() {
        const { id } = this.props.match.params;

        const response = await api.get(`/users/${id}?delay=2`);

        this.setState({ user: response.data.data, isLoading: false });
    }

    handleSubmit(event) {
        event.preventDefault();

        const first_name  = this.first_name.value;
        const last_name   = this.last_name.value;

        const data = {
            first_name,
            last_name
        }

        this.updateUser(data);
    }

    async updateUser(data) {
        const{ id } = this.props.match.params;

        this.setState({
            isLoading: true,
        });

        const response = await api.put(`/users/${id}?delay=2`, {data}).then(resp => resp.data);

        this.setState({ isLoading: false, user: data, sucesso: response });

        if(this.state.sucesso.updatedAt) {
            alert("Usuário Atualizado com sucesso");
        }
    }
    
    render() {
        const { user, isLoading, sucesso } = this.state;

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
                    <h5 className="card-title">Editar Usuário</h5>
                    <div className="user-info">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Nome</label>
                                <input type="text" className="form-control" id="fisrtName" placeholder="Digite o nome do usuário" ref={(input) => this.first_name = input} defaultValue={user.first_name}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Sobrenome</label>
                                <input type="text" className="form-control" id="lastName" placeholder="Digite o sobrenome do usuário" ref={(input) => this.last_name = input} defaultValue={user.last_name}/>
                            </div>
                            <button type="submit" className="btn btn-primary">Atualizar</button>
                        </form> 
                    </div>    
                </div>
            </div>
            
        );
    }
}
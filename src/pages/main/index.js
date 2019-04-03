import React, { Component } from 'react';
import api from '../../services/api';
import "./styles.css";

import { Link } from 'react-router-dom';

export default class Main extends Component {
    state = {
        users: [],
        listInfo: {},
        page: 1,
        isLoading: true,
    }

    componentDidMount() {
        this.loadUsers();
    }

    loadUsers = async (page = 1) => {
        if(typeof this.props.location.search != 'undefined') {
            const paramsString = this.props.location.search;
            const params = new URLSearchParams(paramsString);
            page = params.get('page');
        }

        const response = await api.get(`/users?page=${page}&delay=2`);

        const { data, ...listInfo } = response.data

        this.setState({ users: data, listInfo, page, isLoading: false });
    };

    async deleteUser(id) {

        this.setState({ isLoading: true });

        var verification = window.confirm("Deseja mesmo excluir esse usuário?");

        if(verification) {
            const response = await api.delete(`/users/${id}?delay=2`).then(resp => resp.status);
            
            if(response == 204) {
                alert("Usuário excluído com sucesso!");
            }
        } else {
            alert("Exclusão cancelada.");   
        }

        this.setState({ isLoading: false });
    };

    prevPage = () => {
        this.setState({isLoading: true});

        const { page } = this.state;

        if (page === 1) return;

        const pageNumber = page - 1;

        this.loadUsers(pageNumber)
    }

    nextPage = () => {
        this.setState({isLoading: true});

        const { page, listInfo } = this.state;

        if (page === listInfo.total_pages) return;

        const pageNumber = page + 1;

        this.loadUsers(pageNumber)
    }
    
    render() {
        const { users, page, listInfo, isLoading } = this.state;

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
                    <h5 className="card-title">Usuários</h5>
                    <div className="users-list">
                        {users.map(user => (
                            <div className="row mt-3" key={user.id}>
                                <div className="col-md-12">
                                    <div className="media">
                                        <img src={user.avatar} className="mr-3" alt={user.first_name} />
                                        <div className="media-body">
                                            <div className="row">
                                                <div className="col-md-10">
                                                    <h5 className="mt-0">{user.first_name}</h5>
                                                    {user.last_name}
                                                </div>

                                                <div className="col-md-2">
                                                    <Link className="btn btn-primary text-light mr-2" to={`/users/${user.id}`}>Editar</Link>
                                                    <a className="btn btn-danger text-light" onClick={() => this.deleteUser(user.id)}>Excluir</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <a className="page-link" href="#" onClick={this.prevPage} disabled={page === 1}>Anterior</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#" onClick={this.nextPage} disabled={page === listInfo.total_pages}>Próxima</a>
                        </li>
                    </ul>
                </div>
            </div> 
        ) 
    }
}
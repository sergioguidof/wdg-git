import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/main';
import User from './pages/user';
import Login from './pages/login';
import Error404 from './pages/error404';

const Routes = () => (
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/users" component={Main} />
        <Route path="/users/:id" component={User} />
        <Route component={Error404} />
    </Switch>
    </BrowserRouter>
);

export default Routes;
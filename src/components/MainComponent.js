import React, { Component } from 'react';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Colors from './ColorsComponent';
import SpringMass from './SpringMassComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
    };
};

class Main extends Component {

    render() {

        const HomePage = () => {
            return (
                <Home />
            );
        };

        return (
        <div>
            <Header />
            <Switch>
                <Route path='/home' component={HomePage} />
                <Route exact path='/colors' component={Colors} />
                <Route exact path='/springmass' component={SpringMass} />
                <Redirect to='/home' />
            </Switch>
        </div>
        );
    };
}

export default withRouter(connect(mapStateToProps)(Main));
//export default Main;

import React, { Component } from 'react';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Guide from './GuideComponent';
import Colors from './ColorsComponent';
import SpringMass from './SpringMassComponent';
import { Switch, Route, Redirect } from 'react-router-dom';

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
                <Route exact path='/guide' component={Guide} />
                <Route exact path='/spectrum' component={Colors} />
                <Route exact path='/oscillator' component={SpringMass} />
                <Redirect to='/home' />
            </Switch>
        </div>
        );
    };
}

export default Main;

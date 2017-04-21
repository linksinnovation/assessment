import React from 'react';
import Header from '../components/contentheader/ContentHeader';
import Content from '../components/content/Content';
import Footer from '../components/contentfooter/ContentFooter';
import Login from '../components/login/Login';

import LoginStore from '../stores/LoginStore';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = this._getLoginState();
    }

    _getLoginState() {
        return {'isLoggedIn': LoginStore.isLoggedIn()};
    }

    _onChange(){
        this.setState(this._getLoginState());
    }

    componentDidMount(){
        this.changeListener = this._onChange.bind(this);
        LoginStore.addChangeListener(this.changeListener);
    }

    componentWillUnmount(){
        LoginStore.removeChangeListener(this.changeListener);
    }

    render() {
        if (this.state.isLoggedIn) {
            return (
                <div id='app-component'>
                    <Header />
                    <Content {...this.props} />
                    <Footer />
                </div>
            );
        } else {
            return <Login />
        }
    }
}
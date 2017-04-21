import React from 'react';
import RestService from '../../../services/RestService';
import HistoryService from '../../../services/HistoryService';
import If from '../../widget/if/If';

export default class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    componentDidMount() {
        this._loadUser();
    }

    _loadUser() {
        var self = this;
        RestService
            .get('/api/user')
            .done(function (data) {
                self.setState({data: data});
            });
    }

    _changePage(e) {
        e.preventDefault();
        HistoryService
            .get()
            .pushState(
                null,
                e.currentTarget.getAttribute('href')
            );
    }

    render() {
        return (
            <div className="main">
                <div className="side-nav">
                    <ul>
                        <li>
                            <span>USER PROFILE</span>
                        </li>
                        <li>
                            <a href="/user-profile" className="no-underline" onClick={this._changePage.bind(this)}><i className="fa fa-user"></i>Profile</a>
                        </li>
                        <li>
                            <a href="/user-avatar" className="no-underline" onClick={this._changePage.bind(this)}><i className="fa fa-picture-o"></i>Avatar</a>
                        </li>
                    </ul>

                    <If test={this.state.data.type == 'ISERVICE'}>
                        <ul>
                            <li>
                                <span>INSTRUCTOR PROFILE</span>
                            </li>
                            <li>
                                <a href="/instructor-profile" className="no-underline" onClick={this._changePage.bind(this)}><i className="fa fa-users"></i>Instructor</a>
                            </li>
                        </ul>
                    </If>
                </div>
                <div className="form-wrapper">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

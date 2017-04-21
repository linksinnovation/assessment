import './usermanage.scss';
import React from 'react'

import UserList from '../../../widget/userlist/UserList';

import RestService from '../../../../services/RestService';
import HistoryService from '../../../../services/HistoryService';

export default class UserManage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            search: ''
        };
    }

    componentDidMount() {
        this._user();
        this._loadUser();
    }

    _user() {
        RestService
            .get('/api/user')
            .done(function (data) {
                if (!(data.authorities[0].authority == 'Super Administrator')) {
                    HistoryService.get().pushState(null,'/');
                }
            });
    }

    _loadUser() {
        var self = this;
        RestService
            .get('/api/listusers/p/0')
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

    _nextPage(e) {
        e.preventDefault();
        var data = {
            name: this.state.search,
            page: (this.state.data.number + 1)
        }

        if (!this.state.data.last) {
            RestService
                .post("/api/user/search", data)
                .done(function (data) {
                    this.setState({data: data, search: this.refs.search.value});
                }.bind(this));
        }
    }

    _previousPage(e) {
        e.preventDefault();
        var data = {
            name: this.state.search,
            page: (this.state.data.number - 1)
        }

        if (!this.state.data.first) {
            RestService
                .post("/api/user/search", data)
                .done(function (data) {
                    this.setState({data: data, search: this.refs.search.value});
                }.bind(this));
        }
    }

    _search(e) {
        e.preventDefault();
        var data = {
            name: this.refs.search.value,
            page: 0
        }

        RestService
            .post("/api/user/search", data)
            .done(function (data) {
                this.setState({data: data, search: this.refs.search.value});
            }.bind(this))
    }

    render() {
        if (this.state.data.length == 0) {
            return (<div></div>);
        }

        var self = this;

        var nodes = this.state.data.content.map(function (user) {

            return (
                <div key={user.username} className="col-xs-12 col-lg-6" href={'/profile-manage/'+user.username} onClick={self._changePage.bind(this)}>
                    <UserList user={user}/>
                </div>
            );

        });

        return (
            <div className="user-manage">
                <div className="row">
                    <div className="col-xs-12">
                        <form>
                            <div className="input-group">
                                <input type="text" className="form-control" ref="search" placeholder="Search for..."/>
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="submit" onClick={this._search.bind(this)}>
                                    <span className="fa fa-search"/>
                                </button>
                            </span>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row">
                    {nodes}
                </div>
                <nav>
                    <ul className="pager">
                        <li className={'previous'+(this.state.data.first?' disabled':'')}><a href="#" onClick={this._previousPage.bind(this)}><span aria-hidden="true">&larr;</span> Previous</a></li>
                        <li className={'next'+(this.state.data.last?' disabled':'')}><a href="#" onClick={this._nextPage.bind(this)}>Next <span aria-hidden="true">&rarr;</span></a></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

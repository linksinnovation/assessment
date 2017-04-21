import './profilemanage.scss'

import React from 'react';
import HistoryService from '../../../../services/HistoryService';
import RestService from '../../../../services/RestService';
import If from '../../../widget/if/If';

export default class ProfileManage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}
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
            .get('/api/user/' + this.props.params.username)
            .done(function (data) {
                self.setState({data: data});
            });
    }

    _save(e) {
        e.preventDefault();
        var self = this;
        var data

        if(this.state.data.type == 'ISERVICE'){
            data = {
                username: this.state.data.username,
                authority: this.refs.role.value,
            }
        }else{
            data = {
                username: this.state.data.username,
                name: this.refs.name.value,
                level: this.refs.level.value
            }
        }

        RestService
            .post('/api/user/saverole',data)
            .done(function (data) {
                self.setState({data: data});
            });
    }

    _delete(e){
        var data = {
            username: this.state.data.username
        }
        RestService
            .delete('/api/user/delete',data)
            .done(function () {
                HistoryService.get().pushState(null,'/user-manage');
            });
    }

    render() {
        if (!this.state.data.username) {
            return (<div></div>);
        }

        return (
            <div className="profile-manage">
                <div className="row">
                    <div className="col-xs-4"></div>
                    <div className="col-xs-4">
                        <div className="form-group">
                            <img src={'/images/avatar/'+this.state.data.avatar}/>
                        </div>
                    </div>
                    <div className="col-xs-4"></div>
                </div>

                <div className="row">
                    <div className="col-xs-1"></div>
                    <div className="col-xs-10">
                        <div className="form-group input-group-sm">
                            <label htmlFor="title">Name</label>
                            <If test={this.state.data.type == 'ISERVICE'}>
                                <input id="title" className="form-control" type="text" ref="name" readOnly="true" defaultValue={this.state.data.nameEn}/>
                            </If>
                            <If test={this.state.data.type == 'LOCAL'}>
                                <input id="title" className="form-control" ref="name" type="text" defaultValue={this.state.data.nameEn}/>
                            </If>
                        </div>
                    </div>
                    <div className="col-xs-1"></div>
                </div>

                <If test={this.state.data.type == 'ISERVICE'}>
                    <div className="row">
                        <div className="col-xs-1"></div>
                        <div className="col-xs-10">
                            <div className="form-group input-group-sm">
                                <label htmlFor="title">Position</label>
                                <input id="title" className="form-control" type="text" readOnly="true" defaultValue={this.state.data.positionTh}/>
                            </div>
                        </div>
                        <div className="col-xs-1"></div>
                    </div>
                </If>

                <If test={this.state.data.type == 'ISERVICE'}>
                    <div className="row">
                        <div className="col-xs-1">
                        </div>
                        <div className="col-xs-10">
                            <div className="form-group input-group-sm">
                                <label htmlFor="title">Email</label>
                                <input
                                    id="title"
                                    className="form-control"
                                    type="text"
                                    readOnly="true"
                                    defaultValue={this.state.data.email}/>
                            </div>
                        </div>
                        <div className="col-xs-1">
                        </div>
                    </div>
                </If>

                <If test={this.state.data.type == 'ISERVICE'}>
                    <div className="row">
                        <div className="col-xs-1">
                        </div>
                        <div className="col-xs-10">
                            <div className="form-group input-group-sm">
                                <label htmlFor="role">Role</label>
                                <select
                                    className="form-control"
                                    id="role"
                                    ref="role"
                                    defaultValue={this.state.data.authorities[0].authority}>
                                    <option value="User">User</option>
                                    <option value="Instructor">Instructor</option>
                                    <option value="Administrator">Administrator</option>
                                    <option value="Super Administrator">Super Administrator</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-1">
                        </div>
                    </div>
                </If>

                <If test={this.state.data.type == 'LOCAL'}>
                    <div className="row">
                        <div className="col-xs-1">
                        </div>
                        <div className="col-xs-10">
                            <div className="form-group input-group-sm">
                                <label htmlFor="role">Level</label>
                                <select className="form-control" id="role" ref="level" defaultValue={this.state.data.eesgName}>
                                    <option value="C 1">C 1</option>
                                    <option value="C 2">C 2</option>
                                    <option value="C 3">C 3</option>
                                    <option value="C 4">C 4</option>
                                    <option value="C 5">C 5</option>
                                    <option value="C 6">C 6</option>
                                    <option value="C 7">C 7</option>
                                    <option value="C 8">C 8</option>
                                    <option value="C 9">C 9</option>
                                    <option value="C 10">C 10</option>
                                    <option value="C 11">C 11</option>
                                    <option value="C 12">C 12</option>
                                    <option value="C 13">C 13</option>
                                    <option value="UC1">UC1</option>
                                    <option value="UC2">UC2</option>
                                    <option value="UC3">UC3</option>
                                    <option value="COO">COO</option>
                                    <option value="CEO">CEO</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xs-1">
                        </div>
                    </div>
                </If>

                <If test={this.state.data.type == 'ISERVICE'}>
                    <div className="row">
                        <div className="col-xs-4 col-lg-5"></div>
                        <div className="col-xs-4 col-lg-2 input-group-sm col-align-center">
                            <button className="btn btn-success btn-sm" onClick={this._save.bind(this)}>Save</button>
                        </div>
                        <div className="col-xs-4 col-lg-5"></div>
                    </div>
                </If>

                <If test={this.state.data.type == 'LOCAL'}>
                    <div className="row">
                        <div className="col-xs-2 col-lg-5"></div>
                        <div className="col-xs-4 col-lg-1 input-group-sm col-align-center">
                            <button className="btn btn-success btn-sm" onClick={this._save.bind(this)}>Save</button>
                        </div>
                        <div className="col-xs-4 col-lg-1 input-group-sm col-align-center">
                            <button className="btn btn-warning btn-sm" onClick={this._delete.bind(this)}>Delete</button>
                        </div>
                        <div className="col-xs-2 col-lg-5"></div>
                    </div>
                </If>
            </div>
        );
    }
}

import './adduser.scss';
import React from 'react';
import RestService from '../../../../services/RestService';
import HistoryService from '../../../../services/HistoryService';

export default class AddUser extends React.Component{

    componentDidMount(){
        this._loadUser();
    }

    _loadUser() {
        RestService
            .get('/api/user')
            .done(function (data) {
                if (!(data.authorities[0].authority == 'Super Administrator')) {
                    HistoryService.get().pushState(null,'/');
                }
            });
    }

    _addUser(e){
        e.preventDefault();
        if(this._check()){

            var data = {
                username:this.refs.username.value,
                password:this.refs.password.value,
                name:this.refs.name.value,
                level:this.refs.level.value
            }

            RestService.post('/api/user/add',data)
            .done(function(data){
                if(!data){
                    alert("Username already in use.");
                }else{
                    HistoryService
                        .get()
                        .pushState(
                            null,
                            '/user-manage'
                        );
                }
            });
        }
    }

    _check(){
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        var repassword = this.refs.password.value;
        var name = this.refs.name.value;
        var level = this.refs.level.value;

        if(username == "" || password == "" || repassword == "" || name == ""){
            alert("Add user form can not empty.")
            return false;
        }
        if(password != repassword){
            alert("Password not match.")
            return false;
        }
        return true;
    }

    render(){
        return (
            <div className="add-user">

                <div className="row">
                    <div className="col-xs-1"></div>
                    <div className="col-xs-10">
                        <div className="form-group input-group-sm">
                            <label htmlFor="username">Username</label>
                            <input id="username" className="form-control" type="text" ref="username"/>
                        </div>
                    </div>
                    <div className="col-xs-1"></div>
                </div>

                <div className="row">
                    <div className="col-xs-1"></div>
                    <div className="col-xs-10">
                        <div className="form-group input-group-sm">
                            <label htmlFor="password">Password</label>
                            <input id="password" className="form-control" type="password" ref="password"/>
                        </div>
                    </div>
                    <div className="col-xs-1"></div>
                </div>

                <div className="row">
                    <div className="col-xs-1"></div>
                    <div className="col-xs-10">
                        <div className="form-group input-group-sm">
                            <label htmlFor="repassword">Re-enter Password</label>
                            <input id="repassword" className="form-control" type="password" ref="repassword" />
                        </div>
                    </div>
                    <div className="col-xs-1"></div>
                </div>

                <div className="row">
                    <div className="col-xs-1"></div>
                    <div className="col-xs-10">
                        <div className="form-group input-group-sm">
                            <label htmlFor="name">Name</label>
                            <input id="name" className="form-control" type="text" ref="name" />
                        </div>
                    </div>
                    <div className="col-xs-1"></div>
                </div>

                <div className="row">
                    <div className="col-xs-1"></div>
                    <div className="col-xs-10">
                        <div className="form-group input-group-sm">
                            <label htmlFor="role">Level</label>
                            <select className="form-control" id="role" ref="level">
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
                    <div className="col-xs-1"></div>
                </div>

                <div className="row">
                    <div className="col-xs-4 col-lg-5"></div>
                    <div className="col-xs-4 col-lg-2 input-group-sm col-align-center">
                        <button className="btn btn-success btn-sm" onClick={this._addUser.bind(this)}>ADD USER</button>
                    </div>
                    <div className="col-xs-4 col-lg-5"></div>
                </div>

            </div>
        );
    }
}

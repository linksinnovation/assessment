/* global $ */
import './avatar.scss';
import React from 'react';

import RestService from '../../../../services/RestService';

export default class Avatar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            avatar: ''
        };
    }

    componentDidMount(){
        this._loadUser();
    }

    _loadUser() {
        var self = this;
        RestService
            .get('/api/user')
            .done(function (data) {
                self.setState({data: data,avatar: data.avatar});
            });
    }

    _onFileChange(e) {
        e.preventDefault();
        var fileName = e.target.value.replace(/\\/g, '/').replace(/.*\//, '');
        $('#file-display').val(fileName);
    }

    _save(e) {
        e.preventDefault();
        var self = this;
        var $btn = $('#loading-btn').button('loading');

        if (!$('#file-upload')[0].files[0]) {
            alert('File is empty!');
            return;
        }

        var data = new FormData();
        data.append('name', $('#file-display').val());
        data.append('file', $('#file-upload')[0].files[0]);

        RestService
            .avatarUpload(data)
            .done(function (url) {
                self.setState({avatar: url});
                $btn.button('reset');
            });
    }

    render(){
        var self = this;
        if (!this.state.avatar) {
            return (
                <div></div>
            );
        }

        return (
          <div className="avatar-panel">
              <div className="row">
                  <div className="col-xs-4"></div>
                  <div className="col-xs-4">
                      <div className="form-group">
                          <img src={'/images/avatar/'+this.state.avatar}/>
                      </div>
                  </div>
                  <div className="col-xs-4"></div>
              </div>
              <div className="row">
                  <div className="col-xs-2"></div>
                  <div className="col-xs-8">
                      <div className="form-group">
                          <div className="input-group input-group-sm">
                                <span className="input-group-btn">
                                    <span className="btn btn-primary btn-file">
                                        Browse&hellip; <input accept="image/gif,image/jpeg,image/png" id="file-upload" type="file" onChange={this._onFileChange.bind(this)}/>
                                    </span>
                                </span>
                              <input type="text" id="file-display" className="form-control" readOnly="true"/>
                          </div>
                      </div>
                  </div>
                  <div className="col-xs-2"></div>
              </div>

              <div className="row">
                  <div className="col-xs-5"></div>
                  <div className="col-xs-2 input-group-sm col-align-center">
                      <button className="btn btn-success btn-sm" id="loading-btn" data-loading-text="Save..." onClick={this._save.bind(self)}>Save</button>
                  </div>
                  <div className="col-xs-5"></div>
              </div>
          </div>
        );
    }
}
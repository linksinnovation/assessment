/* global $ */
import './imagecover.scss';
import React from 'react';

import RestService from '../../../../services/RestService';

export default class ImageCover extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            cover: ''
        };
    }

    componentDidMount() {
        this._loadCourse();
    }


    _onFileChange(e) {
        e.preventDefault();
        var fileName = e.target.value.replace(/\\/g, '/').replace(/.*\//, '');
        $('#file-display').val(fileName);
    }

    _loadCourse() {
        var self = this;
        RestService
            .get('/api/course/basic/info/' + this.props.params.courseId)
            .done(function (data) {
                self.setState({data: data, cover: data.cover});
            });
    }

    _save(e) {
        e.preventDefault();
        var self = this;

        if (!$('#file-upload')[0].files[0]) {
            alert('File is empty!');
            return;
        }

        var data = new FormData();
        data.append('course', this.state.data.id);
        data.append('name', $('#file-display').val());
        data.append('file', $('#file-upload')[0].files[0]);

        RestService
            .coverUpload(data)
            .done(function (url) {
                self.setState({cover: url});
            });
    }

    render() {
        if (!this.state.cover) {
            return (
                <div></div>
            );
        }

        var self = this;
        return (
            <div className="images-cover">
                <div className="row">
                    <div className="col-xs-2"></div>
                    <div className="col-xs-8">
                        <div className="form-group">
                            <img src={'/images/'+this.state.cover}/>
                        </div>
                    </div>
                    <div className="col-xs-2"></div>
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
                        <button className="btn btn-success btn-sm" onClick={this._save.bind(self)}>Save</button>
                    </div>
                    <div className="col-xs-5"></div>
                </div>
            </div>
        );
    }
}
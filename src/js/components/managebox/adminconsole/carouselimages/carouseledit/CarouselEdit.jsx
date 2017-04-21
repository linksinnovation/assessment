import './carouseledit.scss';
import React from 'react'

import HistoryService from '../../../../../services/HistoryService';
import RestService from '../../../../../services/RestService';

export default class CarouselEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            course: []
        }
    }

    componentDidMount() {
        this._loadUser();
        this._loadCourse();
        this._loadSlide();
        this._initSelect();
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

    _onFileChange(e) {
        e.preventDefault();
        var fileName = e.target.value.replace(/\\/g, '/').replace(/.*\//, '');
        $('#file-display').val(fileName);
    }

    _loadSlide() {
        RestService.get('/api/carousel/' + this.props.params.id).done(function (data) {
            this.setState({data: data});
        }.bind(this));
    }

    _loadCourse() {
        RestService.get('/api/carousel/course').done(function (data) {
            this.setState({course: data});
        }.bind(this));
    }

    _initSelect() {
        $('#course').select2({
            placeholder: "Select a Course"
        });
    }

    _save(e) {
        e.preventDefault();
        var self = this;

        var data = new FormData();
        if ($('#file-upload')[0].files[0]) {
            data.append('name', $('#file-display').val());
            data.append('file', $('#file-upload')[0].files[0]);
        }
        data.append('course', self.refs.course.value);
        data.append('id', this.props.params.id);

        RestService
            .carouselUpload(data)
            .done(function (data) {
                self.setState({data: data});
            });

    }

    _delete(e) {
        e.preventDefault();
        RestService.delete('/api/carousel/' + this.props.params.id).done(function () {
            HistoryService
                .get()
                .pushState(
                    null,
                    '/carousel'
                );
        }.bind(this));
    }

    render() {

        var course = this.state.course.map(function (data) {
            return (
                <option key={data.id} value={data.id}>{data.title}</option>
            );
        })

        return (
            <div className="carousel-edit">
                <div className="row">
                    <div className="slide">
                        <img src={'/images/slide/'+this.state.data.images}/>
                    </div>
                </div>
                <div className="row">
                    <div className="alert alert-warning" role="alert">
                        Best Image quality for slide 1000x250 pixel.
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
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
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <div className="form-group input-group-sm">
                            <label htmlFor="course">Link to Course</label>
                            <select className="form-control" id="course" style={{width:'100%'}} ref="course" defaultValue={this.state.data.course}>
                                {course}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 input-group-sm col-align-center">
                        <div className="btn-group">
                            <button className="btn btn-success btn-sm" onClick={this._save.bind(this)}>Save</button>
                            <button className="btn btn-warning btn-sm" onClick={this._delete.bind(this)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

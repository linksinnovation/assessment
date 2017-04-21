import './dashboard.scss';

import React from 'react';
import CourseBox from '../widget/coursebox/CourseBox';

import HistoryService from '../../services/HistoryService';
import RestService from '../../services/RestService';

export default class DashBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data: []};
    }

    _createCourse(e) {
        e.preventDefault();
        RestService
            .get('/api/course/create')
            .done(function (data) {
                HistoryService
                    .get()
                    .pushState(null, '/course-basic/' + data);
            }.bind(this));
    }

    _loadCourse() {
        RestService
            .get('/api/course')
            .done(function (data) {
                this.setState({data: data});
            }.bind(this));
    }

    componentDidMount() {
        this._loadCourse();
    }

    render() {

        var nodes = this.state.data.map(function (course) {
            course.url = '/course-basic/' + course.id;
            if (course.status == 'DRAFT') {
                course.classname = 'promotion recommend';
            } else if (course.status == 'UNPUBLISH') {
                course.classname = 'promotion recommend';
            } else {
                course.classname = 'promotion new';
            }

            return (
                <div key={course.id} className="col-xs-12 col-sm-6 col-lg-3 col-align-center">
                    <CourseBox data={course}/>
                </div>
            );
        });

        return (
            <div className="dashboard">
                <div className="btn-group pull-right">
                    <button onClick={this._createCourse.bind(this)} className="btn btn-primary">
                        Create Course
                    </button>
                </div>

                <div className="card-box">
                    <div className="row carousel">
                        {nodes}
                    </div>
                </div>
            </div>
        );
    }
}
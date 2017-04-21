import './InstructorReport.scss';
import React from 'react';

import RestService from '../../../../services/RestService';
import HistoryService from '../../../../services/HistoryService';

export default class VideoAmount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            category: [],
            subcategory: [],
            course: []
        };
    }

    componentDidMount() {
        this._loadUser();
        this._loadCategory();
        this._dateRange();
    }

    _loadUser() {
        RestService
            .get('/api/user')
            .done(function (data) {
                if (data.authorities[0].authority == 'User') {
                    HistoryService
                        .get()
                        .pushState(
                            null,
                            '/'
                        );
                }
            });
    }

    _dateRange() {
        $('.input-daterange').datepicker({
            format: 'dd/mm/yyyy',
            clearBtn: true,
            todayHighlight: true
        });
    }

    _loadCategory() {
        RestService
            .get('/api/menu')
            .done(function (data) {
                this.setState({category: data});
            }.bind(this));
    }

    _onChangeCategory() {
        var self = this;
        var category = $.grep(this.state.category, function (c) {
            return c.id == self.refs.category.value;
        });
        if (self.refs.category.value == -1) {
            this.setState({subcategory: []});
        } else {
            this.setState({subcategory: category[0].childs});
        }
        self._loadCourse(self.refs.category.value, null);
    }

    _onChangeSubCateory() {
        this._loadCourse(this.refs.category.value, this.refs.subcategory.value);
    }

    _loadCourse(cat, subcat) {
        var condition = {
            category: cat,
            subcategory: subcat
        }

        RestService
            .post('/api/report/listcourse', condition)
            .done(function (data) {
                this.setState({course: data});
            }.bind(this));
    }

    _viewReport(e) {

        var condition = {};

        if (this.refs.category.value != -1) {
            condition.category = this.refs.category.value;
        }
        if (this.refs.subcategory.value != -1) {
            condition.subcategory = this.refs.subcategory.value;
        }
        if (this.refs.course.value != -1) {
            condition.course = this.refs.course.value;
        }
        if (this.refs.start.value != '') {
            condition.start = this.refs.start.value;
        }
        if (this.refs.end.value != '') {
            condition.end = this.refs.end.value;
        }

        e.preventDefault();
        RestService
            .post('/api/report/instructor', condition)
            .done(function (data) {
                this.setState({data: data});
            }.bind(this));
    }

    _rank(items, prop) {
        var results = {}
        for (var i = 0; i < items.length; i++) {
            var value = items[i][prop];
            var count = (results[value] || 0) + 1;
            results[value] = count;
        }
        return results;
    }

    _toPercent(value, total) {
        if (total == 0) {
            total = 1;
        }
        return ((value / total) * 100).toFixed(2);
    }

    _null2zero(value) {
        if (value == null) {
            value = 0;
        }
        return value;
    }


    render() {

        var self = this;

        var category = this.state.category.map(function (cat) {
            return (<option key={cat.id} value={cat.id}>{cat.name}</option>);
        });

        var subcategory = this.state.subcategory.map(function (cat) {
            return (<option key={cat.id} value={cat.id}>{cat.name}</option>);
        });

        var courselist = this.state.course.map(function (course) {
            return (<option key={course.id} value={course.id}>{course.title}</option>);
        })

        var courseCount = 0;
        var rankCourse = this._rank(this.state.data, 'course');
        var course = null;
        var nodes = this.state.data.map(function (data) {

            var domCourse = null;
            if (course != data.course) {
                courseCount++;
                course = data.course;
                domCourse = <td rowSpan={rankCourse[data.course]}>{data.course}</td>;
            } else {
                domCourse = null;
            }

            var key = Math.random().toString(36).substr(2, 5);
            return (
                <tr key={key}>
                    {domCourse}
                    <td>{data.name}</td>
                    <td>{data.view} of {data.totalLecture} ({self._toPercent(data.view, data.totalLecture)}%)</td>
                    <td>{self._null2zero(data.pass)} of {self._null2zero(data.total)} ({self._toPercent(self._null2zero(data.pass), self._null2zero(data.total))}%)</td>
                </tr>
            );
        })

        return (
            <div className="instructor-report">

                <div className="title">รายงานความคืบหน้าการเข้าชมสื่อการสอนของผู้สอน</div>

                <div className="condition-box">
                    <div className="box">
                        <div className="row">
                            <div className="col-xs-1"></div>
                            <div className="col-xs-5">
                                <div className="form-group input-group-sm">
                                    <label htmlFor="category">Category</label>
                                    <select className="form-control" id="category" ref="category" onChange={this._onChangeCategory.bind(this)}>
                                        <option value="-1">-- All Category --</option>
                                        {category}
                                    </select>
                                </div>
                            </div>
                            <div className="col-xs-5">
                                <div className="form-group input-group-sm">
                                    <label htmlFor="subcategory">Subcategory</label>
                                    <select className="form-control" id="subcategory" ref="subcategory" onChange={this._onChangeSubCateory.bind(this)}>
                                        <option value="-1">-- All Subcategory --</option>
                                        {subcategory}
                                    </select>
                                </div>
                            </div>
                            <div className="col-xs-1"></div>
                        </div>
                        <div className="row">
                            <div className="col-xs-1"></div>
                            <div className="col-xs-10">
                                <div className="form-group input-group-sm">
                                    <label htmlFor="course">Course</label>
                                    <select className="form-control" id="course" ref="course">
                                        <option value="-1">-- All Course --</option>
                                        {courselist}
                                    </select>
                                </div>
                            </div>
                            <div className="col-xs-1"></div>
                        </div>
                        <div className="row">
                            <div className="col-xs-1"></div>
                            <div className="col-xs-10">
                                <label htmlFor="title">Date Range</label>
                                <div className="input-daterange form-group input-group" id="datepicker">
                                    <input type="text" className="input-sm form-control" ref="start" name="start"/>
                                    <span className="input-group-addon">to</span>
                                    <input type="text" className="input-sm form-control" ref="end" name="end"/>
                                </div>
                            </div>
                            <div className="col-xs-1"></div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-align-center">
                                <button className="btn btn-success btn-sm" onClick={this._viewReport.bind(this)}>View Report</button>
                            </div>
                        </div>
                    </div>
                </div>

                <table className="table table-bordered">
                    <thead>
                    <tr className="info">
                        <th>Course</th>
                        <th>Name</th>
                        <th>Progress (Topic)</th>
                        <th>Quiz Score</th>
                    </tr>
                    </thead>
                    <tbody>
                    {nodes}
                    <tr className="success summary-report">
                        <td colSpan="3">Total</td>
                        <td>{courseCount} Course</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
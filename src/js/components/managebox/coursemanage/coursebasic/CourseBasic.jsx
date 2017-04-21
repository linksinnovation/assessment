/*global $ */

import './coursebasic.scss';

import React from 'react';
import RestService from '../../../../services/RestService';
import HistoryService from '../../../../services/HistoryService';

export default class CourseBasic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            category: [],
            subcategory: [],
            publishButton: 'เปิดการใช้งาน'
        };
    }

    componentDidMount() {
        this._loadCategory();
    }

    _loadCategory() {
        RestService
            .get('/api/menu')
            .done(function (data) {
                this.state.category = data;
                this._loadCourse();
            }.bind(this));
    }

    _loadCourse() {
        var self = this;
        RestService
            .get('/api/course/basic/info/' + this.props.params.courseId)
            .done(function (data) {
                var category;
                if (data.category) {
                    category = $.grep(self.state.category, function (c) {
                        return c.id == data.category.id;
                    })[0].childs;
                } else {
                    category = [];
                }

                self.setState({
                    data: data,
                    category: self.state.category,
                    subcategory: category,
                    publishButton: self._checkStatus(data.status)
                });

                $('#permission').selectpicker();
                self._dateRange();
            });
    }

    _toggleStatus(e) {
        e.preventDefault();
        var self = this;
        RestService
            .post('/api/course/status', this.state.data)
            .done(function (data) {
                self.setState({data: data, publishButton: self._checkStatus(data.status)});
            }.bind(this));
    }

    _checkStatus(status) {
        if (status == 'DRAFT' || status == 'UNPUBLISH') {
            return 'เปิดการใช้งาน';
        } else {
            return 'ปิดการใช้งาน';
        }
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
    }

    _save(e) {
        e.preventDefault();
        var $btn = $('#loading-btn').button('loading');
        var course = this.state.data;
        course.title = this.refs.title.value;
        course.subTitle = this.refs.subtitle.value;
        course.details = this.refs.details.value;
        course.category = null;
        course.subCategory = null;
        course.permission = $('#permission').val();
        course.instructorDetails = this.refs.instructor.value;

        if (this.refs.category.value != -1) {
            course.category = {id: this.refs.category.value};
        }
        if (this.refs.subcategory.value != -1) {
            course.subCategory = {id: this.refs.subcategory.value};
        }

        RestService
            .post('/api/course/basic', course)
            .done(function (data) {
                this.setState({data: data});
                $btn.button('reset');
            }.bind(this));

    }

    _deleteCourse(e) {
        e.preventDefault();
        var data = {
            id: this.props.params.courseId
        }

        RestService
            .delete('/api/course', data)
            .done(function () {
                HistoryService
                    .get()
                    .pushState(
                        null,
                        '/instructor-dashboard'
                    );
            });
    }

    _dateRange() {
        $('.input-daterange').datepicker({
            format: 'dd/mm/yyyy',
            clearBtn: true,
            todayHighlight: true
        });
    }

    _spinner() {
        $( "#retest" ).spinner({
            min: 0
        }).width("100%");
        $( "#passscore" ).spinner({
            min: 0,
            max: 100
        });
    }

    render() {
        if (!this.state.data.id) {
            return (<div></div>);
        }
        var self = this;
        var category = this.state.category.map(function (cat) {
            return (<option key={cat.id} value={cat.id}>{cat.name}</option>);
        });

        var subcategory = this.state.subcategory.map(function (cat) {
            return (<option key={cat.id} value={cat.id}>{cat.name}</option>);
        });

        var catSelected = self.state.data.category == null ? -1 : self.state.data.category.id;
        var subSelected = self.state.data.subCategory == null ? -1 : self.state.data.subCategory.id;

        return (
            <div className="course-basic">

                <div className="row">
                    <div className="col-xs-1"></div>
                    <div className="col-xs-10">
                        <div className="form-group input-group-sm">
                            <label htmlFor="title">หัวข้อ</label>
                            <input id="title"
                                   className="form-control"
                                   placeholder="หัวข้อ"
                                   name="title"
                                   type="text"
                                   ref="title"
                                   defaultValue={this.state.data.title}/>
                        </div>
                    </div>
                    <div className="col-xs-1"></div>
                </div>

                <div className="row">
                    <div className="col-xs-1"></div>
                    <div className="col-xs-10">
                        <div className="form-group input-group-sm">
                            <label htmlFor="subtitle">หัวข้อรอง</label>
                            <input id="subtitle"
                                   className="form-control"
                                   placeholder="หัวข้อรอง"
                                   name="title"
                                   type="text"
                                   ref="subtitle"
                                   defaultValue={this.state.data.subTitle}/>
                        </div>
                    </div>
                    <div className="col-xs-1"></div>
                </div>

                <div className="row">
                    <div className="col-xs-1"></div>
                    <div className="col-xs-10">
                        <div className="form-group input-group-sm">
                            <label htmlFor="detail">รายละเอียด</label>
                            <textarea className="form-control" rows="5" id="detail" ref="details" defaultValue={this.state.data.details}></textarea>
                        </div>
                    </div>
                    <div className="col-xs-1"></div>
                </div>

                <div className="row">
                    <div className="col-xs-1"></div>
                    <div className="col-xs-5">
                        <div className="form-group input-group-sm">
                            <label htmlFor="category">หมวดหมู่</label>
                            <select className="form-control" id="category" ref="category" onChange={this._onChangeCategory.bind(this)} defaultValue={catSelected}>
                                <option value="-1">-- SELECT ONE --</option>
                                {category}
                            </select>
                        </div>
                    </div>
                    <div className="col-xs-5">
                        <div className="form-group input-group-sm">
                            <label htmlFor="subcategory">หมวดหมู่ย่อย</label>
                            <select className="form-control" id="subcategory" ref="subcategory" defaultValue={subSelected}>
                                <option value="-1">-- SELECT ONE --</option>
                                {subcategory}
                            </select>
                        </div>
                    </div>
                    <div className="col-xs-1"></div>
                </div>
                <div className="row" style={{ display: 'none'}}>
                    <div className="col-xs-1"></div>
                    <div className="col-xs-10">
                        <div className="form-group input-group-sm">
                            <label htmlFor="permission">Permission Level</label>
                            <select id="permission" ref="permission" className="form-control selectpicker" multiple data-actions-box="true" defaultValue={this.state.data.permission}>
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
                <div className="row" style={{ display: 'none'}}>
                    <div className="col-xs-1"></div>
                    <div className="col-xs-5">
                        <div className="form-group input-group-sm">
                            <label htmlFor="instructor">Instructor Details</label>
                            <select className="form-control" id="instructor" ref="instructor" defaultValue={this.state.data.instructorDetails}>
                                <option value="false">Show Instructor Details</option>
                                <option value="false">Hide Instructor Details</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-xs-6"></div>
                </div>

                <div className="row">
                    <div className="col-xs-1"></div>
                    <div className="col-xs-10">
                        <label htmlFor="title">ช่วงเวลา</label>
                        <div className="input-daterange form-group input-group" id="datepicker">
                            <input type="text" className="input-sm form-control" ref="start" name="start"/>
                            <span className="input-group-addon">ถึง</span>
                            <input type="text" className="input-sm form-control" ref="end" name="end"/>
                        </div>
                    </div>
                    <div className="col-xs-1"></div>
                </div>

                <div className="row">
                    <div className="col-xs-1"></div>
                    <div className="col-xs-5">
                        <label htmlFor="title">จำนวนครั้งในการทำซ้ำ</label>
                        <div className="form-group input-group-sm">
                            <input type="text" className="input-sm form-control" ref="retest" name="retest" id="retest" defaultValue="0" />
                        </div>
                    </div>
                    <div className="col-xs-5">
                        <label htmlFor="title">เกณฑ์การผ่าน</label>
                        <div className="form-group input-group-sm">
                            <input type="text" className="input-sm form-control" ref="passscore" name="passscore" id="passscore" defaultValue="0" />
                        </div>
                    </div>
                    <div className="col-xs-1"></div>
                </div>

                <div className="row">
                    <div className="col-xs-1 col-lg-3"></div>
                    <div className="col-xs-3 col-lg-2 input-group-sm col-align-center">
                        <button className="btn btn-success btn-sm" id="loading-btn" data-loading-text="Save..." onClick={this._save.bind(this)}>บันทึกการตั้งค่า</button>
                    </div>
                    <div className="col-xs-4 col-lg-2 input-group-sm col-align-center">
                        <button className="btn btn-primary btn-sm" onClick={this._toggleStatus.bind(this)}>{this.state.publishButton}</button>
                    </div>
                    <div className="col-xs-3 col-lg-2 input-group-sm col-align-center">
                        <button className="btn btn-warning btn-sm" onClick={this._deleteCourse.bind(this)}>ลบแบบสอบถาม</button>
                    </div>
                    <div className="col-xs-1 col-lg-3"></div>
                </div>

            </div>
        );
    }
}

import './viewamount.scss';
import React from 'react';

import RestService from '../../../../services/RestService';
import HistoryService from '../../../../services/HistoryService';

export default class VideoAmount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            category: [],
            subcategory: []
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
                if (!(data.authorities[0].authority == 'Super Administrator' || data.authorities[0].authority == 'Administrator')) {
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
    }

    _viewReport(e) {

        var condition = {};

        if (this.refs.category.value != -1) {
            condition.category = this.refs.category.value;
        }
        if (this.refs.subcategory.value != -1) {
            condition.subCategory = this.refs.subcategory.value;
        }
        if (this.refs.start.value != '') {
            condition.start = this.refs.start.value;
        }
        if (this.refs.end.value != '') {
            condition.end = this.refs.end.value;
        }

        e.preventDefault();
        RestService
            .post('/api/report/viewamount', condition)
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

    _groupBy(propertyName, array) {
        var groupedElements = {};

        for (var i = 0; i < array.length; i++) {
            var element = array[i];
            var value = element[propertyName];

            var group = groupedElements[value];
            if (group == undefined) {
                group = [element];
                groupedElements[value] = group;
            } else {
                group.push(element);
            }
        }

        return groupedElements;
    }

    _toPercent(value, total) {
        if(total == 0){
            total = 1;
        }
        return ((value / total) * 100).toFixed(2);
    }

    _null2zero(value){
        if(value==null){
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

        var rankUpdateDate = this._rank(this.state.data, 'updateDate');
        var groupUpdateDate = this._groupBy('updateDate',this.state.data);

        var updateDate = null;
        var user = null;
        var nodes = this.state.data.map(function (data) {
            var key = Math.random().toString(36).substr(2, 5);
            return (
                <tr key={key}>
                    <td>{data.name}</td>
                    <td>{data.courseName}</td>
                    <td>{self._toPercent(self._null2zero(data.learningProgress),self._null2zero(data.learningTotal))} %</td>
                    <td>{self._null2zero(data.pass)} of {self._null2zero(data.total)} ({self._toPercent(self._null2zero(data.pass), self._null2zero(data.total))}%)</td>
                    <td>{data.lastLearning}</td>
                </tr>
            );
        });

        var countUser = Object.keys(this._rank(this.state.data, 'name')).length;
        var countLecture = Object.keys(this._rank(this.state.data, 'courseName')).length;

        return (
            <div className="view-amount">

                <div className="title">รายงานแสดงจำนวน และรายชื่อผู้เข้าเรียนรู้ผ่านระบบ</div>

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
                                    <select className="form-control" id="subcategory" ref="subcategory">
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
                        <th>Participant Name</th>
                        <th>Course Name</th>
                        <th>Learning Progress</th>
                        <th>Lastest Quiz score</th>
                        <th>Latest Learning Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {nodes}
                    <tr className="success summary-report">
                        <td>Total</td>
                        <td colSpan="2">{countUser} Participants</td>
                        <td colSpan="2">{countLecture} Courses</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

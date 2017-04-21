import './videoamount.scss';
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
            .post('/api/report/videoamount', condition)
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


    render() {

        var self = this;
        var category = this.state.category.map(function (cat) {
            return (<option key={cat.id} value={cat.id}>{cat.name}</option>);
        });

        var subcategory = this.state.subcategory.map(function (cat) {
            return (<option key={cat.id} value={cat.id}>{cat.name}</option>);
        });

        var totalView = 0;
        var rankUpdateDate = this._rank(this.state.data, 'updateDate');
        var updateDate = null;
        var nodes = this.state.data.map(function (data) {

            totalView += data.view;

            var domUpdateDate = null;
            if (updateDate != data.updateDate) {
                updateDate = data.updateDate;
                domUpdateDate = <td rowSpan={rankUpdateDate[data.updateDate]}>{data.updateDate}</td>;
            } else {
                domUpdateDate = null;
            }

            var key = Math.random().toString(36).substr(2, 5);
            return (
                <tr key={key}>
                    {domUpdateDate}
                    <td>{data.course}</td>
                    <td>{data.view}</td>
                </tr>
            );
        })

        return (
            <div className="video-amount">

                <div className="title">รายงานแสดงจำนวนสื่อการเรียนรู้ และจำนวนผู้ชม</div>

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
                        <th>Date Release</th>
                        <th>Course Name</th>
                        <th>No. of Participant Learning</th>
                    </tr>
                    </thead>
                    <tbody>
                    {nodes}
                    <tr className="success summary-report">
                        <td>Total</td>
                        <td>{this.state.data.length} Course</td>
                        <td>{totalView} Learned</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

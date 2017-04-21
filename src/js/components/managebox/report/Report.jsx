import './report.scss';
import React from 'react';
import HistoryService from '../../../services/HistoryService';
import RestService from '../../../services/RestService';
import If from '../../widget/if/If';

export default class Report extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    componentDidMount() {
        this._loadUser();
    }

    _changePage(e) {
        e.preventDefault();
        HistoryService
            .get()
            .pushState(
                null,
                e.currentTarget.getAttribute('href')
            );
    }

    _loadUser() {
        var self = this;
        RestService
            .get('/api/user')
            .done(function (data) {
                self.setState({data: data});
            });
    }

    render() {
        if (!this.state.data.username) {
            return <div></div>
        }

        return (
            <div className="report">
                <div className="list">
                    <ul>
                        <If test={this.state.data.authorities[0].authority == 'Super Administrator' || this.state.data.authorities[0].authority == 'Administrator'}>
                            <div>
                                <li>
                                    <span>Administrator Report</span>
                                </li>
                                <li>
                                    <a href="/report/video" className="no-underline" onClick={this._changePage.bind(this)}><i className="fa fa-book"></i>รายงานแสดงจำนวนสื่อการเรียนรู้ และจำนวนผู้ชม</a>
                                </li>
                                <li>
                                    <a href="/report/view" className="no-underline" onClick={this._changePage.bind(this)}><i className="fa fa-book"></i>รายงานแสดงจำนวน และรายชื่อผู้เข้าเรียนรู้ผ่านระบบ</a>
                                </li>
                                <li>
                                    <a href="/report/quiz" className="no-underline" onClick={this._changePage.bind(this)}><i className="fa fa-book"></i> รายงานผลการสอบ</a>
                                </li>
                                <li>
                                    <a href="/report/admininstructor" className="no-underline" onClick={this._changePage.bind(this)}><i className="fa fa-book"></i> รายงานแสดงจำนวนผู้สอน</a>
                                </li>
                            </div>
                        </If>
                        <If test={this.state.data.authorities[0].authority == 'Super Administrator' || this.state.data.authorities[0].authority == 'Administrator' || this.state.data.authorities[0].authority == 'Instructor'}>
                            <div>
                                <li>
                                    <span>Instructor Report</span>
                                </li>
                                <li>
                                    <a href="/report/instructor" className="no-underline" onClick={this._changePage.bind(this)}><i className="fa fa-book"></i> รายงานความคืบหน้าการเข้าชมสื่อการสอนของผู้สอน</a>
                                </li>
                            </div>
                        </If>
                        <div>
                            <li>
                                <span>User Report</span>
                            </li>
                            <li>
                                <a href="/report/user" className="no-underline" onClick={this._changePage.bind(this)}><i className="fa fa-book"></i> รายงานความคืบหน้าการเรียนรู้ด้วยตนเอง</a>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        );
    }
}

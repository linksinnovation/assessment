import './coursemanage.scss';

import React from 'react';

import HistoryService from '../../../services/HistoryService';

export default class CourseManage extends React.Component {

    _changePage(e) {
        e.preventDefault();
        HistoryService
            .get()
            .pushState(
                null,
                e.currentTarget.getAttribute('href')
            );
    }

    render() {
        return (
            <div className="main">
                <div className="side-nav">
                    <ul>
                        <li>
                            <span>ข้อมูลแบบสอบถาม</span>
                        </li>
                        <li>
                            <a href={'/course-curriculum/'+this.props.params.courseId} className="no-underline" onClick={this._changePage.bind(this)}><i className="fa fa-book"></i>สื่อการเรียนรู้</a>
                        </li>
                        <li>
                            <a href={'/course-quiz/'+this.props.params.courseId} className="no-underline" onClick={this._changePage.bind(this)}><i className="fa fa-question-circle"></i>แบบสอบถาม</a>
                        </li>
                        <li>
                            <a href={'/course-basic/'+this.props.params.courseId} className="no-underline" onClick={this._changePage.bind(this)}><i className="fa fa-cube"></i>ตั้งค่า</a>
                        </li>
                        <li>
                            <a href={'/course-cover/'+this.props.params.courseId} className="no-underline" onClick={this._changePage.bind(this)}><i className="fa fa-picture-o"></i>ภาพปก</a>
                        </li>
                    </ul>
                </div>
                <div className="form-wrapper">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

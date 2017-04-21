import './courseinstructor.scss';
import React from 'react';
import RestService from '../../../../services/RestService';
import UserSelect from '../../../widget/userselect/UserSelect';

export default class CourseInstructor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            search: []
        };
    }

    componentDidMount() {
        this._loadCourse();
    }

    _loadCourse() {
        var self = this;
        RestService
            .get('/api/course/basic/info/' + this.props.params.courseId)
            .done(function (data) {
                self.setState({data: data});
            });
    }

    _addInstructor(user, e) {
        e.preventDefault();
        var data = {
            course: this.props.params.courseId,
            username: user.username
        };
        RestService
            .post('/api/course/instructor', data)
            .done(function (data) {
                this.state.search.map(function (u, index) {
                    if (u.username == user.username) {
                        this.state.search.splice(index, 1);
                    }
                }.bind(this));
                this.setState({data: data, search: this.state.search});
            }.bind(this));
    }

    _removeInstructor(user, e) {
        e.preventDefault();
        if (this.state.data.instructors.length <= 1) {
            alert("Atlease one instructor must be assign.")
            return;
        }

        var data = {
            course: this.props.params.courseId,
            username: user.username
        };
        RestService
            .delete('/api/course/instructor', data)
            .done(function (data) {
                this.setState({data: data});
            }.bind(this));

    }

    _search(e) {
        e.preventDefault();
        var data = {
            course: this.props.params.courseId,
            search: this.refs.search.value
        };
        RestService
            .post('/api//user/search/instructor', data)
            .done(function (data) {
                this.setState({search: data});
            }.bind(this));
    }

    render() {
        if (!this.state.data.id) {
            return (<div></div>);
        }

        var self = this;

        var instructor = this.state.data.instructors.map(function (instructor) {
            return (
                <UserSelect key={instructor.username} btn="Remove" user={instructor} onClick={self._removeInstructor.bind(self)}/>
            );
        });

        var search = this.state.search.map(function (user) {
            return (
                <UserSelect key={user.username} btn="Add" user={user} onClick={self._addInstructor.bind(self)}/>
            );
        })

        return (
            <div className="course-instructor">
                <div className="row">
                    {instructor}
                </div>
                <div className="row p20px">
                    <div className="col-xs-12">
                        <form>
                            <div className="form-group input-group">
                                <input type="text" ref="search" className="form-control" placeholder="Search for..."/>
                                <span className="input-group-btn">
                                    <button className="btn btn-default" type="submit" onClick={this._search.bind(this)}>
                                        <span className="fa fa-search"/>
                                    </button>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row">
                    {search}
                </div>
            </div>
        );
    }
}
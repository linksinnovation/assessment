import './coursescreen.scss';
import React from 'react'
import CourseBox from '../widget/coursebox/CourseBox';
import RestService from '../../services/RestService';
import If from '../widget/if/If';
import HistoryService from '../../services/HistoryService';

export default class CourseScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data: {content: []}, slide: []};
    }

    shouldComponentUpdate() {
        return true;
    }

    componentDidMount() {
        this._loadCourse();
        this._loadSlide();
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

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this._loadCourse()
        }
    }

    _getUrl() {
        var url;
        if (this.props.location.pathname == '/wishlist') {
            url = '/api/wishlist';
        } else if (this.props.params.search) {
            url = '/api/course/search/' + this.props.params.search;
        } else {
            if (this.props.params.categoryId) {
                url = '/api/category/' + this.props.params.categoryId;
            } else {
                url = '/api/category';
            }
        }
        return url;
    }

    _loadCourse() {
        RestService
            .get(this._getUrl() + '/p/0')
            .done(function (data) {
                this.setState({data: data});
            }.bind(this));
    }

    _nextPage(e) {
        e.preventDefault();
        if (!this.state.data.last) {
            RestService
                .get(this._getUrl() + '/p/' + (this.state.data.number + 1))
                .done(function (data) {
                    this.setState({data: data});
                }.bind(this));
        }
    }

    _previousPage(e) {
        e.preventDefault();
        if (!this.state.data.first) {
            RestService
                .get(this._getUrl() + '/p/' + (this.state.data.number - 1))
                .done(function (data) {
                    this.setState({data: data});
                }.bind(this));
        }
    }

    _loadSlide() {
        RestService.get('/api/carousel').done(function (data) {
            this.setState({slide: data});
            $('.carousel').carousel({
                interval: 10000
            })
        }.bind(this));
    }

    render() {
        var self = this;
        var nodes = this.state.data.content.map(function (course, index) {
            course.url = '/curriculum/' + course.id;
            course.classname = 'promotion new';
            course.status = 'New';
            return (
                <div key={index} className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-align-center">
                    <CourseBox data={course}/>
                </div>
            );
        });

        var slide = this.state.slide.map(function (data, index) {
            if (index == 0) {

                return (
                    <div key={data.id} className="item active">
                        <img href={'/curriculum/'+data.course} src={'/images/slide/'+data.images} onClick={self._changePage.bind(self)}/>
                    </div>
                );
            } else {
                return (
                    <div key={data.id} className="item">
                        <img href={'/curriculum/'+data.course} src={'/images/slide/'+data.images} onClick={self._changePage.bind(self)}/>
                    </div>
                );
            }
        });

        return (
            <div className="course-screen">

                <div className="row">
                    <div className="col-xs-12 col-align-center">
                        <div className="content">

                            <If test={this.state.slide.length != 0}>
                                <div className="row">
                                    <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">

                                        <div className="carousel-inner" role="listbox">
                                            {slide}
                                        </div>

                                        <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                                            <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                        <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                                            <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </div>
                                </div>
                            </If>

                            <div className="row carousel">
                                {nodes}
                            </div>

                            <nav>
                                <ul className="pager">
                                    <li className={'previous'+(this.state.data.first?' disabled':'')}><a href="#" onClick={this._previousPage.bind(this)}><span aria-hidden="true">&larr;</span> Previous</a></li>
                                    <li className={'next'+(this.state.data.last?' disabled':'')}><a href="#" onClick={this._nextPage.bind(this)}>Next <span aria-hidden="true">&rarr;</span></a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
import './coursebox.scss';

import React from 'react'

import HistoryService from '../../../services/HistoryService';
import RestService from '../../../services/RestService';
import If from '../../widget/if/If';

export default class CourseScreen extends React.Component {

    _changePage(e) {
        e.preventDefault();
        HistoryService
            .get()
            .pushState(
                null,
                e.currentTarget.getAttribute('href')
            );
    }

    _capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    _toggleWishlist(e) {
        e.preventDefault();
        RestService
            .post('/api/wishlist', {id: this.props.data.id})
            .done(function () {
                $(e.target).toggleClass('active');
            });

    }

    render() {
        var active = (this.props.data.wishlist) ? 'active' : '';

        var instructor = this.props.data.instructors.map(function (user, index) {
            if (index > 2) {
                return;
            }
            return (
                <span key={user.username} className="avatar">
                    <img src={'/images/avatar/'+user.avatar}/>
                </span>
            );
        });

        return (
            <div className="course-box">
                <div className="wishlist btn btn-sm" onClick={this._toggleWishlist.bind(this)}>
                    <i className={'fa fa-heart wish-icon '+active}></i>
                    <div className="tooltip left">
                        <div className="tooltip-arrow"></div>
                        <div className="tooltip-inner in-wishlist none">Wishlisted</div>
                        <div className="tooltip-inner not-in-wishlist">Wishlist</div>
                    </div>
                </div>
                <a href={this.props.data.url} onClick={this._changePage.bind(this)} className="mask no-underline">
                            <span>
                                <span className="course-info flex-direction-column">
                                    <span className="row-one">{this.props.data.lectures}</span>
                                    <span className="row-two">{this.props.data.hours}</span>
                                </span>
                                <span className="course-thumb pos-relative">
                                    <img src={'/images/'+this.props.data.cover}/>
                                    <span className="avatars-list">
                                        {instructor}
                                    </span>
                                </span>
                                <span className="flex">
                                    <span
                                        className="title ellipsis-2lines">{this.props.data.title}</span>
                                    <span className="body ellipsis-2lines">{this.props.data.subTitle}</span>
                                    <span className="review flex-box">
                                        <span className="review-count">
                                            <span className="rating">
                                                <span style={{width:this.props.data.percentRate+'%'}}></span>
                                            </span>
                                            <span> ({this.props.data.vote})</span>
                                        </span>
                                    </span>
                                    <span className="flex-align-center mh36">
                                        <If test={this.props.data.newStatus || this.props.data.status != 'New'}>
                                            <span className={this.props.data.classname}>
                                                {this._capitalize(this.props.data.status)}
                                            </span>
                                        </If>
                                    </span>
                                </span>
                            </span>
                </a>
            </div>
        );
    }
}
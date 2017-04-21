import './managebox.scss';

import React from 'react';

export default class CourseManage extends React.Component {

    render() {
        return (
            <div className="manage-box margin-20a">
                <div className="row">
                    <div className="col-xs-12 col-align-center">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
import './userlist.scss';
import React from 'react';

export default class UserList extends React.Component {

    render() {
        return (
            <div className="user-list">
                <div className="row">
                    <div className="col-detail">
                        <img className="img-cols" src={'/images/avatar/'+this.props.user.avatar}/>
                        <div className="details-cols">
                            <div>{this.props.user.nameEn}</div>
                            <div className="grant">{this.props.user.authorities[0].authority}</div>
                            <div className="type">{this.props.user.type}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

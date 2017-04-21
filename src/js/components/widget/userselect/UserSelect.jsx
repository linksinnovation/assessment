import './userselect.scss';
import React from 'react';

export default class UserSelect extends React.Component {

    render() {
        return (
            <div className="user-select" id={'cardbox-'+this.props.user.username}>
                <div className="row vcenter">
                    <div className="col-xs-3 col-lg-2 no-padding">
                        <img src={'/images/avatar/'+this.props.user.avatar}/>
                    </div>
                    <div className="col-xs-9 col-lg-10">
                        <div className="row">
                            <div className="col-xs-12 col-lg-10 col-detail">
                                <div>{this.props.user.nameEn}</div>
                                <div className="grant">{this.props.user.authorities[0].authority}</div>
                            </div>
                            <div className="col-xs-12 col-lg-2 col-align-center">
                                <button className="btn btn-primary btn-sm" onClick={this.props.onClick.bind(this,this.props.user)}>{this.props.btn}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
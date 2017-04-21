import './content.scss';

import React from 'react';
import Menu from '../menu/Menu';

export default class Content extends React.Component {
    render() {
        var menuToggle = ($(window).width() > 480) ? '' : 'hide-wrapper-left';
        return (
            <div className={'content '+menuToggle}>
                <div className="main-content">
                    <div className="wrapper-left">
                        <Menu />
                    </div>
                    <div className="wrapper-right flex">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
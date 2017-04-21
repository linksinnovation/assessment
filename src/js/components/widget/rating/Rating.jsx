import './rating.scss';
import React from 'react';
import RestService from '../../../services/RestService';

export default class Rating extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            point: 0
        }
    }

    componentDidMount() {
        this.state.point = this.props.data.point;
        this._drawOver(this.props.data.point);
        this._setSelected();
    }

    _onMouseOver(select) {
        this._drawOver(select);
    }

    _onClick(point, e) {
        e.preventDefault();
        var data = {
            course: this.props.data.id,
            point: point
        }
        RestService
            .post('/api/rating', data)
            .done(function () {
                this.setState({point: point});
            }.bind(this));

    }

    _setSelected() {
        $('.review-widget').mouseleave(function () {
            this._drawOver(this.state.point);
        }.bind(this));
    }

    _drawOver(select) {
        $('.star').removeClass('over');
        switch (select) {
            case 5:
                $('#star-5').addClass('over');
            case 4:
                $('#star-4').addClass('over');
            case 3:
                $('#star-3').addClass('over');
            case 2:
                $('#star-2').addClass('over');
            case 1:
                $('#star-1').addClass('over');
        }
    }

    render() {
        return (
            <div className="review-widget">
                <span id="star-1" className="star" onMouseOver={this._onMouseOver.bind(this,1)} onClick={this._onClick.bind(this,1)}></span>
                <span id="star-2" className="star" onMouseOver={this._onMouseOver.bind(this,2)} onClick={this._onClick.bind(this,2)}></span>
                <span id="star-3" className="star" onMouseOver={this._onMouseOver.bind(this,3)} onClick={this._onClick.bind(this,3)}></span>
                <span id="star-4" className="star" onMouseOver={this._onMouseOver.bind(this,4)} onClick={this._onClick.bind(this,4)}></span>
                <span id="star-5" className="star" onMouseOver={this._onMouseOver.bind(this,5)} onClick={this._onClick.bind(this,5)}></span>
            </div>
        );
    }
}
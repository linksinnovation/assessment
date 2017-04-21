import './carousel.scss';
import React from 'react'
import HistoryService from '../../../../services/HistoryService';
import RestService from '../../../../services/RestService';

export default class Carousel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this._loadUser();
        this._loadSlide();
    }

    _loadUser() {
        RestService
            .get('/api/user')
            .done(function (data) {
                if (!(data.authorities[0].authority == 'Super Administrator')) {
                    HistoryService.get().pushState(null,'/');
                }
            });
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

    _loadSlide() {
        RestService.get('/api/carousel').done(function (data) {
            this.setState({data: data});
        }.bind(this));
    }

    _createSlide(e) {
        e.preventDefault();
        RestService.get('/api/carousel/create').done(function (data) {
            this.setState({data: data});
        }.bind(this));
    }

    render() {

        var self = this;

        var nodes = this.state.data.map(function (data) {
            return (
                <div key={data.id} className="row">
                    <div className="slide">
                        <img src={'/images/slide/'+data.images} href={'/carousel/'+data.id} onClick={self._changePage.bind(this)}/>
                    </div>
                </div>
            );
        });

        return (
            <div className="carousel-images">
                {nodes}
                <div className="row">
                    <div className="col-xs-12 input-group-sm col-align-center">
                        <button className="btn btn-success" onClick={this._createSlide.bind(this)}>Add Slide</button>
                    </div>
                </div>
            </div>
        )
    }
}

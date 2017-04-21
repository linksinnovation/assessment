import React from 'react';
import RestService from '../../../services/RestService';

export default class ViewerJs extends React.Component{

    componentDidMount() {
        RestService
            .get('/api/viewer/' + this.props.data.id)
            .done(function () {
            }.bind(this))
    }

    render(){
        return (
            <iframe src={'/ViewerJS/index.html#../files/'+this.props.url} width='100%' height='358' allowFullScreen webkitallowfullscreen></iframe>
        );
    }
}
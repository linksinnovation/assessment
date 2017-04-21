/* global flowplayer */
import React from 'react';
import engine from 'flowplayer-hlsjs';
import RestService from '../../../services/RestService';

export default class VideoPlayer extends React.Component {

    componentDidMount() {
        this._initPlayer(this.props);

        var self = this;

        flowplayer('#player').on('ready', function () {

            $('.fp-quality-selector').on('click', 'li', function (event) {
                $('.fp-quality-selector>li.active').removeClass('active');
                $(event.target).addClass('active');
                self._changeUrl(self.props, event.target.innerHTML);
            });

        }).on('finish', function () {
            RestService.get('/api/viewer/' + self.props.data.id)
                .done(function () {
                })
        });
    }

    _changeUrl(props, quality) {
        var currentTime = flowplayer('#player').video.time;
        var defaultQuality = (quality == 'Auto') ? '720' : quality;
        var nameQuality = (quality == 'Auto') ? 'abr' : quality;
        flowplayer('#player').stop();
        flowplayer('#player').load({
            qualities: props.data.qualities,
            sources: [
                {
                    type: 'application/x-mpegurl',
                    src: 'http://10.1.2.203/' + props.data.uuid + '/' + defaultQuality + 'p.m3u8'
                }
            ]
        }, function () {
            flowplayer('#player').seek(currentTime,function(){
                flowplayer('#player').resume();
            });
            $('.fp-quality-selector>li.active').removeClass('active');
            $('.fp-quality-selector').find('[data-quality=' + nameQuality + ']').addClass('active');
        });
    }

    _initPlayer(props) {
        engine(flowplayer);
        flowplayer('#player', {
            clip: {
                qualities: props.data.qualities,
                sources: [
                    {type: 'application/x-mpegurl', src: 'http://10.1.2.203/' + props.data.uuid + '/'+props.data.qualities[0]+'p.m3u8'}
                ]
            },
            swf: '/flowplayer/flowplayer.swf',
            embed: false
        });
    }

    render() {
        return (
            <div id="player"></div>
        );
    }
}
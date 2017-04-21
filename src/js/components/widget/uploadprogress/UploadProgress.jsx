import React from 'react';

import LoginStore from '../../../stores/LoginStore';

export default class UploadProgress extends React.Component {

    constructor(props) {
        super(props);
        this.chunkSize = (1024 * 100);
        this.rangeStart = 0;
        this.rangeEnd = this.chunkSize;
        this.fileSize = this.props.file.size;
        this.sliceMethod = 'slice';
        this.uploadRequest = null;
        this.state = {uploadPercent: 0};
    }

    componentDidMount() {
        this._chunkUpload();
    }

    _chunkUpload() {
        if ('mozSlice' in this.props.file) {
            this.sliceMethod = 'mozSlice';
        }
        else if ('webkitSlice' in this.props.file) {
            this.sliceMethod = 'webkitSlice';
        }
        else {
            this.sliceMethod = 'slice';
        }

        this.uploadRequest = new XMLHttpRequest();
        this.uploadRequest.onload = this._upload();
    }

    _onChunkComplete() {
        var uploadPercent = (this.rangeEnd / this.fileSize) * 100;
        this.setState({uploadPercent: uploadPercent.toFixed(2)});

        if (this.rangeEnd === this.fileSize) {
            this.props.callbackParent();
            return;
        }

        this.rangeStart = this.rangeEnd;
        this.rangeEnd = this.rangeEnd + this.chunkSize;
        this._upload();
    }

    _upload() {
        var self = this;
        var chunk;

        if (this.rangeEnd > this.fileSize) {
            this.rangeEnd = this.fileSize;
        }

        chunk = this.props.file[this.sliceMethod](this.rangeStart, this.rangeEnd);
        self.uploadRequest.open('PUT', this.props.url, true);
        self.uploadRequest.overrideMimeType('application/octet-stream');

        self.uploadRequest.setRequestHeader('Authorization', 'bearer ' + LoginStore.token);
        self.uploadRequest.setRequestHeader('Content-Lecture', this.props.lecture);
        self.uploadRequest.setRequestHeader('Content-Name', encodeURIComponent(this.props.file.name));
        self.uploadRequest.setRequestHeader('Content-Start', self.rangeStart);
        self.uploadRequest.setRequestHeader('Content-End', self.rangeEnd);
        self.uploadRequest.setRequestHeader('Content-FileSize', self.fileSize);
        self.uploadRequest.setRequestHeader('Content-Range', 'bytes ' + self.rangeStart + '-' + self.rangeEnd + '/' + self.fileSize);

        self.uploadRequest.send(chunk);
        self.uploadRequest.onreadystatechange = function () {
            if (self.uploadRequest.readyState == 4 && self.uploadRequest.status == 200) {
                self._onChunkComplete();
            }
        }
    }

    render() {
        return (
            <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0"
                     aria-valuemax="100" style={{width: '100%'}}>
                    {this.props.file.name} {this.state.uploadPercent} %
                </div>
            </div>
        );
    }
}
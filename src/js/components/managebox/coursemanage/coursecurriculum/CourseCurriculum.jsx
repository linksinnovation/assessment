/*global $ */
import './coursecurriculum.scss';
import React from 'react';
import UploadProgress from '../../../widget/uploadprogress/UploadProgress';
import RestService from '../../../../services/RestService';

export default class CourseCurriculum extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {sections: []},
            files: {},
            url: ''
        };
    }

    componentDidMount() {
        this._loadCourse();
    }

    _loadCourse() {
        RestService
            .get('/api/course/basic/info/' + this.props.params.courseId)
            .done(function (data) {
                this.setState({data: data});
            }.bind(this));
    }

    _addSection(e) {
        e.preventDefault();
        var section = {
            name: 'หมวดหมู่ใหม่',
            lectures: []
        }
        this.state.data.sections.push(section);
        this._save();
    }

    _addLecture(index) {
        var lecture = {
            name: 'สื่อการสอนใหม่'
        }
        this.state.data.sections[index].lectures.push(lecture);
        this._save();
    }

    _edit(e) {
        e.preventDefault();
        $(e.target).parent().parent().addClass('hide');
        $(e.target).parent().parent().next().removeClass('hide');
    }

    _saveEdit(index, e) {
        e.preventDefault();
        var section;

        if (index.indexOf('-') === -1) {
            section = this.state.data.sections[index];
        } else {
            var position = index.split('-');
            section = this.state.data.sections[position[0]].lectures[position[1]];
        }

        section.name = $('#editbox-' + index).val();
        this._save();
        this._cancle(e);
    }

    _cancle(e) {
        e.preventDefault();
        $(e.target).parent().parent().parent().parent().addClass('hide');
        $(e.target).parent().parent().parent().parent().prev().removeClass('hide');
    }

    _delete(index) {
        if (index.indexOf('.') === -1) {
            this.state.data.sections.splice(index, 1);
        } else {
            var position = index.split('.');
            this.state.data.sections[position[0]].lectures.splice(position[1], 1);
        }
        this._save();
    }

    _save() {
        RestService
            .post('/api/course/basic', this.state.data)
            .done(function () {
                this._loadCourse();
            }.bind(this));
    }

    _chooseFile(type, index, subIndex, e) {
        e.preventDefault();
        $('#' + type + index + '-' + subIndex).click();
    }

    _onFileSelected(url, index, subIndex, e) {
        e.preventDefault();
        this.state.files[index + '-' + subIndex] = e.target.files[0];
        this.state.url = url;

        this.setState(this.state);
    }

    _toggleHide(e) {
        e.preventDefault();
        $(e.target).parent().parent().next().next().toggleClass('hide');
    }

    _uploadHandler(index) {
        delete this.state.files[index];
        RestService
            .get('/api/course/basic/info/' + this.props.params.courseId)
            .done(function (data) {
                this.setState({data:data});
            }.bind(this));
    }

    render() {

        var self = this;

        var nodes = this.state.data.sections.map(function (main, index) {

            var subNodes = main.lectures.map(function (sub, subIndex) {

                var upload;
                if (sub.content && !self.state.files[index + '-' + subIndex]) {
                    upload = (
                        <div className="hide">
                            <div className="from-progress">
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: '100%'}}>
                                        {sub.content}
                                    </div>
                                </div>
                            </div>
                            <div className="form-upload">
                                <div className="row">
                                    <div className="col-sm-4 p20px">
                                        <input id={'videoupload'+index+'-'+subIndex} accept="video/*" type="file" onChange={self._onFileSelected.bind(self,'/api/videoupload',index,subIndex)}/>
                                        <button className="btn btn-primary btn-xs" onClick={self._chooseFile.bind(this,'videoupload',index,subIndex)}>
                                            <i className="fa fa-video-camera mr5"></i>UPLOAD VIDEO
                                        </button>
                                    </div>
                                    <div className="col-sm-4 p20px">
                                        <input id={'pdfupload'+index+'-'+subIndex} accept="application/pdf, application/x-pdf, application/acrobat, applications/vnd.pdf, text/pdf, text/x-pdf" type="file" onChange={self._onFileSelected.bind(self,'/api/pdfupload',index,subIndex)}/>
                                        <button className="btn btn-primary btn-xs" onClick={self._chooseFile.bind(this,'pdfupload',index,subIndex)}>
                                            <i className="fa fa-file-pdf-o mr5"></i>UPLOAD PDF
                                        </button>
                                    </div>
                                    <div className="col-sm-4 p20px">
                                        <input id={'pptupload'+index+'-'+subIndex} accept="application/vnd.openxmlformats-officedocument.presentationml.presentation" type="file" onChange={self._onFileSelected.bind(self,'/api/pptupload',index,subIndex)}/>
                                        <button className="btn btn-primary btn-xs" onClick={self._chooseFile.bind(this,'pptupload',index,subIndex)}>
                                            <i className="fa fa-file-powerpoint-o mr5"></i>UPLOAD POWER POINT
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                } else if (self.state.files[index + '-' + subIndex]) {
                    upload = (
                        <div className="from-progress">
                            <UploadProgress callbackParent={self._uploadHandler.bind(self,index+'-'+subIndex)} url={self.state.url} lecture={sub.id} file={self.state.files[index+'-'+subIndex]}/>
                        </div>
                    );
                } else {
                    upload = (
                        <div className="form-upload hide">
                            <div className="row">
                                <div className="col-sm-4 p20px">
                                    <input id={'videoupload'+index+'-'+subIndex} accept="video/*" type="file" onChange={self._onFileSelected.bind(self,'/api/videoupload',index,subIndex)}/>
                                    <button className="btn btn-primary btn-xs" onClick={self._chooseFile.bind(this,'videoupload',index,subIndex)}>
                                        <i className="fa fa-video-camera mr5"></i>UPLOAD VIDEO
                                    </button>
                                </div>
                                <div className="col-sm-4 p20px">
                                    <input id={'pdfupload'+index+'-'+subIndex} accept="application/pdf, application/x-pdf, application/acrobat, applications/vnd.pdf, text/pdf, text/x-pdf" type="file" onChange={self._onFileSelected.bind(self,'/api/pdfupload',index,subIndex)}/>
                                    <button className="btn btn-primary btn-xs" onClick={self._chooseFile.bind(this,'pdfupload',index,subIndex)}>
                                        <i className="fa fa-file-pdf-o mr5"></i>UPLOAD PDF
                                    </button>
                                </div>
                                <div className="col-sm-4 p20px">
                                    <input id={'pptupload'+index+'-'+subIndex} accept="application/vnd.openxmlformats-officedocument.presentationml.presentation" type="file" onChange={self._onFileSelected.bind(self,'/api/pptupload',index,subIndex)}/>
                                    <button className="btn btn-primary btn-xs" onClick={self._chooseFile.bind(this,'pptupload',index,subIndex)}>
                                        <i className="fa fa-file-powerpoint-o mr5"></i>UPLOAD POWER POINT
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                }

                return (
                    <li key={index+'.'+subIndex} value={index+'.'+subIndex} className="list-group-item">
                        <div>
                            <div className="btn-group pull-right">
                                <button className="btn btn-default btn-xs" onClick={self._edit.bind(this)}>แก้ไข</button>
                                <button className="btn btn-default btn-xs" onClick={self._toggleHide.bind(this)}>อับโหลด</button>
                                <button className="btn btn-default btn-xs" onClick={self._delete.bind(self,index+'.'+subIndex)}>ลบ</button>
                            </div>
                            {sub.name}
                        </div>
                        <div className="hide">
                            <div className="row">
                                <div className="col-xs-8">
                                    <input id={'editbox-'+index+'-'+subIndex} className="form-group" type="text" defaultValue={sub.name} onChange={function(){}}/>
                                </div>
                                <div className="col-xs-4">
                                    <div className="btn-group pull-right">
                                        <button className="btn btn-default btn-xs" onClick={self._saveEdit.bind(self,index+'-'+subIndex)}>บันทึก</button>
                                        <button className="btn btn-default btn-xs" onClick={self._cancle.bind(this)}>ยกเลิก</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {upload}
                    </li>
                );
            });

            return (
                <div className="panel-group" key={index} value={index}>
                    <div className="panel panel-default">
                        <div className="panel-heading clearfix">
                            <div className="btn-group pull-right">
                                <button className="btn btn-default btn-xs" onClick={self._edit.bind(this)}>แก้ไขหมวดหมู่</button>
                                <button className="btn btn-default btn-xs" onClick={self._delete.bind(self,index+'')}>ลบหมวดหมู่</button>
                            </div>
                            <h4 className="panel-title">
                                <a data-toggle="collapse" href={'#collapse'+index}>{main.name}</a>
                            </h4>
                        </div>

                        <div className="panel-heading clearfix hide">
                            <div className="row">
                                <div className="col-xs-8">
                                    <input id={'editbox-'+index} className="form-group" type="text" defaultValue={main.name} onChange={function(){}}/>
                                </div>
                                <div className="col-xs-4">
                                    <div className="btn-group pull-right">
                                        <button className="btn btn-default btn-xs" onClick={self._saveEdit.bind(self,index+'')}>Save</button>
                                        <button className="btn btn-default btn-xs" onClick={self._cancle.bind(this)}>Cancle</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id={'collapse'+index} className="panel-collapse collapse">
                            <ul className="list-group">
                                {subNodes}
                            </ul>
                            <div className="panel-footer">
                                <button className="btn btn-default btn-xs" onClick={self._addLecture.bind(self,index)}>
                                    เพิ่มสือการสอน
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="course-curriculum">
                <div className="sortable">
                    {nodes}
                </div>
                <div className="btn-group">
                    <button className="btn btn-default btn-sm" onClick={this._addSection.bind(self)}>เพิ่มหมวดหมู่</button>
                </div>
            </div>
        );
    }
}

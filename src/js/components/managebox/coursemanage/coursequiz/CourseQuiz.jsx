import './coursequiz.scss';
import React from 'react';
import RestService from '../../../../services/RestService';

export default class CourseQuiz extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {quizzes: []}
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

    _addQuiz(e) {
        e.preventDefault();
        this.state.data.quizzes.push({
            question: 'เพิ่มแบบสอบถาม',
            answers: [
                {
                    answer: '',
                    checked: true
                },
                {
                    answer: '',
                    checked: false
                }
            ]
        });
        this.setState({quizzes: this.state.data.quizzes});
    }

    _addTrueFalseTest(e){
        e.preventDefault();
        this.state.data.quizzes.push({
            question: 'New True-False Test',
            answers: [
                {
                    answer: 'True',
                    checked: true
                },
                {
                    answer: 'False',
                    checked: false
                }
            ]
        });
        this.setState({quizzes: this.state.data.quizzes});
    }

    _addAnswer(quiz, index, e) {
        e.preventDefault();
        this.state.data.quizzes[index].answers.push({
            answer: '',
            checked: false
        });
        this.setState({quizzes: this.state.data.quizzes});
    }

    _saveQuiz(quiz, index, e) {
        e.preventDefault();
        quiz.question = $('#question' + index).val();
        if(quiz.answers.length >= 1){
            for(var i = 0;i<quiz.answers.length;i++){
                quiz.answers[i].checked = $('#checked-'+ i +'-' + index).is(':checked');
                quiz.answers[i].answer = $('#answer-'+ i +'-' + index).val();
            }
        }
        RestService
            .post('/api/quiz/' + this.props.params.courseId, quiz)
            .done(function (data) {
                this.setState({data: data});
            }.bind(this));
    }

    _deleteQuiz(quiz, e) {
        e.preventDefault();
        RestService
            .delete('/api/quiz/' + this.props.params.courseId, quiz)
            .done(function (data) {
                this.setState({data: data});
            }.bind(this));
    }

    _deleteAnswer(quiz, index, subIndex, e) {
        e.preventDefault();
        quiz.question = $('#question' + index).val();
        if(quiz.answers.length >= 1){
            for(var i = 0;i<quiz.answers.length;i++){
                quiz.answers[i].checked = $('#checked-'+ i +'-' + index).is(':checked');
                quiz.answers[i].answer = $('#answer-'+ i +'-' + index).val();
            }
        }
        quiz.answers.splice(subIndex,1);
        this.state.data.quizzes[index] = quiz;
        this.setState({quizzes: this.state.data.quizzes});
    }

    _handleChange(index,subIndex,e) {
        this.state.data.quizzes[index].answers[subIndex].answer = e.target.value;
        this.setState({quizzes: this.state.data.quizzes});
    }

    _handleChecked(index,subIndex,e){
        for(var i=0;i<this.state.data.quizzes[index].answers.length;i++){
            this.state.data.quizzes[index].answers[i].checked = false;
        }
        this.state.data.quizzes[index].answers[subIndex].checked = true;
        this.setState({quizzes: this.state.data.quizzes});
    }

    render() {

        if (!this.state.data.id) {
            return (<div></div>);
        }

        var self = this;

        var nodes = this.state.data.quizzes.map(function (quiz, index) {

            var subNodes = quiz.answers.map(function (answer, subIndex) {
                return (
                    <div key={subIndex} className="form-group input-group">
                        <span className="input-group-addon">
                            <input type="radio" name="answer-radio" id={'checked-'+subIndex+'-'+index} checked={answer.checked} onChange={self._handleChecked.bind(self,index,subIndex)} />
                        </span>
                        <input type="text" className="form-control" placeholder="คำตอบ" id={'answer-'+subIndex+'-'+index} value={answer.answer} onChange={self._handleChange.bind(self,index,subIndex)}/>
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="button" onClick={self._deleteAnswer.bind(self,quiz,index,subIndex)}>ลบ</button>
                        </span>
                    </div>
                );
            });

            return (
                <div key={index} className="panel panel-default">
                    <div className="panel-heading">
                        <div className="btn-group pull-right">
                            <button className="btn btn-default btn-xs" onClick={self._deleteQuiz.bind(self,quiz)}>ลบแบบสอบถาม</button>
                        </div>
                        <h4 className="panel-title heading-title">
                            <a data-toggle="collapse" data-parent="#accordion" href={'#collapse'+index}>{quiz.question}</a>
                        </h4>
                    </div>
                    <div id={'collapse'+index} className="panel-collapse collapse">
                        <div className="panel-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor={'question'+index}>คำถาม :</label>
                                    <textarea type="text" className="form-control" id={'question'+index} rows="3" placeholder="Add question" defaultValue={quiz.question}/>
                                </div>
                                <div className="form-group">
                                    <label>คำตอบ :</label>
                                    {subNodes}
                                </div>
                                <div className="col-xs-12 text-center">
                                    <button className="btn btn-default btn-sm" onClick={self._addAnswer.bind(self,quiz,index)}>เพิ่มคำตอบ</button>
                                    <label>&nbsp;&nbsp;</label>
                                    <button className="btn btn-primary btn-sm" onClick={self._saveQuiz.bind(self,quiz,index)}>บันทึก</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="course-quiz">
                <div className="panel-group" id="accordion">
                    {nodes}
                </div>

                <div className="btn-group">
                    <button className="btn btn-default btn-sm" onClick={this._addQuiz.bind(this)}>เพิ่มแบบสอบถาม</button>
                </div>
            </div>
        );
    }
}

import './quiz.scss';
import React from 'react'
import If from '../if/If';
import RestService from '../../../services/RestService';

export default class Quiz extends React.Component {

    constructor(props) {
        super(props);
        this.answers = [];
        this.state = {
            result: [],
            score: 'no record'
        }
    }

    componentDidMount() {
        this._getScore();
    }

    _getScore() {
        RestService
            .get('/api/quiz/score/' + this.props.course)
            .done(function (data) {
                if (data) {
                    this.setState({score: 'pass ' + data.pass + ' of ' + data.total})
                }
            }.bind(this));
    }

    _start() {
        $('.start-screen').addClass('hide');
        $('#quiz-0').removeClass('hide');
        $('.quiz-widget .btn-default').prop('disabled', true);
        $('input[type=radio]').prop("checked", false);
        this.answers = [];
    }

    _next(index, quiz) {
        $('#quiz-' + (index)).addClass('hide');
        $('#quiz-' + (index + 1)).removeClass('hide');
        $('.quiz-widget .btn-default').prop('disabled', true)
        var answer = {
            quiz: quiz,
            answer: $('input[name=optradio' + index + ']:checked').val()
        }
        this.answers.push(answer);
    }

    _choose() {
        $('.quiz-widget .btn-default').prop('disabled', false);
    }

    _complete(index, quiz) {
        $('.start-screen').addClass('hide');
        $('.quiz-screen').addClass('hide');
        $('.result-screen').removeClass('hide');
        var answer = {
            quiz: quiz,
            answer: $('input[name=optradio' + index + ']:checked').val()
        }
        this.answers.push(answer);

        RestService
            .post('/api/quiz/check/' + this.props.course, this.answers)
            .done(function (data) {
                this.setState({result: data});
            }.bind(this));
    }

    _again() {
        $('.start-screen').removeClass('hide');
        $('.quiz-screen').addClass('hide');
        $('.result-screen').addClass('hide');
        this._getScore();
    }

    render() {

        var self = this;

        var nodes = this.props.data.quizzes.map(function (quiz, index) {

            var subNodes = quiz.answers.map(function (answer, subIndex) {
                return (
                    <div key={answer.id} className="radio">
                        <label><input type="radio" name={'optradio'+index} value={answer.id} onClick={self._choose.bind(self)}/>{answer.answer}</label>
                    </div>
                );
            });

            return (
                <div key={quiz.id} id={'quiz-'+index} className="quiz-screen hide">
                    <div className="quiz-number">{index + 1} of {self.props.data.quizzes.length}</div>
                    <div className="quiz-question">{quiz.question}</div>
                    <div className="quiz-answer">
                        {subNodes}
                    </div>
                    <div className="quiz-next">
                        <If test={(index+1) != self.props.data.quizzes.length}>
                            <button type="button" className="btn btn-default btn-sm" onClick={self._next.bind(self,index,quiz.id)}>NEXT</button>
                        </If>
                        <If test={(index+1) == self.props.data.quizzes.length}>
                            <button type="button" className="btn btn-default btn-sm" onClick={self._complete.bind(self,index,quiz.id)}>COMPLETE</button>
                        </If>
                    </div>
                </div>
            );
        });

        var score = 0;
        var total = 0;
        var result = this.state.result.map(function (result, index) {
            if(result.checked){
                score++;
            }
            total++;
            return (
                <div key={index}>
                    <div className="result-question">{index + 1}. {result.question}</div>
                    <If test={result.checked}>
                        <div className="result-answer true"><i className="fa fa-check-circle-o"></i> {result.answer}</div>
                    </If>
                    <If test={!result.checked}>
                        <div className="result-answer false"><i className="fa fa-times-circle"></i> {result.answer}</div>
                    </If>
                </div>
            );
        });

        var passScore = ((score/total) >= 0.8)?(<div className="result-total">ผลการทำแบบทดสอบ : <span className="result-answer true">ผ่าน</span></div>):(<div className="result-total">ผลการทำแบบทดสอบ : <span className="result-answer false">ไม่ผ่าน</span></div>);

        return (
            <div className="quiz-widget">
                <div className="start-screen">
                    <div className="row">
                        <button type="button" className="btn btn-success btn-lg" onClick={this._start.bind(this)}>START</button>
                    </div>
                    <div className="row">
                        <div>Last Success : {this.state.score}</div>
                    </div>
                </div>
                {nodes}
                <div className="result-screen hide">
                    {passScore}
                    {result}
                    <div className="quiz-again">
                        <button type="button" className="btn btn-default btn-sm" onClick={this._again.bind(this)}>AGAIN</button>
                    </div>
                </div>
            </div>
        );
    }
}
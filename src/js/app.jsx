/*eslint no-unused-vars: 0*/

import 'font-awesome/scss/font-awesome.scss';
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import 'styles/app.scss';
import 'jquery-ui/themes/base/all.css';

import 'bootstrap-sass/assets/javascripts/bootstrap';
import 'jquery-ui/ui/widgets/sortable.js';

import 'flowplayer/dist/skin/functional';
import './plugin/quality-selector.js';
import './plugin/quality-selector.css';

import './plugin/bootstrap-datepicker.js';
import './plugin/bootstrap-datepicker.css';

import './plugin/select2.js';
import './plugin/select2.css';

import './plugin/bootstrap-select.js';
import './plugin/bootstrap-select.css';

import './plugin/bootstrap-colorpicker.js';
import './plugin/bootstrap-colorpicker.css';

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router'
import {createHistory} from 'history'

import App from './components/App';
import CourseScreen from './components/coursescreen/CourseScreen';
import ManageBox from './components/managebox/ManageBox';

import CourseManage from 'components/managebox/coursemanage/CourseManage';
import CourseCurriculum from 'components/managebox/coursemanage/coursecurriculum/CourseCurriculum';
import ImageCover from 'components/managebox/coursemanage/imagecover/ImageCover';
import CourseBasic from 'components/managebox/coursemanage/coursebasic/CourseBasic';
import CourseInstructor from 'components/managebox/coursemanage/courseinstructor/CourseInstructor';
import CourseQuiz from 'components/managebox/coursemanage/coursequiz/CourseQuiz';

import AdminConsole from 'components/managebox/adminconsole/AdminConsole';
import MenuManage from 'components/managebox/adminconsole/menumanage/MenuManage';
import UserManage from 'components/managebox/adminconsole/usermanage/UserManage';
import ProfileManage from 'components/managebox/adminconsole/profilemanage/ProfileManage';
import Carousel from 'components/managebox/adminconsole/carouselimages/Carousel';
import CarouselEdit from 'components/managebox/adminconsole/carouselimages/carouseledit/CarouselEdit';
import AddUser from 'components/managebox/adminconsole/adduser/AddUser';

import UserProfile from './components/managebox/userprofile/UserProfile';
import Profile from './components/managebox/userprofile/profile/Profile';
import Avatar from './components/managebox/userprofile/avatar/Avatar';
import Instructor from './components/managebox/userprofile/instructor/Instructor';

import DashBoard from './components/dashboard/DashBoard';
import Curriculum from './components/coursecurriculum/CourseCurriculum';

import Report from './components/managebox/report/Report';
import VideoAmount from './components/managebox/report/videoamount/VideoAmount';
import ViewAmount from './components/managebox/report/viewamount/ViewAmount';
import QuizReport from './components/managebox/report/quiz/QuizReport';
import InstructorReport from './components/managebox/report/instructor/InstructorReport';
import UserReport from './components/managebox/report/user/UserReport';
import AdminInstructor from './components/managebox/report/admininstructor/AdminInstructor'

import LoginAction from './actions/LoginAction';
import HistoryService from './services/HistoryService';

const history = createHistory();

HistoryService.set(history);

if (localStorage.getItem('access_token')) {
    LoginAction.checkToken();
}

ReactDOM.render((
    <Router history={history}>
        <Route component={App}>
            <Route path="/" component={CourseScreen}/>
            <Route path="/category/:categoryId" component={CourseScreen}/>
            <Route path="/search/:search" component={CourseScreen}/>
            <Route path="/wishlist" component={CourseScreen}/>
            <Route component={ManageBox}>
                <Route path="/course-manage" component={CourseManage}>
                    <Route path="/course-curriculum/:courseId" component={CourseCurriculum}/>
                    <Route path="/course-basic/:courseId" component={CourseBasic}/>
                    <Route path="/course-cover/:courseId" component={ImageCover}/>
                    <Route path="/course-instructor/:courseId" component={CourseInstructor} />
                    <Route path="/course-quiz/:courseId" component={CourseQuiz} />
                </Route>
                <Route path="/admin-console" component={AdminConsole}>
                    <Route path="/menu-manage" component={MenuManage}/>
                    <Route path="/user-manage" component={UserManage}/>
                    <Route path="/profile-manage/:username" component={ProfileManage}/>
                    <Route path="/carousel" component={Carousel} />
                    <Route path="/carousel/:id" component={CarouselEdit} />
                    <Route path="/add-user" component={AddUser} />
                </Route>
                <Route path="/instructor-dashboard" component={DashBoard}/>
                <Route path="/curriculum/:courseId" component={Curriculum}/>
                <Route path="/lecture/:lectureId" component={Curriculum}/>
                <Route component={UserProfile}>
                    <Route path="/user-profile" component={Profile} />
                    <Route path="/user-avatar" component={Avatar} />
                    <Route path="/instructor-profile" component={Instructor} />
                </Route>
                <Route path="/report" component={Report}/>
                <Route path="/report/video" component={VideoAmount}/>
                <Route path="/report/view" component={ViewAmount}/>
                <Route path="/report/quiz" component={QuizReport} />
                <Route path="/report/instructor" component={InstructorReport} />
                <Route path="/report/user" component={UserReport} />
                <Route path="/report/admininstructor" component={AdminInstructor} />
            </Route>
        </Route>
    </Router>
), document.getElementById('app'));

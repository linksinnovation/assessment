import {EventEmitter} from 'events';
import AppDispatcher from '../dispatchers/AppDispatcher';

export default class BaseStore extends EventEmitter{
    constructor(){
        super();
    }

    subscribe(action){
        this._dispatchToken = AppDispatcher.register(action());
    }

    get dispatchToken(){
        return this._dispatchToken;
    }

    emitChange(){
        this.emit('CHANGE');
    }

    addChangeListener(callback){
        this.on('CHANGE',callback);
    }

    removeChangeListener(callback){
        this.removeListener('CHANGE',callback);
    }
}
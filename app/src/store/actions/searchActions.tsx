import { createActionThunk } from 'redux-thunk-actions';
import APIManager from '../../services/Api';
import { SEARCH_POST_DESC, SEARCH_POST_HASHTAG, SEARCH_USER } from '../reducers/searchReducers';

export const searchUserByUsername = createActionThunk(SEARCH_USER, async () => {

});

export const searchPostByHashtag = createActionThunk(SEARCH_POST_HASHTAG, async () => {

});

export const searchPostByDesc = createActionThunk(SEARCH_POST_DESC, async () => {

});
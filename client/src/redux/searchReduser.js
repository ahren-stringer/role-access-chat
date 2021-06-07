import { SearchAPI } from '../DAL/api';

const SET_SEARCHED = 'searchReuser/SET-SEARCHED';
const SET_SEARCHED_PAGE = 'searchReuser/SET-SEARCHED-PAGE';
const SET_REDIRECT = 'searchReuser/SET-REDIRECT';
const CLOSE_LIST = 'searchReuser/CLOSE_LIST';
const LOAD_LIST = 'searchReuser/LOAD_LIST';
const SET_REQ_NUMBER = 'searchReuser/SET_REQ_NUMBER';
const SET_SEARCHED_ARR = 'searchReuser/SET_SEARCHED_ARR'
const SET_NEW_TEXT = 'searchReuser/SET-NEW-TEXT';
const TOTAL_COUNT = 'searchReuser/TOTAL-COUNT';
const SET_PAGE = 'searchReuser/SET-PAGE';
const SET_LOADED = 'searchReuser/SET_LOADED';

let init = {
    requestNumber: 1,
    searched: { requestNumber: 0, request: [] },
    searchedArr: [],
    searchRedirect: true,
    isClosed: true,
    isListLoading: false,
    newSearchText: '',
    // страница с найденными результатами
    searchedPage: null,
    postsloaded: true,
    totalCount: null,
    numberOfPage: 1,
    onOnePage: 3,
}

const searchReduser = (state = init, action) => {
    switch (action.type) {
        case SET_SEARCHED:
            return { ...state, searched: { requestNumber: action.searched.requestNumber, request: action.searched.request } }
        case SET_SEARCHED_PAGE:
            return { ...state, searchedPage: action.searchedPage }
        case SET_REDIRECT:
            return { ...state, searchRedirect: action.searchRedirect }
        case CLOSE_LIST:
            return { ...state, isClosed: action.isClosed }
        case LOAD_LIST:
            return { ...state, isListLoading: action.isListLoading }
        case SET_REQ_NUMBER:
            return { ...state, requestNumber: action.requestNumber }
        case SET_NEW_TEXT:
            return { ...state, newSearchText: action.text }
            // страница с найденными результатами
            case TOTAL_COUNT:
            return { ...state, totalCount: action.totalCount }
        case SET_PAGE:
            return { ...state, numberOfPage: action.numberOfPage }
            case SET_LOADED:
                return { ...state, postsloaded: action.postsloaded }
        default:
            return state
    }
}

export const setSearched = (searched) => ({ type: SET_SEARCHED, searched })
export const setSearchedPage = (searchedPage) => ({ type: SET_SEARCHED_PAGE, searchedPage })
export const setSearchRedirect = (searchRedirect) => ({ type: SET_REDIRECT, searchRedirect })
export const toggleList = (isClosed) => ({ type: CLOSE_LIST, isClosed })
export const loadList = (isListLoading) => ({ type: LOAD_LIST, isListLoading })
export const setReqNumber = (requestNumber) => ({ type: SET_REQ_NUMBER, requestNumber })
export const setSearchedArr = (searchedArr) => ({ type: SET_SEARCHED_ARR, searchedArr })
export const SearchChange = (text) => ({ type: SET_NEW_TEXT, text })
// страница с найденными результатами
export const SetTotalCount = (totalCount) => ({ type: TOTAL_COUNT, totalCount })
export const SetPageCount = (numberOfPage) => ({ type: SET_PAGE, numberOfPage })
export const setLoaded = (postsloaded) => ({ type: SET_LOADED, postsloaded })

export const searchThunk = (search, requestNumber, userId) =>
    async (dispatch) => {
        dispatch(setReqNumber(+requestNumber + 1))
        dispatch(SearchChange(search))
        dispatch(toggleList(true))
        dispatch(loadList(true))
        let req
        debugger
        if (search) req = await SearchAPI.getSearchList(search,userId)
        dispatch(setReqNumber(+requestNumber + 1))
        dispatch(setSearched({ requestNumber, request: req }))

        dispatch(loadList(false))
        //dispatch(toggleList(true))
    }

export const CloseListThunk = () =>
    async (dispatch) => {
        dispatch(setSearched({ requestNumber: 0, request: [] }))
    }

export default searchReduser
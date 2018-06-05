import {CHANGE_PAGE,CHANGE_TAB_ENTER} from '../scorem/actions'

export const ENTER_SCORE = '成绩录入';
export const SEARCH_SCORE_STU = '学生成绩查询';
export const SEARCH_SCORE_TEA = '成绩查询';
export const ANALYSIS_SCORE = '成绩分析';
export const ENTER_SCORE_SINGLE = 1;
export const ENTER_SCORE_MULTI = 2;
const initState = {
  page: ENTER_SCORE,
  entertab: ENTER_SCORE_SINGLE,
};

export function scoreReducer(state = initState, action) {
  switch (action.type) {
    case CHANGE_PAGE: {
      switch (action.value) {
        case ENTER_SCORE:
          return Object.assign({}, state, {
            page: ENTER_SCORE,
            entertab: state.entertab,
          });
        case SEARCH_SCORE_TEA:
          return Object.assign({}, state, {
            page: SEARCH_SCORE_TEA,
            entertab: state.entertab,
          });
        case SEARCH_SCORE_STU:
          return Object.assign({}, state, {
            page: SEARCH_SCORE_STU,
            entertab: state.entertab,
          });
        case ANALYSIS_SCORE:
          return Object.assign({}, state, {
            page: ANALYSIS_SCORE,
            entertab: state.entertab,
          });
        default: {
          return Object.assign({}, state, {
            page: ANALYSIS_SCORE,
            entertab: state.entertab,
          });
        }
      }
    }
    case CHANGE_TAB_ENTER:{
      switch (action.value) {
        case ENTER_SCORE_SINGLE:
          return Object.assign({}, state, {
            page: state.page,
            entertab: ENTER_SCORE_SINGLE,
          });
        case ENTER_SCORE_MULTI:
          return Object.assign({}, state, {
            page: state.page,
            entertab: ENTER_SCORE_MULTI,
          });
        default:
          return Object.assign({}, state, {
            page: state.page,
            entertab: ENTER_SCORE_SINGLE,
          });
      }
    }
    default:
      return state;
  }
}

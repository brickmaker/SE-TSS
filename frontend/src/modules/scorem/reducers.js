import {CHANGE_PAGE} from '../scorem/actions'

export const ENTER_SCORE = '成绩录入';
export const SEARCH_SCORE_STU = '学生成绩查询';
export const SEARCH_SCORE_TEA = '成绩查询';
export const ANALYSIS_SCORE = '成绩分析';
const initState = {
  page: ANALYSIS_SCORE
};

export function scoreReducer(state = initState, action) {
  switch (action.type) {
    case CHANGE_PAGE: {
      switch (action.page) {
        case ENTER_SCORE:
          return Object.assign({}, state, {
            page: ENTER_SCORE
          });
        case SEARCH_SCORE_TEA:
          return Object.assign({}, state, {
            page: SEARCH_SCORE_TEA
          });
        case SEARCH_SCORE_STU:
          return Object.assign({}, state, {
            page: SEARCH_SCORE_STU
          });
        case ANALYSIS_SCORE:
          return Object.assign({}, state, {
            page: ANALYSIS_SCORE
          });
        default: {
          return Object.assign({}, state, {
            page: ANALYSIS_SCORE
          });
        }
      }
    }
    default:
      return state;
  }
}

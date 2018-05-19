const initState = {
    isAdmin: true,
    utility: "主页",
    tabsCCValue: 2,
    tabsSVValue: 0,
    tabsCMValue: 0,
    checkedCVBools: [false, false, false],
    checkedPFBools: [false, false, false, false, false, false],
};

export const xkxtReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SWITCH_UTILITY':
            return Object.assign({}, state, {
                utility: action.utility
            });
        case 'OPEN_FUNC':
            return Object.assign({}, state, {
                openDrawer: !state.openDrawer
            });
        case 'TABS_CC_FUNC':
            return Object.assign({}, state, {
                tabsCCValue: action.value
            });
        case 'TABS_SV_FUNC':
            return Object.assign({}, state, {
                tabsSVValue: action.value
            });
        case 'TABS_CM_FUNC':
            return Object.assign({}, state, {
                tabsCMValue: action.value
            });
        case 'CHECKED_CV_FUNC':
            var a = [];
            for(let i=0; i<state.checkedCVBools.length; i++){
                if(i===action.index) a.push(!state.checkedCVBools[i]);
                else a.push(state.checkedCVBools[i]);
            }
            return Object.assign({}, state, {
                checkedCVBools: a
            });
        case 'CHECKED_PF_FUNC':
            var a = [];
            for(let i=0; i<state.checkedPFBools.length; i++){
                if(i===action.index) a.push(!state.checkedPFBools[i]);
                else a.push(state.checkedPFBools[i]);
            }
            return Object.assign({}, state, {
                checkedPFBools: a
            });
        default:
            return state;
    }
};
/*
import {combineReducers} from 'redux';
export default combineReducers({
	reducer
});
*/
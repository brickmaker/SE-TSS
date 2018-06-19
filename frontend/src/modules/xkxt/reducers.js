const initState = {
    //uid: "2010100003",
    //uid: "2110100003",
    //uid: "3150100000",
    uid: localStorage.username,
    userInfo: null,
    toQuit: false,
    isAdmin: true,
    utility: "培养方案",
    tabsCCValue: 2,
    tabsSVValue: 0,
    tabsCMValue: 0,
    bottom: false,
    CS_show: 0,
    checkedCVBools: {},
    checkedPFBools: {
        public: {},
        major_op: {},
    },
    program: null,
    course: null,
    courseInfo: null,
    courseStudent: null,
    time: null,
    management1: null,
    management2: null,
    snackBarState: null,
};

export const xkxtReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SWITCH_UTILITY':
            return Object.assign({}, state, {
                utility: action.utility
            });
        case 'TOGGLE_DRAWER':
            return Object.assign({}, state, {
                bottom: action.bool
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
            if(action.value===0)
                state.management1 = null;
            return Object.assign({}, state, {
                tabsCMValue: action.value
            });
        case 'CHANGE_CS_FUNC':
            return Object.assign({}, state, {
                CS_show: action.show
            });
        case 'CHECKED_CV_FUNC':
            if(action.index in state.checkedCVBools)
                state.checkedCVBools[action.index] = !state.checkedCVBools[action.index];
            else
                state.checkedCVBools[action.index] = true;
            return Object.assign({}, state, {
                checkedCVBools: JSON.parse(JSON.stringify(state.checkedCVBools))
            });
        case 'CHECKED_PF_FUNC':
            if(action.index.i in state.checkedPFBools[action.index.type])
                state.checkedPFBools[action.index.type][action.index.i] = !state.checkedPFBools[action.index.type][action.index.i];
            else
                state.checkedPFBools[action.index.type][action.index.i] = true;
            return Object.assign({}, state, {
                checkedPFBools: JSON.parse(JSON.stringify(state.checkedPFBools))
            });
        case 'CLEAR_COURSE_STUDENT':
            state.courseStudent = null;
            return state;
        case 'CHANGE_SNACK_BAR':
            return Object.assign({}, state, {
                snackBarState: action.state
            });
        case 'GET_PROGRAM':
            console.log(action.data);
            if(!Boolean(action.data)) return state;
            return Object.assign({}, state, {
                program: action.data
            });
        case 'GET_COURSE':
            console.log(action.data);
            if(!Boolean(action.data)) return state;
            return Object.assign({}, state, {
                course: action.data
            });
        case 'POST_COURSE':
            console.log(action.data);
            if(!Boolean(action.data)) return state;
            let con = 1;
            if(action.data.state===undefined)
                con=0;
            if(action.data.if_ok===false){
                return Object.assign({}, state, {
                    snackBarState: {type:0, con:con}
                });
            }
            let newCourse;
            if(Boolean(state.management1))
                newCourse = state.management1;
            else
                newCourse = state.course;
            console.log(newCourse[action.index])
            newCourse[action.index].state = action.data.state;
            if(newCourse[action.index].state===undefined)
                newCourse[action.index].remain += 1;
            else
                newCourse[action.index].remain -= 1;
            return Object.assign({}, state, {
                course: JSON.parse(JSON.stringify(newCourse)),
                snackBarState: {type:1, con:con}
            });
        case 'GET_COURSE_INFO': 
            console.log(action.data);
            if(!Boolean(action.data)) return state;
            return Object.assign({}, state, {
                courseInfo: action.data
            });
        case 'GET_COURSE_STUDENT': 
            console.log(action.data);
            if(!Boolean(action.data)) return state;
            if(action.data===undefined)
                return Object.assign({}, state, {
                    snackBarState: 1
                });
            return Object.assign({}, state, {
                courseStudent: action.data
            });
        case 'GET_MANAGEMENT': 
            console.log(action.data);
            if(!Boolean(action.data)) return state;
            if(action.typ===0){
                return Object.assign({}, state, {
                    time: action.data
                });
            }
            else if(action.typ===1){
                return Object.assign({}, state, {
                    management1: action.data
                });
            }
            else if(action.typ===2){
                return Object.assign({}, state, {
                    management2: action.data
                });
            }
            else if(action.typ===3){
                return Object.assign({}, state, {
                    userInfo: action.data
                });
            }
            else
                return state;
        case 'QUIT': 
            if(Boolean(state.userInfo) && state.userInfo.auth===0)
                return Object.assign({}, state, {
                    toQuit: true
                });
            return state;
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
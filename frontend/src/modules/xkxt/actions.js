import {BACKEND_SERVER_URL, BACKEND_API} from './api';

export const getCourse = (dispatch, attr) => {
  getRes(BACKEND_API.course, attr).then(data => {//
    dispatch({
      type: 'GET_COURSE',
      data: data
    })
  });
};

export const postCourse = (dispatch, data, index) => {
  postRes(BACKEND_API.course, data).then(data => {//
    dispatch({
      type: 'POST_COURSE',
      data: data,
      index: index
    })
  });
};

export const getCourseInfo = (dispatch, attr) => {
  getRes(BACKEND_API.courseInfo, attr).then(data => {//
    dispatch({
      type: 'GET_COURSE_INFO',
      data: data
    })
  });
};

export const getCourseStudents = (dispatch, attr) => {
  getRes(BACKEND_API.courseStudent, attr).then(data => {//
    dispatch({
      type: 'GET_COURSE_STUDENT',
      data: data
    })
  });
};

export const getManagement = (dispatch, attr, type) => {
  getRes(BACKEND_API.management, attr).then(data => {//
    console.log(123)
    dispatch({
      type: 'GET_MANAGEMENT',
      data: data,
      typ: type,
    })
  });
};

export const postManagement = (dispatch, data, type) => {
  postRes(BACKEND_API.management, data).then(data => {//
    dispatch({
      type: 'GET_MANAGEMENT',
      data: data
    })
  });
};

export const getProgram = (dispatch, attr) => {
  getRes(BACKEND_API.program, attr).then(data => {
    dispatch({
      type: 'GET_PROGRAM',
      data: data,
    })
  });
};

export const postProgram = (dispatch, data) => {
  postRes(BACKEND_API.program, data).then(data => {
    dispatch({
      type: 'GET_PROGRAM',
      data: data
    })
  });
};

export const openFunc_courseChoosing = () => ({
  type: 'OPEN_FUNC_COURSE_CHOOSING'
});

export const closeFunc_courseChoosing = () => ({
  type: 'CLOSE_FUNC_COURSE_CHOOSING'
})

export const switchUtility = utility => ({
  type: 'SWITCH_UTILITY',
  utility: utility
});

export const openFunc = () => ({
  type: 'OPEN_FUNC'
});

export const tabsCCFunc = (value) => ({
  type: 'TABS_CC_FUNC',
  value: value
});

export const tabsSVFunc = (value) => ({
  type: 'TABS_SV_FUNC',
  value: value
});

export const tabsCMFunc = (value) => ({
  type: 'TABS_CM_FUNC',
  value: value
});

export const checkedCVFunc = (i) => ({
  type: 'CHECKED_CV_FUNC',
  index: i
});

export const checkedPFFunc = (i) => ({
  type: 'CHECKED_PF_FUNC',
  index: i
});

export const changeCSFunc = (i) => ({
  type: 'CHANGE_CS_FUNC',
  show: i
});

export const toggleDrawer = (b) => ({
  type: 'TOGGLE_DRAWER',
  bool: b
});

function getRes(resource, attr) {
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };
  let url = `${BACKEND_SERVER_URL}${resource}?${attr}`;
  return fetch(url, opts)//?${attr}
      .then((response) => response.json())
      .catch((e) => console.log(e));
}

function postRes(resource, data) {
  const opts = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };
  return fetch(`${BACKEND_SERVER_URL}${resource}`, opts)
      .then((response) => (response.json()))
      .catch((e) => console.log(e));
}
import {DEBUG, ROOT_URL} from "../../configs/config";

export const POST_CLASSROOM_INFO = 'post_Classroom_Info'
export const GET_ALL_CLASSROOM_INFO = 'get_All_Classroom_Info'
export const GET_CLASSROOM_INFO_WITH_NAME = 'get_Classroom_Info_With_Name'
export const DELETE_CLASSROOM_INFO = 'delete_Classroom_Info'

export const addClassroom = (campus, building, room, capacity) => (dispatch, getState) => {
    postClassroomInfo(campus, building, room, capacity)
}

function postClassroomInfo(campus, building, room, capacity) {
    fetch(`${ROOT_URL}/classroom/`,{
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({
            campus: campus,
            building: building,
            room: room,
            capacity: capacity,
        })
    })
        .then(response => {})
        .catch((errors)=>{
            console.log("Post classroom errors", errors.response);
        })
}

export const getAllClassroomInfo = () => (dispatch, getState) => {
    fetchAllClassroomInfo()
        .then((data)=>{
        dispatch({
            type: GET_ALL_CLASSROOM_INFO,
            data: data
        })
    })
};

function fetchAllClassroomInfo() {
    return fetch(`${ROOT_URL}/classroom/`)
        .then(response => response.json())
}
export const getClassroomInfoWithName = (campus, building, name) => (dispatch, getState) => {
    console.log(campus, building, name)
    let campusKey = 0;
    if(campus === "紫金港") {
        campusKey = 0;
    }
    else if(campus === "玉泉"){
        campusKey = 1;
    }
    else if(campus === "西溪"){
        campusKey = 2;
    }
    else if(campus === "华家池"){
        campusKey = 3;
    }
    else {
        campusKey = 4;
    }
    fetchClassroomInfo(campusKey, building, name)
        .then((data)=>{
            dispatch({
                type: GET_CLASSROOM_INFO_WITH_NAME,
                data: data
            })
        })
}

function fetchClassroomInfo(campus, building, name) {
    if (campus === 4) {
        return fetch(`${ROOT_URL}/classroom/?campus=&&building=${building}&&room=${name}`)
            .then(response => response.json())
    }
    else {
        return fetch(`${ROOT_URL}/classroom/?campus=${campus}&&building=${building}&&room=${name}`)
            .then(response => response.json())
    }
}

export const modifyClassroom = (n) => (dispatch, getState) => {
    console.log("received array: ", n);
    postModifiedClassroomInfo(n)
        .then((data)=>{
            dispatch({
                type: POST_CLASSROOM_INFO
            })
        })
};

function postModifiedClassroomInfo(arr) {
    arr.map(function(element, index, array) {
        fetch(`${ROOT_URL}/classroom/${element.id}/`, {
            method: 'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                campus: element.campus,
                building: element.building,
                room: element.room,
                capacity: element.capacity,
            })
        })
            .then(response => {})
            .catch((errors)=>{
                console.log("Put modified classroom errors", errors.response);
            })
    });
    return fetch(`${ROOT_URL}/classroom/`)
        .then(response => response.json())
}

export const deleteClassroomInfo = (arr) => (dispatch, getState) => {
    deleteClassroom(arr);
    return fetch(`${ROOT_URL}/classroom/`)
        .then(response => response.json())
}

function deleteClassroom(arr) {
    arr.map(function (element, index, array) {
        fetch(`${ROOT_URL}/classroom/${element.id}/`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
        })
            .then(response => {
            })
            .catch((errors) => {
                console.log("DELETE classroom errors", errors.response);
            })
    })
}
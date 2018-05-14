

const initialState = {
    hotPosts: [
        {
            "title": "一个帖子的标题",
            "author": {
                "username": "王章野",
                "uid": "uid"
            },
            "time": "2018/05/11",
            "lastReplyTime": "2018/05/15",
            "replyNum": 10,
            "postid": "postid",
            "path": {
                "college": {
                    "id": "collegeid",
                    "name": "计算机科学与技术学院"
                },
                "course": {
                    "id": "courseid",
                    "name": "软件工程"
                },
                "teacher": {
                    "id": "teacherid",
                    "name": "王章野"
                }
            }
        },
        {
            "title": "一个帖子的标题",
            "author": {
                "username": "王章野",
                "uid": "uid"
            },
            "time": "2018/05/11",
            "lastReplyTime": "2018/05/15",
            "replyNum": 10,
            "postid": "postid",
            "path": {
                "college": {
                    "id": "collegeid",
                    "name": "计算机科学与技术学院"
                },
                "course": {
                    "id": "courseid",
                    "name": "软件工程"
                },
                "teacher": {
                    "id": "teacherid",
                    "name": "王章野"
                }
            }
        },
        {
            "title": "一个帖子的标题",
            "author": {
                "username": "王章野",
                "uid": "uid"
            },
            "time": "2018/05/11",
            "lastReplyTime": "2018/05/15",
            "replyNum": 10,
            "postid": "postid",
            "path": {
                "college": {
                    "id": "collegeid",
                    "name": "计算机科学与技术学院"
                },
                "course": {
                    "id": "courseid",
                    "name": "软件工程"
                },
                "teacher": {
                    "id": "teacherid",
                    "name": "王章野"
                }
            }
        },
        {
            "title": "一个帖子的标题",
            "author": {
                "username": "王章野",
                "uid": "uid"
            },
            "time": "2018/05/11",
            "lastReplyTime": "2018/05/15",
            "replyNum": 10,
            "postid": "postid",
            "path": {
                "college": {
                    "id": "collegeid",
                    "name": "计算机科学与技术学院"
                },
                "course": {
                    "id": "courseid",
                    "name": "软件工程"
                },
                "teacher": {
                    "id": "teacherid",
                    "name": "王章野"
                }
            }
        },
    ],
    isFetchingHotPosts: false,
    userStates: [
        {
            "uid":"uid",
            "username": "Alice",
            "replyNum": 23,
            "lastLoginTime": "2018/05/14",
            "type": "学生",
        },
        {
            "uid":"uid",
            "username": "Alice",
            "replyNum": 23,
            "lastLoginTime": "2018/05/14",
            "type": "学生",
        },
        {
            "uid":"uid",
            "username": "Alice",
            "replyNum": 23,
            "lastLoginTime": "2018/05/14",
            "type": "学生",
        }
    ],
    isFetchingUserStates: false,
    info:{
        "用户数": 10000,
        "历史最高在线数": 9999,
        "今日注册数": 29,
        "版块数": 2000,
    },
    isFetchingInfor: false,
};

export function managementReducer(state = initialState, action) {
    switch (action.type) {
        default: return state;
    };
}
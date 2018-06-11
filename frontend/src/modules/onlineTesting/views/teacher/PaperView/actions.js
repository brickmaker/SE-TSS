export const GET_TEACHER_PAPER = 'get_teacher_paper';
export const CHANGE_RENDER_TAB = 'change_render_tab';

const testPaper = {
    'paper_id': 33,
    'paper_name': '第一章习题',
    'start_time': 1526191927,
    'deadline': 1526195000,
    'duration': 3600,
    'question_list': [{
        'question_id': 10002,
        'question_type': 'Choice',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'choice_list' : ['2222', '3333', '55555', '22222'],
        'answer_list' : [2],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    }, {
        'question_id': 10004,
        'question_type': 'Judge',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'answer_list' : [1],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    },{
        'question_id': 10002,
        'question_type': 'Choice',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'choice_list' : ['222', '3333', '55555', '22222'],
        'answer_list' : [2],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    }, {
        'question_id': 10004,
        'question_type': 'Judge',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'answer_list' : [1],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    },{
        'question_id': 10002,
        'question_type': 'Choice',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'choice_list' : ['2222', '3333', '55555', '22222'],
        'answer_list' : [2],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    }, {
        'question_id': 10004,
        'question_type': 'Judge',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'answer_list' : [1],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    },{
        'question_id': 10002,
        'question_type': 'Choice',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'choice_list' : ['2222', '3333', '55555', '22222'],
        'answer_list' : [2],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    }, {
        'question_id': 10004,
        'question_type': 'Judge',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'answer_list' : [1],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    },{
        'question_id': 10002,
        'question_type': 'Choice',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'choice_list' : ['2222', '3333', '55555', '22222'],
        'answer_list' : [2],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    }, {
        'question_id': 10004,
        'question_type': 'Judge',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'answer_list' : [1],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    },{
        'question_id': 10002,
        'question_type': 'Choice',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'choice_list' : ['2222', '3333', '55555', '22222'],
        'answer_list' : [2],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    }, {
        'question_id': 10004,
        'question_type': 'Judge',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'answer_list' : [1],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    },{
        'question_id': 10002,
        'question_type': 'Choice',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'choice_list' : ['2222', '3333', '55555', '22222'],
        'answer_list' : [2],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    }, {
        'question_id': 10004,
        'question_type': 'Judge',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'answer_list' : [1],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    },
    ],
};

export const getTeacherPaper = (teacherId, courseId, paperId, token) =>{
    return dispatch=>{
        dispatch({
            type: GET_TEACHER_PAPER,
            paper_info: testPaper,
        })
    };
};

export const changeRenderTab = (selection) =>{
    return dispatch=>{
        dispatch({
            type: CHANGE_RENDER_TAB,
            selection: selection,
        })
    };
};

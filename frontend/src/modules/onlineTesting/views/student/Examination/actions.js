export const GET_STUDENT_PAPER = 'get_student_paper';
export const CHANGE_RENDER_TAB_EXAM = 'change_render_tab_exam';
export const CHANGE_SOLUTIONS = 'change_solution';

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
        'answer_list' : [0],
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
        'answer_list' : [0],
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
        'answer_list' : [0],
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
        'answer_list' : [0],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    }, {
        'question_id': 10004,
        'question_type': 'Judge',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'answer_list' : [0],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    },{
        'question_id': 10002,
        'question_type': 'Choice',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'choice_list' : ['2222', '3333', '55555', '22222'],
        'answer_list' : [1],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    }, {
        'question_id': 10004,
        'question_type': 'Judge',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'answer_list' : [0],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    },{
        'question_id': 10002,
        'question_type': 'Choice',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'choice_list' : ['2222', '3333', '55555', '22222'],
        'answer_list' : [0],
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
        'answer_list' : [0],
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

export const getStudentPaper = (studentId, courseID, paperID, token)=>{
    return dispatch=>{
        dispatch({
            type: GET_STUDENT_PAPER,
            paper_info: testPaper,
            solutions: Array(testPaper.question_list.length).fill(-1)
        })
    };
};

export const changeRenderTabExam = (tab_id) =>{
    return dispatch=>{
        dispatch({
            type: CHANGE_RENDER_TAB_EXAM,
            tab_id: tab_id,
        })
    };
};


export const changeSolution = (solutions) =>{
    return dispatch=>{
        dispatch({
            type: CHANGE_SOLUTIONS,
            solutions: solutions,
        })
    };
};




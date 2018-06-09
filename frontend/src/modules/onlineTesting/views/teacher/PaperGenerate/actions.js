export const CHANGE_RENDER_TAB_GENERATE = 'change_render_tab_generate';

const testPaper = {
    'paper_id': 33,
    'paper_name': '第一章习题',
    'start_time': 1526191927,
    'deadline': 1526195000,
    'duration': 3600,
    'question_list': [{
        'question_id': 9909,
        'question_type': 'Choice',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'choice_list' : ['2222', '3333', '55555', '22222'],
        'answer_list' : [2],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    }, {
        'question_id': 3562,
        'question_type': 'Judge',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'answer_list' : [1],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    },{
        'question_id': 7777,
        'question_type': 'Choice',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'choice_list' : ['222', '3333', '55555', '22222'],
        'answer_list' : [2],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    }, {
        'question_id': 3332,
        'question_type': 'Judge',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'answer_list' : [1],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    },{
        'question_id': 2234324,
        'question_type': 'Choice',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'choice_list' : ['2222', '3333', '55555', '22222'],
        'answer_list' : [2],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    }, {
        'question_id': 234324,
        'question_type': 'Judge',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'answer_list' : [1],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    },{
        'question_id': 6666,
        'question_type': 'Choice',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'choice_list' : ['2222', '3333', '55555', '22222'],
        'answer_list' : [2],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    }, {
        'question_id': 2333,
        'question_type': 'Judge',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'answer_list' : [1],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    },{
        'question_id': 3434,
        'question_type': 'Choice',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'choice_list' : ['2222', '3333', '55555', '22222'],
        'answer_list' : [2],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    }, {
        'question_id': 10032,
        'question_type': 'Judge',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'answer_list' : [1],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    },{
        'question_id': 10033,
        'question_type': 'Choice',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'choice_list' : ['2222', '3333', '55555', '22222'],
        'answer_list' : [2],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    }, {
        'question_id': 10005,
        'question_type': 'Judge',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'answer_list' : [1],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    },{
        'question_id': 10007,
        'question_type': 'Choice',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'choice_list' : ['2222', '3333', '55555', '22222'],
        'answer_list' : [2],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    }, {
        'question_id': 10008,
        'question_type': 'Judge',
        'description': '对于号称帐号被盗、非本人提交的作弊代码，除非有技术手段查到非本人提交的证据，否则本人承担责任，被判作弊。In the event another student submits plagiarized class work in my name, I assume responsibility for cheating, unless there exists evidence to the contrary. (1分)',
        'answer_list' : [1],
        'teacher_name': 'Wu di liu shen',
        'tag': 'fuck',
    },
    ],
};


export const changeRenderTabGenerate = (tab_id) =>{
    return dispatch=>{
        dispatch({
            type: CHANGE_RENDER_TAB_GENERATE,
            tab_id: tab_id,
        })
    };
};

export function withAuthHeader(others = {}) {
    return Object.assign({}, {
            Authorization: 'JWT ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        others
    )
}
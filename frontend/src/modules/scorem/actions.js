export const CHANGE_PAGE = 'change_page';

export function changePage(page) {
    return {
        type: CHANGE_PAGE,
        page: page
    }
}
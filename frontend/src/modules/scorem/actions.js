export const CHANGE_PAGE = 'change_page';
export const CHANGE_TAB_ENTER = 'change_page_enter';

export function changePage(page) {
  return {
    type: CHANGE_PAGE,
    value: page
  }
}


export function changeTab_enter(tab) {
  return {
    type: CHANGE_TAB_ENTER,
    value: tab
  }
}

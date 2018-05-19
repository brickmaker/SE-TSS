/*
export const MultiUtility = {
  U_main: 'main',
  U_zdpyfa: 'zdpyfa',
  U_kcss: 'kcss',
  U_zzxk: 'zzxk',
  U_ckkb: 'ckkb',
  A_xkgl: 'xkgl'
}

export const clickOneDiv = utility => ({
  type: 'CLICK_ONE_DIV',
  utility
})
*/

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
import * as ActionTypes from '../actions/global'

export const title = (state = '', { type, title }) => {
  if (type === ActionTypes.SET_TITLE) {
    return title
  }
  return state
}

// eslint happy
export const other = () => { }

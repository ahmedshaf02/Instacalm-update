
const USER = "USER"
const UPDATE = "UPDATE"
const CLEAR = "CLEAR"
const UPDATE_IMAGE = "UPDATE_IMAGE"

export const userState = (payload)=>{
  return{
    type:USER,
    payload
  }
}
export const updateState = (payload)=>{
  return{
    type:UPDATE,
    payload
  }
}
export const clearState = (payload)=>{
  return{
    type:CLEAR,
    payload
  }
}
export const updateImageState = (payload)=>{
  return{
    type:UPDATE_IMAGE,
    payload
  }
}
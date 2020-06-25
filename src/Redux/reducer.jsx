

const initState = null

export default (state=initState,{type,payload})=>{

      if(type==="USER"){
        console.log(payload)
        return payload
      }

      if(type==="CLEAR"){
        return null
      }

      if(type==="UPDATE"){
        console.log(payload)
        return payload
      }

      if(type==="UPDATE_IMAGE"){
        console.log(payload)
        return {
          ...state,
          image:payload
        }
      }
      

  return state
}
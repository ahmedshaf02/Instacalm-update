

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
        return payload
      }

  return state
}
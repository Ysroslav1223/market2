import { useSelector } from 'react-redux';
import { selectUserName } from '../selectors/select-user-name';

export const useFormatUserName=()=>{
   
const nameUser=useSelector(selectUserName)
  
   const formatUserName=(name)=>{
  
    if(name){
      const splitName=name.split(' ')
       const lastName=splitName[0]
        const middleName=`${splitName[2][0]}.`
         const firstName=`${splitName[1][0]}.`
    
       return `${lastName} ${firstName}${middleName}`
    }else if(!name || typeof name !== "string")
    return ''
    }
    return formatUserName(nameUser)
}
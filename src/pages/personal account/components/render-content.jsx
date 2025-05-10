import { useSelector } from "react-redux"
import { selectUserName } from "../../../../selectors/select-user-name"
import "./render-content.css"
import { TextForUs } from "./text-for-us"

export const RenderContent=(activeSection)=>{

    const nameUser=useSelector(selectUserName)


    const formatName=(name)=>{
        if(name!==null){
            const splitName=name.split(' ')
            const firstName=splitName[1]
            return firstName
        }else return
    }
    const firstName=formatName(nameUser)

    const renderContent=()=>{
        switch(activeSection){
            case 'about': return <TextForUs/>
            case 'personal': return(<div>
                <h2>{`${firstName}, Приветсвуем`}</h2>
                <h3 className="ourbuy"> Ваши покупки:</h3>
            </div>
            )
            case 'profile':
                return(
                    <div>
                        <h2>Профиль</h2>
                    </div>
                )
            default:
                return <div>Выберите раздел</div>
        }
    }
    return renderContent(activeSection)
}
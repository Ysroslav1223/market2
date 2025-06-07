import { IoIosSearch } from "react-icons/io";
export const Input=({onChange,value})=>{
    return(
        <div className="input-container">
        <IoIosSearch className="search-icon" />
        <input className="research" value={value} onChange={onChange}/>
        </div>
        
    )
}
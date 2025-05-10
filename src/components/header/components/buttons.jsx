


export const Button=({id,children,onClick})=>{
    return(
        <div>
            <button className={`button-${id}`} onClick={onClick}>{children}</button>
        </div>
    )
}
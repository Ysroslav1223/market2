


export const Button=({id,children,onClick,disabled})=>{
    return(
        <div>
            <button className={`button-${id}`} disabled={disabled}onClick={onClick}>{children}</button>
        </div>
    )
}
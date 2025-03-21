


export const Button=({id,children})=>{
    return(
        <div>
            <button className={`button-${id}`}>{children}</button>
        </div>
    )
}
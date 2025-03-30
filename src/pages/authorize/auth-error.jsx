import './authorize-from.css'

export const AuthFormError=({children})=>{
    return(
        <div>
            <div className="error-from">{children}</div>
        </div>
    )
}
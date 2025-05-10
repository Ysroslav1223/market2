import jwt from 'jsonwebtoken'

const sign = 'testtest'

export function generate(data){
    return jwt.sign(data, sign,{expiresIn:'30d'})
}
export function verify(token){
    return jwt.verify(token,sign)
}
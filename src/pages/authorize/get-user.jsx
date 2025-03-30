export const getUser=async(loginToFind)=>{

    return fetch(`http://localhost:3005/users?email=${loginToFind}`)
        .then((loadedUser)=>loadedUser.json())
        .then(([loadedUser])=>loadedUser&&{
            id: loadedUser.id,
            name: loadedUser.name,
            roleId:loadedUser.role_id,
            email: loadedUser.email,
            password: loadedUser.password,
        })
}
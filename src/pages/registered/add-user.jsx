export const addUser=(email,name,password)=>
    fetch('http://localhost:3005/users',{
        method:'POST',
        headers:{
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            email,
            name,
            role_id:1,
            password
        })
    }).then((createdUser)=>createdUser.json())
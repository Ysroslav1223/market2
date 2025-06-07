export function authEntry(url,method,data){
    return fetch(url,{
        method: method||"POST",
        headers:{
            "content-type":"application/json"
        },
        credentials:'include',
        body: JSON.stringify({
            email:data.email,
            password: data.password
        })
    }).then(res=>res.json())
}
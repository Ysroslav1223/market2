export function request(url,method,data){
    return fetch(url,{
        method: method||"GET",
        headers:{
            "content-type":"application/json"
        },
        body: data ? JSON.stringify(data): undefined,
        credentials:'include'
    }).then(res=>res.json())
}

export default  function(roles){
        return (req,res,next)=>{
            if(!roles.includes(req.user.role)){
                res.send({error:'нет доступа'})

                return
            }
            next()
        }
}
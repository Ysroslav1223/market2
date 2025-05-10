export default function (user){
    return {
        id: user.id,
        email: user.email,
        name:user.name,
        roleId: user.role
    }
}
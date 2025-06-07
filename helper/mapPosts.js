export default function (posts){
    return {
        id: posts.id,
        name: posts.name,
        price:posts.price,
        category:posts.category,
        generation:posts.generation,
        image:posts.image
    }
}
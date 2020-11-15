
export async function create(productId, quantity) {
    return new Promise((resolve) => {
        console.log('created stock ->', {productId, quantity});
        resolve()
    })
}
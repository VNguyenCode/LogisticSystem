export async function shipPackage(mass) {
    if(mass > 1.8) {
        throw new Error('Package over weight limit!');
    }

    return { ok: true }
}
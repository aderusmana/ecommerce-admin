import prismadb from "@/lib/prismadb"


export const getTotalProduct = async(storeId: string) => {
    const totalProducts = await prismadb.product.count({
        where: {
            storeId,
            isArchived:false
        },
    })

    return totalProducts;
}
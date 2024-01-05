import prismadb from "@/lib/prismadb"


export const getTotalSales = async(storeId: string) => {
    const totalSales = await prismadb.order.count({
        where: {
            storeId,
            isPaid:true
        },
    })

    return totalSales;
}
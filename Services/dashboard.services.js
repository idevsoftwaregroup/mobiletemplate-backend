import prisma from "../Database/prisma.js";


export const getDashboardStats = async()=>{


    const users = await prisma.user.count();


    const products = await prisma.product.count();


    const orders = await prisma.order.count();


    const pendingPayments = await prisma.payment.count({
        where:{
            status:"pending_review"
        }
    });


    const revenue = await prisma.payment.aggregate({

        _sum:{
            amount:true
        },

        where:{
            status:"paid"
        }

    });



    return {

        users,

        products,

        orders,

        pendingPayments,

        revenue:
            revenue._sum.amount || 0

    };


};





export const getRecentOrders = async()=>{


return await prisma.order.findMany({

take:10,

orderBy:{
    createdAt:"desc"
},


include:{


user:{
select:{
firstName:true,
lastName:true,
email:true
}
},


items:{
include:{
product:true
}
}


}


});


};






export const getPendingPayments = async()=>{


return await prisma.payment.findMany({

where:{
status:"pending"
},


orderBy:{
createdAt:"desc"
},


include:{

order:{

include:{

user:{
select:{
firstName:true,
lastName:true,
email:true
}
}

}

}

}


});


};

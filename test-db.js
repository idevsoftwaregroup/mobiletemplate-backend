import prisma from "./Database/prisma.js";


async function test(){

    const users = await prisma.user.findMany();

    console.log(users);

}


test()
.catch((error)=>{

    console.error(error);

})
.finally(async()=>{

    await prisma.$disconnect();

});

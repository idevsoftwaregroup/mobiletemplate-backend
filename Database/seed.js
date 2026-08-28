import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";


const prisma = new PrismaClient();


async function main(){

    const passwordHash = await bcrypt.hash(
        "Admin@123456",
        10
    );


    const admin = await prisma.user.upsert({

        where:{
            email:"admin@mobiletemplate.com"
        },

        update:{},

        create:{

            firstName:"Admin",

            lastName:"User",

            email:"admin@mobiletemplate.com",

            passwordHash,

            role:"admin",

            status:"active"
        }

    });


    console.log("Admin created:");
    console.log(admin);

}


main()
.catch(console.error)
.finally(()=>prisma.$disconnect());

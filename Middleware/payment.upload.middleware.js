import multer from "multer";
import path from "path";


const storage = multer.diskStorage({

  destination: function(req, file, cb){

    cb(
      null,
      "uploads/payments"
    );

  },


  filename: function(req, file, cb){

    const ext = path.extname(file.originalname);


    cb(
      null,
      `${Date.now()}${ext}`
    );

  }

});



const uploadPayment = multer({

  storage,


  fileFilter(req,file,cb){

    const allowed = [
      "image/png",
      "image/jpeg",
      "image/webp"
    ];


    if(allowed.includes(file.mimetype)){

      cb(null,true);

    }else{

      cb(
        new Error("Only images allowed"),
        false
      );

    }

  }

});


export default uploadPayment;

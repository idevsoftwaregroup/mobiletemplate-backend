import multer from "multer";
import path from "path";


const storage = multer.diskStorage({

  destination(req, file, cb){

    cb(
      null,
      "uploads/pages"
    );

  },


  filename(req, file, cb){

    const ext = path.extname(file.originalname);


    cb(
      null,
      `${Date.now()}${ext}`
    );

  }

});



const uploadPage = multer({

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


export default uploadPage;


import { NextResponse } from "next/server";
import dbConnect from "@/config/dbConnect";
import SignIn from "@/schemas/signinSchema/SignIn";
import bookSchema from "@/schemas/bookstoreSchema/bookSchema";

const ImageKit = require("imagekit");

const imageKit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATEKEY,
  urlEndpoint: process.env.URLENDPOINT,
});

export async function POST(request) {
  try {
    await dbConnect();

    let body = await request.json();
    let { bookinfo, img, userid } = body;

    if(img?.length < 1){
      throw new Error("please upload some images");
    }

    let finduser = await SignIn.countDocuments({ _id: userid });
    if (!finduser) {
      throw new Error("user not found please login again");
    }
    
    bookinfo.userid = userid;
    let storeindb = await bookSchema.create(bookinfo);

    if (!storeindb) {
      throw new Error("something wrong in db");
    }
    //upload the image to imagekit server
    const cloudimgs = [];

    for (const obj of img) {
      try {
        const file = obj.url;
        const imgname = obj.file;
        const response = await imageKit.upload({
          file,
          fileName: imgname,
        });
        if (response) {
          if (response.fileId) {
            cloudimgs.push({
              img_id: response.fileId,
              img_url: response.url,
            });
          }
        }
      } catch (error) {
        continue;
      }
    }

    if (cloudimgs.length < 1) {
      let deletedoc = await bookSchema.findByIdAndDelete({
        _id: storeindb._id,
      });
      throw new Error("error in storing images");
    }

    if (cloudimgs.length > 0) {
      let addimages = await bookSchema.findByIdAndUpdate(
        { _id: storeindb._id },
        { $set: { imgs_url: cloudimgs } }
      );
    }

    return NextResponse.json({success:true , msg:"ur book has been stored"});
  } catch (error) {
    return NextResponse.json( {success:false , msg: error.message});
  }
}
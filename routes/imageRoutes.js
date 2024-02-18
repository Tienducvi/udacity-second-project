import express from "express";
import {filterImageFromURL, deleteLocalFiles} from '../util/util.js';

export const router = express.Router();

router.get("/filteredimage", async (req,res) => {
    let { image_url } = req.query;
    console.log(image_url);
    // No image url param
    if(!image_url) {
        return res.status(404).send("404 Not Found!");
    }
    //image url param is empty
    if(image_url.length == 0) {
        return res.status(400).send("Bad Request!");
    }
    //send the resulting file in the response
    filterImageFromURL(image_url)
    .then((resolve) => {
        return res.status(200).sendFile(resolve);
    })
    //Error in function
    .catch((error) => {
        return res.status(500).send("Internal Server Error: " + error);
    })
    //deletes any files on the server on finish of the response
    .finally((resolve) => {
        if(resolve) {
            deleteLocalFiles(resolve);
        }
    })
})

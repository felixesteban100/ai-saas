"use server";

import { revalidatePath } from "next/cache";
// import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import User from "../database/models/user.model";
// import Image from "../database/models/image.model";
import { redirect } from "next/navigation";
import { collectionUser, collectionImage } from "../database/mongodb";
import { ObjectId } from "mongodb";
import { v2 as cloudinary } from 'cloudinary'

// ADD IMAGE 
export async function addImage({ image, userId, path }: AddImageParams) {
    try {
        // await connectToDatabase()
        const author = await collectionUser.findOne({ _id: new ObjectId(userId) });

        if (!author) throw new Error("User not found")

        const newImage = await collectionImage.insertOne({
            ...image,
            author: {
                _id: author._id,
                firstName: author.firstName,
                lastName: author.lastName
            }
        })

        revalidatePath(path)

        return JSON.parse(JSON.stringify(newImage))
    } catch (error) {
        handleError(error)
    }
}

// UPDATE IMAGE
export async function updateImage({ image, userId, path }: UpdateImageParams) {
    try {
        // await connectToDatabase()
        // const imageToUpdate = await Image.findById(image._id)
        const imageToUpdate = await collectionImage.findOne({ _id: new ObjectId(image._id) })

        if (imageToUpdate && imageToUpdate.author._id.toString() !== userId) throw new Error("Unathorized")
        if (!imageToUpdate) throw new Error("Image not found")

        // const updatedImage = await Image.findByIdAndUpdate(image._id, image, { new: true })
        const updatedImage = await collectionImage.findOneAndUpdate({ _id: new ObjectId(image._id) }, image)

        revalidatePath(path)

        return JSON.parse(JSON.stringify(updatedImage))
    } catch (error) {
        handleError(error)
    }
}

//DELETE IMAGE
export async function deleteImage(imageId: string, userId: string) {
    try {
        // await connectToDatabase()
        //I ADDED THIS VERIFICATION
        // const imageToUpdate = await Image.findById(imageId)
        const imageToUpdate = await collectionImage.findOne({ _id: new ObjectId(imageId) })
        if (imageToUpdate && imageToUpdate.author.toHexString() !== userId) throw new Error("Unathorized")
        //I ADDED THIS VERIFICATION


        // await Image.findByIdAndDelete(imageId)
        await collectionImage.findOne({ _id: new ObjectId(imageId) })
    } catch (error) {
        handleError(error)
    } finally {
        redirect("/")
    }
}

// GET IMAGE 
export async function getImageById(imageId: string) {
    try {
        // await connectToDatabase()
        // const image = await populateUser(Image.findById(imageId))
        // const image = await populateUser(collectionImage.findOne({ _id: new ObjectId(imageId) }))
        const image = await collectionImage.findOne({ _id: new ObjectId(imageId) })
        if (!image) throw new Error("Image not found")

        const user = await collectionUser.findOne({ _id: image?.author?._id })

        return JSON.parse(JSON.stringify({ ...image, author: { ...user } }))
    } catch (error) {
        handleError(error)
    }
}

/* function populateUser(query: any) {
    return query.populate({
        path: 'author',
        model: User,
        select: '_id firstName lastName'
    })
} */


// GET IMAGES
export async function getAllImages({ limit = 9, page = 1, searchQuery = "" }: {
    limit?: number;
    page: number;
    searchQuery?: string;
}) {
    try {
        cloudinary.config({
            cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        })

        let expression = 'folder=ai-saas'

        if (searchQuery) {
            expression += `AND ${searchQuery}`
        }

        const { resources } = await cloudinary.search
            .expression(expression)
            .execute()

        const resourcesIds = resources.map((resource: any) => resource.public_id);

        let query = {};

        if (searchQuery) {
            query = {
                publicId: {
                    $in: resourcesIds
                }
            }
        }

        const skipAmount = ((page - 1) * limit)

        const images = await collectionImage.find({ ...query })/* populateUser(collectionImage.find(query)) */
            .sort({ updatedAt: -1 })
            .skip(skipAmount)
            .limit(limit)
            .toArray()

        const totalImages = await collectionImage.countDocuments(query)
        const savedImages = await collectionImage.countDocuments()

        return {
            data: JSON.parse(JSON.stringify(images)),
            totalPages: Math.ceil(totalImages / limit),
            savedImages
        }

    } catch (error) {
        handleError(error)
    }
}
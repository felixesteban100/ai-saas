"use client";

import { toast } from "sonner"
import { CldUploadWidget, CldImage } from 'next-cloudinary';
import Image from "next/image";
import { dataUrl, getImageSize } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

type MediaUploaderProps = {
    onValueChange: (value: string) => void;
    setImage: React.Dispatch<any>;
    publicId: string;
    image: string;
    type: string;
}

export default function MediaUploader({
    onValueChange,
    setImage,
    image,
    publicId,
    type
}: MediaUploaderProps) {

    function onUploadSuccessHandler(result: any) {
        setImage((prevState: any) => ({
            ...prevState,
            publicId: result?.info?.public_id,
            width: result?.info?.width,
            height: result?.info?.height,
            secureURL: result?.info?.secure_url
        }))

        onValueChange(result?.info?.public_id)

        toast('Image uploaded successfully', {
            description: '1 credit was deducted from your account',
            duration: 5000,
            className: 'success-toast'
        })
    }

    function onUploadErrorHandler() {
        toast('Something went wrong while uploading', {
            description: 'Please try again',
            duration: 5000,
            className: 'error-toast'
        })
    }

    return (
        <CldUploadWidget
            uploadPreset="next-ai-saas"
            options={{
                multiple: false,
                resourceType: "image"
            }}
            onSuccess={onUploadSuccessHandler}
            onError={onUploadErrorHandler}
        >
            {({ open }) => (
                <div className="flex flex-col gap-4">
                    <h3 className="h3-bold">Original</h3>

                    {publicId ? (
                        <>
                            <div
                                className="cursor-pointer overflow-hidden rounded-[10px]"
                            >
                                <CldImage
                                    width={getImageSize(type, image, "width")}
                                    height={getImageSize(type, image, "height")}
                                    src={publicId}
                                    alt={publicId}
                                    sizes="(max-width: 767px) 100vw, 50vw"
                                    placeholder={dataUrl as PlaceholderValue}
                                    className="media-uploader_cldImage"
                                />
                            </div>
                        </>
                    ) : (
                        <div
                            className="media-uploader_cta"
                            onClick={() => open()}
                        >
                            <div className="media-uploader_cta-image">
                                <Image
                                    src={"/assets/icons/add.svg"}
                                    alt="Add Image"
                                    width={24}
                                    height={24}
                                    className="invert"
                                />
                            </div>
                            <p className="p-14-medium">Click here to upload the image</p>
                        </div>
                    )}
                </div>
            )}
        </CldUploadWidget>
    )
}
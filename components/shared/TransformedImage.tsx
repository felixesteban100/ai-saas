"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { CldImage, getCldImageUrl } from "next-cloudinary";
import { dataUrl, debounce, download, getImageSize } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";


export default function TransformedImage({ image, type, title, transformationConfig, isTransforming, setIsTransforming, hasDownload = true }: TransformedImageProps) {
    function downloadHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault()

        download(getCldImageUrl({
            width: image?.width,
            height: image?.height,
            src: image?.publicId,
            ...transformationConfig
        }), title)
    }

    return (
        <div
            className="flex flex-col gap-4"
        >
            <div className="flex-between">
                <h3 className="h3-bold">Transformed</h3>

                {hasDownload && (
                    <Button variant={"ghost"} size={"icon"} className="download-btn" onClick={downloadHandler}>
                        <Image
                            src={"/assets/icons/download.svg"}
                            alt='Download'
                            width={24}
                            height={24}
                            className="pb-[6px] invert"
                        />
                    </Button>
                )}
            </div>

            {image?.publicId && transformationConfig ? (
                <div className="relative">
                    <CldImage
                        width={getImageSize(type, image, "width")}
                        height={getImageSize(type, image, "height")}
                        src={image?.publicId}
                        alt={image.title}
                        sizes={"(max-width: 767px) 100vw 50vw"}
                        placeholder={dataUrl as PlaceholderValue}
                        className="media-uploader_cldImage"
                        onLoad={() => {
                            setIsTransforming && setIsTransforming(false)
                        }}
                        onError={() => {
                            debounce(() => {
                                setIsTransforming && setIsTransforming(false)
                            }, 8000)
                        }}
                        {...transformationConfig}
                    />

                    {isTransforming && (
                        <div
                            className="transforming-loader"
                        >
                            <Image
                                src="/assets/icons/spinner.svg"
                                width={50}
                                height={50}
                                alt="spinner"
                            />
                            <p className="text-foreground/70">Please wait...</p>
                        </div>
                    )}
                </div>
            ) :
                (
                    <div className="transformed-placeholder">
                        Transformed Image
                    </div>
                )
            }
        </div>
    )
}
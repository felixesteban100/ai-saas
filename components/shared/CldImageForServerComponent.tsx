'use client'

import { CldImage, CldImageProps } from "next-cloudinary";

export default function CldImageForServerComponents(props: CldImageProps) {
    return (
        <CldImage
            {...props}
        />
    )
}
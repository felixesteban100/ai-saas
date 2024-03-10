import { auth } from "@clerk/nextjs";
import Link from "next/link";

import Header from "@/components/shared/Header";
import TransformedImage from "@/components/shared/TransformedImage";
import { Button } from "@/components/ui/button";
import { getImageById } from "@/lib/actions/image.actions";
import { getImageSize } from "@/lib/utils";
// import { CldImage } from "next-cloudinary";
import CldImageForServerComponents from "@/components/shared/CldImageForServerComponent";
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";
import { Metadata } from "next";
// import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";

export const metadata: Metadata = {
  title: 'Transformation',
}

export default async function ImageDetails({ params: { id } }: SearchParamProps) {
  const { userId } = auth();

  if (id === 'undefined') return <>Undefined image id</>

  const image = await getImageById(id);



  return (
    <>
      <Header title={image.title} subtitle="" />

      <section className="mt-5 flex flex-wrap gap-4">
        <div className="p-14-medium md:p-16-medium flex gap-2">
          <p className="text-primary">Transformation:</p>
          <p className=" capitalize">
            {image.transformationType}
          </p>
        </div>

        {image.prompt && (
          <>
            <p className="hidden text-foreground/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2 ">
              <p className="text-primary">Prompt:</p>
              <p className=" capitalize">{image.prompt}</p>
            </div>
          </>
        )}

        {image.color && (
          <>
            <p className="hidden text-foreground/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-primary">Color:</p>
              <p className=" capitalize">{image.color}</p>
            </div>
          </>
        )}

        {image.aspectRatio && (
          <>
            <p className="hidden text-foreground/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-primary">Aspect Ratio:</p>
              <p className=" capitalize">{image.aspectRatio}</p>
            </div>
          </>
        )}
      </section>

      <section className="mt-10 border-t border-border/15">
        <div className="transformation-grid">
          {/* MEDIA UPLOADER */}
          <div className="flex flex-col gap-4">
            <h3 className="h3-bold text-primary">Original</h3>

            <CldImageForServerComponents
              width={getImageSize(image.transformationType, image, "width")}
              height={getImageSize(image.transformationType, image, "height")}
              src={image.publicId}
              alt={image.title}
              className="transformation-original_image"
            />
          </div>

          {/* TRANSFORMED IMAGE */}
          <TransformedImage
            image={image}
            type={image.transformationType}
            title={image.title}
            isTransforming={false}
            transformationConfig={image.config}
            hasDownload={true}
          />
        </div>

        {userId === image.author.clerkId && (
          <div className="mt-4 space-y-4">
            <Button asChild type="button" className="submit-button capitalize">
              <Link href={`/transformations/${image._id}/update`}>
                Update Image
              </Link>
            </Button>

            <DeleteConfirmation imageId={image._id} />
          </div>
        )}
      </section>
    </>
  );
};

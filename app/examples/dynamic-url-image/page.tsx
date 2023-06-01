"use client";

import Image from "next/image";
import { useState, useRef } from "react";

function DynamicURLImage(): React.ReactElement {
  const [imageURL, setImageURL] = useState<string>("");
  const [imageHeight, setImageHeight] = useState<number | undefined>(undefined);
  const [naturalWidth, setNaturalWidth] = useState<number | undefined>(
    undefined
  );
  const [naturalHeight, setNaturalHeight] = useState<number | undefined>(
    undefined
  );
  const imageRef = useRef<HTMLImageElement>(null);

  function handleImageURLChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setImageURL(event.target.value);
    setImageHeight(undefined); // Reset the image height when URL changes
  }

  function handleImageLoad(): void {
    if (imageRef.current) {
      const { naturalWidth, naturalHeight } = imageRef.current;
      setNaturalWidth(naturalWidth);
      setNaturalHeight(naturalHeight);
      setImageHeight(naturalHeight);
    }
  }

  return (
    <div>
      <h1>Dynamic URL Image - Height/Width Getter</h1>
      <input
        type="text"
        value={imageURL}
        onChange={handleImageURLChange}
        placeholder="Paste image URL"
      />
      {imageURL && (
        <div>
          <Image
            src={imageURL}
            alt="My Image"
            width={500}
            height={imageHeight || 300} // Use a default height until the image loads
            onLoadingComplete={handleImageLoad}
            ref={imageRef}
          />
          {naturalWidth && naturalHeight && (
            <p>
              Natural width: {naturalWidth}px, Natural height: {naturalHeight}px
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default DynamicURLImage;

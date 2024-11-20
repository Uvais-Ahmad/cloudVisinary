'use client'
import React, {useEffect, useRef, useState} from 'react'
import { CldImage } from 'next-cloudinary';

const socialFormats = {
    "Instagram Square (1:1)" : {
        width: 1080,
        height: 1080,
        aspectRatio : "1:1"
    },
    "Instagram Portrait (4:5)" : {
        width: 1080,
        height: 1350,
        aspectRatio : "4:5"
    },
    "Thread X Post (16:9)" : {
        width: 1200,
        height: 675,
        aspectRatio : "16:9"
    },
    "Thread X header (3:1)" : {
        width: 1500,
        height: 500,
        aspectRatio : "3:1"
    },
    "Facebook Post(205:78)" : {
        width: 820,
        height: 312,
        aspectRatio : "205:78"
    }
}

type SocialFormats = keyof typeof socialFormats;

function SocialShare() {
    const [uploadImage, setUploadImage] = useState<String | null>(null);
    const [selectedFormat, setSelectedFormat] = useState<SocialFormats>("Instagram Square (1:1)");
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [isTransforming, setIsTransforming] = useState<boolean>(false);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if(uploadImage) {
            setIsTransforming(true);
        }
    }, [selectedFormat, uploadImage]);

    const handleFileUpload = async ( e: React
        // taking File and append it to the form data
        .ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        
        try {
            const response = await fetch("/api/image-upload", {
                method: "POST",
                body: formData
            });
            if(!response.ok) {
                throw new Error("Failed to upload image");
            }
            const data = await response.json();
            console.log("Data : ",data)
            setUploadImage(data.public_id);
        }
        catch(err) {
            console.error(err);
            alert("Failed to upload image");
        }
        finally {
            setIsUploading(false);
        }
    }

    const handleDownload = () => {
        if(!imageRef.current) return;

        fetch(imageRef.current.src)
        .then(response => response.blob())
        .then((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "social-share.png";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);  
        })
    }
console.log(uploadImage)
    return (    
        <div className='container mx-auto p-4 max-w-4xl'>
            <h1 className='text-3xl font-bold mb-6 text-center'>
                Social Media Image Creator
            </h1>

            <div className='card'>
                <div className='card-body'>
                    <h2 className="card-title mb-4">Upload an Image</h2>
                    <div className='form-control'>
                        <label className="label">
                            <span className="label-text">Choose an image file</span>
                        </label>
                        <input
                            type="file"
                            onChange={handleFileUpload}
                            className="file-input file-input-bordered file-input-primary w-full"
                        />
                    </div>

                    {isUploading && <div className='mt-4'>
                        <progress className='progress progress-primary w-full' ></progress>
                    </div>}

                    {uploadImage && (
                        <div className='mt-6'>
                            <h2 className="card-title mb-4">Select Social Media Format</h2>
                            <div className='form-control'>
                                <select
                                    className="select select-bordered w-full"
                                    value={selectedFormat}
                                    onChange={(e) => 
                                        setSelectedFormat(e.target.value as SocialFormats)
                                    }
                                >
                                    {Object.keys(socialFormats).map(format => (
                                        <option key={format} value={format}>
                                            {format}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className='mt-6 relative'>
                                <h3 className='text-lg font-semibold mb-2'>Preview :</h3>

                                <div className='flex justify-center'>
                                    {isTransforming && (
                                        <div className='absolute inset-0 flex items-center justify-center bg-base-100'>
                                            <span className='loading loading-spinner loading-lg'></span>
                                        </div>
                                    )}
                                    <CldImage
                                        width={socialFormats[selectedFormat].width}
                                        height={socialFormats[selectedFormat].height}
                                        src={uploadImage}
                                        sizes="100vw"
                                        alt="transformed image"
                                        crop="fill"
                                        aspectRatio={socialFormats[selectedFormat].aspectRatio}
                                        gravity='auto'
                                        ref={imageRef}
                                        onLoad={() => setIsTransforming(false)}
                                    />
                                </div>
                            </div>

                            <div className="card-actions justify-end mt-6">
                                <button className="btn btn-primary" onClick={handleDownload}>
                                Download for {selectedFormat}
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default SocialShare
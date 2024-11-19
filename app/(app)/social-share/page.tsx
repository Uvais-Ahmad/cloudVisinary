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
            setUploadImage(data.publicId);
        }
        catch(err) {
            console.error(err);
            alert("Failed to upload image");
        }
        finally {
            setIsUploading(false);
        }
    }

    return (
        <div>SocialShare</div>
    )
}

export default SocialShare
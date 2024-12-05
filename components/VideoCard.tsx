import React, {useState, useEffect, useCallback} from 'react'
import {getCldImageUrl, getCldVideoUrl} from 'next-cloudinary'
import { filesize } from 'filesize'
import { Video } from '@prisma/client'

interface VideoCardProps {
    video : Video,
    onDownload : (url: string, title: string) => void
}

const VideoCard: React.FC<VideoCardProps> = ({video, onDownload}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [previewError, setPreviewError] = useState(false);

    const getThumbnailUrl = useCallback((publicId: string) => {
        return getCldImageUrl({
            src: publicId,
            width: 400,
            height: 225,
            crop: 'fill',
            gravity: 'auto',
            format: 'jpg',
            quality: 'auto',
            assetType: 'video'
        })
    }, []);


    const getPreviewVideoUrl = useCallback((publicId: string) => {
        return getCldVideoUrl({
            src: publicId,
            width: 400,
            height: 225,
            rawTransformations: ["e_preview:duration_15:max_seg_9:min_seg_dur_1"]
        })
    }, []);

    const formatSize = useCallback((size: number) => {
        return filesize(size);
    }, []);

    const formatDuration = useCallback((seconds : number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);
        return `${minutes}:${remainingSeconds?.toString().padStart(2, '0')}`;
    }, []);
    
    const compressionPercentage = Math.round(
        (1 - Number(video.compressedSize) / Number(video.originalSize)) * 100
    )

    useEffect(() => {
        setPreviewError(false);
    }, [isHovered]);
    const handlePreviewError = () => {
        setPreviewError(true);
    }

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

        </div>
    )
}

export default VideoCard
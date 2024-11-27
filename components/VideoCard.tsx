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
    }, [])
    return (
        <div>

        </div>
    )
}

export default VideoCard
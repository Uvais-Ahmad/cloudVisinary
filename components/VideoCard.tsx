import React, {useState, useEffect, useCallback} from 'react'
import {getCldImageUrl, getCldVideoUrl} from 'next-cloudinary'
import { filesize } from 'filesize'
import { Video } from '@prisma/client'
import { Clock } from 'lucide-react'

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
            className="card bg-base-100 shadow-xl hover:shadow-2xl
            transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <figure className='aspect-video relative'>
                {isHovered ? (
                    previewError ? (
                        <div className='w-full h-full flex items-center justify-center bg-gray-200'>
                            <p className='text-red-500'>Preview not available</p>
                        </div>
                    ) : (
                        <video 
                            src={getPreviewVideoUrl(video.publicId)}
                            autoPlay
                            muted
                            loop
                            className='w-full h-full object-cover'
                            onError={handlePreviewError}
                        />
                    )
                ) : (
                    <img 
                        src={getThumbnailUrl(video.publicId)}
                        alt={video.title}
                        className='w-full h-full object-cover'
                    />
                )}
                <div
                    className='absolute bg-base-100 bottom-2 right-2 bg-opacity-70 px-2 py-1 
                    rounded-lg text-sm flex items-center'
                >
                    <Clock size={16} className='mr-1' />
                    {formatDuration(video.duration)}
                </div>
            </figure>

        </div>
    )
}

export default VideoCard
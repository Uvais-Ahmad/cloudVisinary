"use client";
import VideoCard from '@/components/VideoCard'
import { Video } from '@prisma/client'
import axios from 'axios'
import React, {useCallback, useEffect, useRef, useState} from 'react'

const Home = () => {
    const [videos, setVideos] = useState<Video[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchVideos = useCallback(async () => {
        try {
            const response = await axios.get("/api/videos")
            const data = response?.data?.data
            if(Array.isArray(data)) {
                
                setVideos(data)
            } else {
                throw new Error(" Unexpected response format");

            }
        } catch (error) {
            console.log(error);
            setError("Failed to fetch videos")

        } finally {
            setLoading(false)
        }
    }, []);

    useEffect(() => {
        fetchVideos()
    }, [fetchVideos])

    const handleDownload = useCallback((url: string, title: string) => {
        const a = document.createElement('a');
        a.href = url;
        a.setAttribute("download", `${title}.mp4`);
        a.setAttribute("target", "_blank");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    },[])

    if(loading){
        return <div>Loading...</div>
    }
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Videos</h1>
            {videos.length === 0 ? (
                <div className="text-center text-lg text-gray-500">
                No videos available
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    videos.map((video) => (
                        <VideoCard
                            key={video.id}
                            video={video}
                            onDownload={handleDownload}
                        />
                    ))
                }
                </div>
            )}
        </div>
    )
}

export default Home
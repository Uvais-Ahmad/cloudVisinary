import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';
import { error } from 'console';
import { NextRequest, NextResponse } from 'next/server';


const prisma = new PrismaClient();
// Configuration
cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

interface CloudinaryUploadResult {
    public_id : string;
    bytes: number;
    duration? : number;
    [key: string]: any;
}

export async function POST(request: NextRequest) {
    try {
        const {userId} = auth();
        if( !userId ){
            return NextResponse.json({
                error: "Unauthorized"
            }, {status: 401});
        }

        if(
            !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
            !process.env.CLOUDINARY_API_KEY ||
            !process.env.CLOUDINARY_API_SECRET
        ){
            return NextResponse.json({
                error: "Cloudinary not configured"
            },{status: 500});
        }       
    
        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const originalSize = formData.get('originalSize') as string;

        if( !file ) {
            return NextResponse.json({
                error: "No file uploaded"
            },{status: 400});
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes); 

        const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { 
                    folder: 'skyCast',
                    resource_type: 'video',
                    transformation: [
                        { fetch_format: 'mp4', quality: 'auto' },
                    ]
                }, 
                (error , result) => {
                if(error){
                    reject(error);
                } else {
                    resolve(result as CloudinaryUploadResult);
                }
            });
            uploadStream.end(buffer);
        });

        // Save the video to the database
        const video = await prisma.video.create({
            data: {
                title,
                description,
                originalSize,
                publicId: result.public_id,
                duration: result.duration || 0,
                compressedSize: String(result.bytes),
            }
        });
        return NextResponse.json(video);
    }
    catch (error) {
        return NextResponse.json({
            error: "Uploading video failed"
        }, {status: 500});
    }
    finally {
        prisma.$disconnect();
    }
}
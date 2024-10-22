import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request : NextRequest) {
    try {
        const videos = await prisma.video.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json({data : videos, message : "Videos fetched successfully", status : 200});
    } catch (error) {
        return NextResponse.json(error);
    }
    finally {
        await prisma.$disconnect();
    }
}
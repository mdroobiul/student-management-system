import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';
import { error } from 'next/dist/build/output/log';
import { NextResponse } from 'next/server';

export async function GET() {
    try{
        await dbConnect();
        const student = await Student.find({}).sort({createdAt: -1});
        return NextResponse.json({Success: true, data: student}, {status: 200})
    } catch (error) {
        return NextResponse.json({Success:false, error: error.message}, {status:500})
    }
}

    export async function POST (requst) {
        try {
            await dbConnect();
            const body = await requestAnimationFrame.json();
            return NextResponse.json({Success: true, data: student}, {status: 201})
        } catch (error) {
            return NextResponse.json({Success: false, data: error.message}, {status: 500})
        }
    }
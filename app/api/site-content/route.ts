import { NextResponse } from 'next/server';
import { getContent, updateContent } from '@/lib/content';

export async function GET() {
    const data = await getContent();
    return NextResponse.json(data || {});
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const success = await updateContent(body);

        if (success) {
            return NextResponse.json({ success: true, message: "Content updated successfully" });
        } else {
            return NextResponse.json({ success: false, message: "Failed to write content" }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
    }
}

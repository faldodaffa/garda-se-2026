import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const prompt = searchParams.get('prompt');

    if (!prompt) {
        return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const externalUrl = new URL('https://bpspapua.com/ai/ask');
    externalUrl.searchParams.append('prompt', prompt);
    externalUrl.searchParams.append('model', 'gemini');
    externalUrl.searchParams.append('token', 'Bpspapua9400');

    console.log(`[Proxy] Forwarding request to: ${externalUrl.toString()}`);

    try {
        const response = await fetch(externalUrl.toString(), {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[Proxy] External API Error: ${response.status} - ${errorText}`);
            return NextResponse.json({ error: `External API error: ${response.status}`, details: errorText }, { status: response.status });
        }

        // Try to parse as JSON first, fallback to text if necessary
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            return NextResponse.json(data);
        } else {
            const text = await response.text();
            // If text response, wrap it in a JSON object for consistency
            return NextResponse.json({ answer: text });
        }

    } catch (error) {
        console.error('[Proxy] Internal Server Error:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: String(error) }, { status: 500 });
    }
}

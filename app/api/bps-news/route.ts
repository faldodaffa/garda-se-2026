import { NextResponse } from 'next/server';

export async function GET() {
    const BPS_API_URL = "https://webapi.bps.go.id/v1/api/list/model/news/lang/ind/domain/9400/keyword/sensus+ekonomi/key/e70c8dae94e2972dbfc16cf893527f0e/";

    try {
        const response = await fetch(BPS_API_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            next: { revalidate: 3600 } // Revalidate every hour
        });

        if (!response.ok) {
            throw new Error(`BPS API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Ensure data exists and is an array
        if (!data || !data.data || !Array.isArray(data.data[1])) {
            // The BPS API structure is often: data: [status, [items...]]
            console.error("Invalid BPS API Structure", data);
            return NextResponse.json({ error: "Invalid API Structure", raw: data }, { status: 500 });
        }

        const rawNews = data.data[1];

        // Filtering Logic
        const today = new Date();
        const startDate = new Date('2025-01-01');

        const filteredNews = rawNews.filter((item: any) => {
            // Content Filter: Must contain "Sensus Ekonomi 2026" OR "SE2026" (Case Insensitive)
            const content = item.news ? item.news.toLowerCase() : "";
            const title = item.title ? item.title.toLowerCase() : "";
            const hasKeyword = content.includes('sensus ekonomi 2026') || content.includes('se2026') || title.includes('sensus ekonomi 2026') || title.includes('se2026');

            // Date Filter: >= 2025-01-01 AND <= Today
            const newsDate = new Date(item.rl_date);
            const isDateValid = newsDate >= startDate && newsDate <= today;

            return hasKeyword && isDateValid;
        });

        // Sorting Logic (Desc by Date)
        filteredNews.sort((a: any, b: any) => {
            return new Date(b.rl_date).getTime() - new Date(a.rl_date).getTime();
        });

        return NextResponse.json({ status: "success", count: filteredNews.length, data: filteredNews });

    } catch (error) {
        console.error("BPS Proxy Error:", error);
        return NextResponse.json({ error: "Internal Server Error", message: String(error) }, { status: 500 });
    }
}

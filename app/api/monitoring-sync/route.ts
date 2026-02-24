import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const SHEET_ID = '185TsYlPWC5TOGttuXuy19qO28h5cd1UkwpaSxCsGhQE';
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

        // Server-side fetch (bypasses browser CORS restrictions)
        const res = await fetch(url, { next: { revalidate: 0 } }); // Ensure no caching
        if (!res.ok) {
            throw new Error(`Failed to fetch from Google Sheets: ${res.status} ${res.statusText}`);
        }

        const text = await res.text();
        const rows = text.split('\n').map(r => r.split(','));

        let progresNasional = null;
        let lastUpdate = null;

        const pRow = rows.find(r => r[0]?.trim().toLowerCase() === 'progres');
        const uRow = rows.find(r => r[0]?.trim().toLowerCase() === 'update');

        if (pRow && pRow[1]) progresNasional = pRow[1].trim();
        if (uRow && uRow[1]) lastUpdate = uRow[1].trim();

        return NextResponse.json({
            success: true,
            data: {
                progresNasional,
                lastUpdate
            }
        });

    } catch (error) {
        console.error('Monitoring Sync API Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to sync data' }, { status: 500 });
    }
}

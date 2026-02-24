import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

export async function GET() {
    try {
        const SHEET_ID = '185TsYlPWC5TOGttuXuy19qO28h5cd1UkwpaSxCsGhQE';

        // Instead of CSV (which only gets the first sheet), we download the full XLSX workbook natively
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=xlsx`;

        // Server-side fetch (bypasses browser CORS restrictions)
        const res = await fetch(url, { next: { revalidate: 0 } }); // Ensure no caching
        if (!res.ok) {
            throw new Error(`Failed to fetch from Google Sheets: ${res.status} ${res.statusText}`);
        }

        const arrayBuffer = await res.arrayBuffer();

        // Parse the workbook using SheetJS
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });

        // The user's active sheet is always the *last* one in the workbook
        const lastSheetName = workbook.SheetNames[workbook.SheetNames.length - 1];
        const sheet = workbook.Sheets[lastSheetName];

        // Convert to 2D array matrix for easy row/col indexing
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];

        let progresNasional = null;
        let lastUpdate = null;

        // Based on the sheet structure: Update date is at Row 4, Col A (Index 3, 0)
        if (data[3] && data[3][0]) {
            lastUpdate = typeof data[3][0] === 'string' ? data[3][0].trim() : data[3][0].toString().trim();
        }

        // To find the Grand Total row resiliently:
        // We scan from the bottom up. The Grand Total row lacks a label in Column C (Index 2), 
        // but has massive numbers > 100k in Column D (Index 3) for Total Usaha SBR.
        for (let i = data.length - 1; i >= 0; i--) {
            const row = data[i];
            if (!row || row.length < 6) continue;

            const colC = row[2]; // Wilayah Label (Should be empty for Grand Total)
            const colD = row[3]; // Total Usaha SBR
            const colE = row[4]; // Total Usaha GC
            const colF = row[5]; // Persentase Usaha GC

            // Check if it matches the Grand Total structural signature
            if (!colC && typeof colD === 'number' && typeof colE === 'number' && typeof colF === 'number') {
                if (colD > 100000) { // Safety check, total SBR is ~194k nationwide
                    progresNasional = colF.toFixed(2); // Extract precisely rounded percentage
                    break; // Stop scanning once found
                }
            }
        }

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

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
        const monitoringData: any[] = [];

        // 1. Extract Last Update Date
        if (data[3] && data[3][0]) {
            lastUpdate = typeof data[3][0] === 'string' ? data[3][0].trim() : data[3][0].toString().trim();
        }

        // 2. Extract Regional Data (Kabupaten level)
        for (let i = 4; i < data.length; i++) {
            const row = data[i];
            if (!row || row.length < 6) continue;

            const colA = row[0]; // Kode Provinsi
            const colB = row[1]; // Kode Kab
            const colC = row[2]; // Nama Wilayah
            const colD = row[3]; // Total SBR
            const colE = row[4]; // Total GC
            const colF = row[5]; // Persentase GC

            // Needs to have a valid Kode Kab and actual numbers to be a valid region row
            if (colC && typeof colB === 'number' && typeof colD === 'number' && typeof colE === 'number') {

                // Map Province Code to Name
                let wilayah_induk = 'Provinsi Lainnya';
                if (colA === 94) wilayah_induk = 'PAPUA';
                else if (colA === 95) wilayah_induk = 'PAPUA SELATAN';
                else if (colA === 96) wilayah_induk = 'PAPUA TENGAH';
                else if (colA === 97) wilayah_induk = 'PAPUA PEGUNUNGAN';

                // Clean percentage
                let progresValue = 0;
                if (typeof colF === 'number') {
                    progresValue = Number((colF * 100).toFixed(2));
                } else if (typeof colF === 'string') {
                    progresValue = Number(colF.replace('%', '').trim());
                }

                monitoringData.push({
                    id: `${colA}-${colB}`,
                    wilayah: String(colC).trim(),
                    target: colD,
                    selesai: colE,
                    progres: progresValue || 0,
                    wilayah_induk: wilayah_induk
                });
            }
        }

        // 3. Extract Grand Total
        for (let i = data.length - 1; i >= 0; i--) {
            const row = data[i];
            if (!row || row.length < 6) continue;

            const colC = row[2]; // Label
            const colD = row[3]; // Total Usaha SBR
            const colE = row[4]; // Total Usaha GC
            const colF = row[5]; // Persentase Usaha GC

            // Grand Total signature: No Label in Col C, big numbers in D/E/F
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
                lastUpdate,
                monitoringData
            }
        });

    } catch (error) {
        console.error('Monitoring Sync API Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to sync data' }, { status: 500 });
    }
}

const XLSX = require('xlsx');

async function extractTable() {
    const SHEET_ID = '185TsYlPWC5TOGttuXuy19qO28h5cd1UkwpaSxCsGhQE';
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=xlsx`;
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    const wb = XLSX.read(buf, { type: 'array' });
    const lastSheetName = wb.SheetNames[wb.SheetNames.length - 1];
    const data = XLSX.utils.sheet_to_json(wb.Sheets[lastSheetName], { header: 1 });

    let monitoringData = [];
    let currentProvinsi = '';

    for (let i = 4; i < data.length; i++) { // Start scanning after headers
        const row = data[i];
        if (!row || row.length < 6) continue;

        const colA = row[0]; // Kode Provinsi
        const colB = row[1]; // Kode Kab
        const colC = row[2]; // Nama Wilayah
        const colD = row[3]; // Total SBR
        const colE = row[4]; // Total GC
        let colF = row[5]; // Persentase GC

        // Skip Grand Total or empty rows
        if (!colC) continue;

        // Is it a Provincial Recap row? e.g. "[94] PAPUA"
        if (typeof colC === 'string' && colC.trim().startsWith('[')) {
            // It's a provincial divider, not a Kabupaten.
            // But we can extract the province name to use as `wilayah_induk` for subsequent Kabupatens,
            // or we might already know it based on the preceding rows. 
            // In the user's data, Kabs come first, THEN the provincial recap recap.
            // Oh wait, if Kabs come first, how do we know the province? 
            // The province code is in Col A. So we can map Wilayah Induk.
            continue; // Skip the recap row for the detailed table, or keep it? The user's mocked table has Kabupatens.
        }

        // If it has Kode Kab, it's a valid Regional row.
        if (typeof colB === 'number' && typeof colD === 'number' && typeof colE === 'number') {

            // Map Province Code to Name
            let wilayah_induk = 'Provinsi Lainnya';
            if (colA === 94) wilayah_induk = 'PAPUA';
            else if (colA === 95) wilayah_induk = 'PAPUA SELATAN';
            else if (colA === 96) wilayah_induk = 'PAPUA TENGAH';
            else if (colA === 97) wilayah_induk = 'PAPUA PEGUNUNGAN';

            // Clean up percentage (could be string like '99.07%' or number like 0.9907)
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

    console.log(`Found ${monitoringData.length} Kabupatens!`);
    console.log(monitoringData.slice(0, 3));
    console.log(monitoringData.slice(-3));
}
extractTable().catch(console.error);

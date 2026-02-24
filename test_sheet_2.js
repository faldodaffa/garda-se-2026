const XLSX = require('xlsx');

async function extract() {
    const SHEET_ID = '185TsYlPWC5TOGttuXuy19qO28h5cd1UkwpaSxCsGhQE';
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=xlsx`;
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    const wb = XLSX.read(buf, { type: 'array' });
    const lastSheetName = wb.SheetNames[wb.SheetNames.length - 1];
    const data = XLSX.utils.sheet_to_json(wb.Sheets[lastSheetName], { header: 1 });

    let lastUpdate = null;
    let progresNasional = null;

    if (data[3] && data[3][0]) {
        lastUpdate = typeof data[3][0] === 'string' ? data[3][0].trim() : data[3][0].toString().trim();
    }

    // Find grand total row from the bottom up
    for (let i = data.length - 1; i >= 0; i--) {
        const row = data[i];
        if (!row || row.length < 6) continue;

        // Grand total row has no text in Col C (index 2), but has large numbers in Col D, E, F (index 3, 4, 5)
        const colC = row[2];
        const colD = row[3];
        const colE = row[4];
        const colF = row[5];

        if (!colC && typeof colD === 'number' && typeof colE === 'number' && typeof colF === 'number') {
            if (colD > 100000) { // Safety check, SBR total is ~194k
                progresNasional = colF.toFixed(2);
                break;
            }
        }
    }

    console.log("Date:", lastUpdate);
    console.log("Progres:", progresNasional);
}
extract().catch(console.error);

const XLSX = require('xlsx');

async function testSheet() {
    const SHEET_ID = '185TsYlPWC5TOGttuXuy19qO28h5cd1UkwpaSxCsGhQE';
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=xlsx`;

    console.log('Fetching:', url);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

    const arrayBuffer = await res.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });

    console.log('Sheet Names:', workbook.SheetNames);

    const lastSheetName = workbook.SheetNames[workbook.SheetNames.length - 1];
    console.log('Using Last Sheet:', lastSheetName);

    const sheet = workbook.Sheets[lastSheetName];
    // Convert to 2D array (array of arrays) to easily grab cells by row/col index
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    console.log('Rows count:', data.length);
    console.log('First 5 rows:');
    console.log(data.slice(0, 5));

    // Attempting to find date
    let extractedDate = null;
    let extractedProgres = null;

    // Based on user image: Row 4 is a date: "23 Februari 2026"  (which is index 3 in 0-indexed array)
    // Row 40 is total data (index 39) with 92.35 in column F (index 5)

    if (data[3] && data[3][0]) {
        extractedDate = typeof data[3][0] === 'string' ? data[3][0] : data[3][0].toString();
    }

    // Find last row that has numeric data in column 5 (index 4 for Total Usaha SBR, 5 for Persentase)
    // Usually the last non-empty row in column F gives the grand total
    const lastRow = data[data.length - 1];
    console.log('Last row:', lastRow);

    // Let's print out the last 5 rows to see where the grand total is
    console.log('Last 5 rows:');
    console.log(data.slice(-5));
}

testSheet().catch(console.error);

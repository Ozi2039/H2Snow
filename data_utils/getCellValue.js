export function getCellValue(spreadsheetId, sheetName, cellAddress) {

    const { execSync } = require('child_process');
    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;

    const csvData = execSync(`curl -L -s "${url}"`, { stdio: ['pipe', 'pipe', 'ignore'] }).toString();

    const rows = csvData.split('\n').map(r => r.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/));

    const col = cellAddress.match(/[A-Z]+/)[0].split('').reduce((a, v) => a * 26 + v.charCodeAt(0) - 64, 0) - 1;
    const row = parseInt(cellAddress.match(/\d+/)[0]) - 1;

    const value = rows[row][col];
    return value ? value.replace(/^"|"$/g, '').trim() : "";
}

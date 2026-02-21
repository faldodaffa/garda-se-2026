export interface RegionData {
    code: string;
    name: string;
    wilkerstatProgress: number;
    rekrutmenProgress: number;
    children?: RegionData[]; // For regencies/cities under a province
}

export const initialRegionData: RegionData[] = [
    {
        code: "9400",
        name: "PAPUA",
        wilkerstatProgress: 85,
        rekrutmenProgress: 88,
        children: [
            { code: "9403", name: "Jayapura", wilkerstatProgress: 80, rekrutmenProgress: 85 },
            { code: "9408", name: "Kepulauan Yapen", wilkerstatProgress: 75, rekrutmenProgress: 78 },
            { code: "9409", name: "Biak Numfor", wilkerstatProgress: 88, rekrutmenProgress: 90 },
            { code: "9419", name: "Sarmi", wilkerstatProgress: 60, rekrutmenProgress: 65 },
            { code: "9420", name: "Keerom", wilkerstatProgress: 70, rekrutmenProgress: 72 },
            { code: "9426", name: "Waropen", wilkerstatProgress: 55, rekrutmenProgress: 50 },
            { code: "9427", name: "Supiori", wilkerstatProgress: 65, rekrutmenProgress: 68 },
            { code: "9428", name: "Mamberamo Raya", wilkerstatProgress: 45, rekrutmenProgress: 40 },
            { code: "9471", name: "Kota Jayapura", wilkerstatProgress: 92, rekrutmenProgress: 95 }
        ]
    },
    {
        code: "9500",
        name: "PAPUA SELATAN",
        wilkerstatProgress: 72,
        rekrutmenProgress: 70,
        children: [
            { code: "9501", name: "Merauke", wilkerstatProgress: 78, rekrutmenProgress: 80 },
            { code: "9502", name: "Boven Digoel", wilkerstatProgress: 65, rekrutmenProgress: 60 },
            { code: "9503", name: "Mappi", wilkerstatProgress: 50, rekrutmenProgress: 48 },
            { code: "9504", name: "Asmat", wilkerstatProgress: 55, rekrutmenProgress: 52 }
        ]
    },
    {
        code: "9600",
        name: "PAPUA TENGAH",
        wilkerstatProgress: 68,
        rekrutmenProgress: 65,
        children: [
            { code: "9601", name: "Mimika", wilkerstatProgress: 85, rekrutmenProgress: 82 },
            { code: "9602", name: "Dogiyai", wilkerstatProgress: 50, rekrutmenProgress: 45 },
            { code: "9603", name: "Deiyai", wilkerstatProgress: 55, rekrutmenProgress: 50 },
            { code: "9604", name: "Nabire", wilkerstatProgress: 75, rekrutmenProgress: 78 },
            { code: "9605", name: "Paniai", wilkerstatProgress: 60, rekrutmenProgress: 58 },
            { code: "9606", name: "Intan Jaya", wilkerstatProgress: 40, rekrutmenProgress: 35 },
            { code: "9607", name: "Puncak", wilkerstatProgress: 35, rekrutmenProgress: 30 },
            { code: "9608", name: "Puncak Jaya", wilkerstatProgress: 45, rekrutmenProgress: 42 }
        ]
    },
    {
        code: "9700",
        name: "PAPUA PEGUNUNGAN",
        wilkerstatProgress: 55,
        rekrutmenProgress: 52,
        children: [
            { code: "9701", name: "Nduga", wilkerstatProgress: 30, rekrutmenProgress: 25 },
            { code: "9702", name: "Jayawijaya", wilkerstatProgress: 70, rekrutmenProgress: 75 },
            { code: "9703", name: "Lanny Jaya", wilkerstatProgress: 50, rekrutmenProgress: 48 },
            { code: "9704", name: "Tolikara", wilkerstatProgress: 45, rekrutmenProgress: 40 },
            { code: "9705", name: "Mamberamo Tengah", wilkerstatProgress: 40, rekrutmenProgress: 38 },
            { code: "9706", name: "Yalimo", wilkerstatProgress: 48, rekrutmenProgress: 45 },
            { code: "9707", name: "Yahukimo", wilkerstatProgress: 55, rekrutmenProgress: 50 },
            { code: "9708", name: "Pegunungan Bintang", wilkerstatProgress: 42, rekrutmenProgress: 40 }
        ]
    }
];

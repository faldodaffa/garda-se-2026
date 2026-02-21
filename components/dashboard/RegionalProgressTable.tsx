"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useSiteConfig } from '@/context/SiteConfigContext';

export default function RegionalProgressTable() {
    const { config } = useSiteConfig();
    const data = config.monitoringData;

    const [expandedRows, setExpandedRows] = useState<string[]>([]);

    const toggleRow = (code: string) => {
        if (expandedRows.includes(code)) {
            setExpandedRows(expandedRows.filter(id => id !== code));
        } else {
            setExpandedRows([...expandedRows, code]);
        }
    };

    const ProgressBar = ({ value }: { value: number }) => (
        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div
                className="bg-se-jingga h-2.5 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${value}%` }}
            ></div>
        </div>
    );

    return (
        <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white/40 shadow-xl shadow-black/5 overflow-hidden">
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase font-bold tracking-wider">
                        <tr>
                            <th className="p-6 w-1/3">Wilayah (Kode BPS)</th>
                            <th className="p-6">Progress Wilkerstat</th>
                            <th className="p-6 text-right">Rekrutmen</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.map((province) => (
                            <React.Fragment key={province.code}>
                                {/* Province Row */}
                                <tr
                                    className="bg-gray-50/80 hover:bg-gray-100 transition-colors cursor-pointer group"
                                    onClick={() => toggleRow(province.code)}
                                >
                                    <td className="p-6 flex items-center font-bold text-gray-900">
                                        <div className="mr-4 p-1 rounded-md bg-white border border-gray-200 group-hover:border-orange-300 transition-colors">
                                            {expandedRows.includes(province.code) ? (
                                                <ChevronDown className="w-4 h-4 text-se-jingga" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4 text-gray-400" />
                                            )}
                                        </div>
                                        <div>
                                            <span className="text-gray-500 mr-2 font-mono text-xs">[{province.code}]</span>
                                            {province.name}
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-sm font-bold w-10">{province.wilkerstatProgress}%</span>
                                            <ProgressBar value={province.wilkerstatProgress} />
                                        </div>
                                    </td>
                                    <td className="p-6 text-right font-bold text-gray-700">
                                        <span className={`px-3 py-1 rounded-full text-xs ${province.rekrutmenProgress >= 80 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {province.rekrutmenProgress}%
                                        </span>
                                    </td>
                                </tr>

                                {/* Children (Regency) Rows */}
                                <AnimatePresence>
                                    {expandedRows.includes(province.code) && province.children && (
                                        <tr>
                                            <td colSpan={3} className="p-0 border-none">
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden bg-white"
                                                >
                                                    <table className="w-full">
                                                        <tbody>
                                                            {province.children.map((child) => (
                                                                <tr key={child.code} className="hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-none">
                                                                    <td className="p-4 pl-16 w-1/3 flex items-center text-sm text-gray-600">
                                                                        <span className="text-gray-400 mr-3 font-mono text-[10px]">{child.code}</span>
                                                                        {child.name}
                                                                    </td>
                                                                    <td className="p-4">
                                                                        <div className="flex items-center space-x-3">
                                                                            <span className="text-xs font-bold w-8 text-gray-500">{child.wilkerstatProgress}%</span>
                                                                            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                                                                <div className="bg-se-jingga h-1.5 rounded-full" style={{ width: `${child.wilkerstatProgress}%` }}></div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="p-4 text-right text-sm font-medium text-gray-600">
                                                                        {child.rekrutmenProgress}%
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </motion.div>
                                            </td>
                                        </tr>
                                    )}
                                </AnimatePresence>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

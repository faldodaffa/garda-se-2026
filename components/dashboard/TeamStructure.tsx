import React from 'react';
import { ShieldCheck, Users, Briefcase } from 'lucide-react';

const mainTeam = [
    { name: 'Adriana Helena Carolina', role: 'Penanggung Jawab', initial: 'AC' },
    { name: 'Tri Setyanto', role: 'Ketua Tim Pelaksana', initial: 'TS' },
    { name: 'Emmayati', role: 'Wk. Ketua Bidang Teknis', initial: 'EM' },
    { name: 'Emi Puspitarini', role: 'Wk. Ketua Bidang Administrasi', initial: 'EP' },
    { name: 'Abdurrahman Azhar', role: 'Wk. Ketua Bidang IT & Diseminasi', initial: 'AA' },
    { name: 'Intan Selfina N. Sinaga', role: 'Wk. Ketua Bidang Analisis', initial: 'IS' },
];

const secretariatTeam = [
    { name: 'Muchtar Abdul Kholiq', role: 'Ketua Sekretariat', initial: 'MK' },
    { name: 'Christien Murtie Andries', role: 'Wk. Ketua Adm', initial: 'CA' },
    { name: 'Liza Uli Nababan', role: 'Wk. Ketua Teknis', initial: 'LN' },
    { name: 'Fitrah Sarah Ramadhani', role: 'Wk. Ketua Publisitas', initial: 'FR' },
];

export default function TeamStructure() {
    return (
        <div className="py-12 space-y-16">
            {/* Section 1: Tim Pelaksana */}
            <div className="space-y-8">
                <div className="flex flex-col items-center justify-center text-center space-y-2">
                    <div className="p-3 bg-blue-100 rounded-2xl text-blue-600 mb-2">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Tim Pelaksana SE2026</h2>
                    <p className="text-gray-500 text-sm max-w-xl">
                        Tim utama Penyelenggaraan Teknis dan Manajerial BPS Provinsi Papua.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {mainTeam.map((member, index) => (
                        <div key={index} className="flex flex-col items-center group relative p-4 rounded-2xl border border-white/40 bg-white/20 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-blue-400 border-4 border-white shadow-md flex items-center justify-center text-lg font-bold text-white group-hover:scale-110 transition-transform duration-300">
                                {member.initial}
                            </div>
                            <div className="mt-4 text-center">
                                <p className="font-bold text-gray-900 text-[13px] leading-tight mb-1">{member.name}</p>
                                <p className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100 text-center">
                    <p className="text-xs text-blue-800 font-medium italic">
                        Didukung oleh 32 Staf Fungsional serta perwakilan instansi eksternal (Kominfo, Perindakop, Biro Perekonomian).
                    </p>
                </div>
            </div>

            {/* Section 2: Sekretariat GARDA */}
            <div className="space-y-8 pt-8 border-t border-gray-100/50">
                <div className="flex flex-col items-center justify-center text-center space-y-2">
                    <div className="p-3 bg-se-jingga rounded-2xl text-se-jingga mb-2">
                        <Users className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Sekretariat Tim (GARDA SE2026)</h2>
                    <p className="text-gray-500 text-sm max-w-xl">
                        Gugus Tugas Koordinasi Pendukung Teknis & Administrasi.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {secretariatTeam.map((member, index) => (
                        <div key={index} className="flex flex-col items-center group p-4 rounded-2xl border border-white/40 bg-white/20 backdrop-blur-sm hover:shadow-lg transition-all duration-300 w-44">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-orange-500 to-orange-400 border-4 border-white shadow-md flex items-center justify-center text-md font-bold text-white group-hover:scale-110 transition-transform duration-300">
                                {member.initial}
                            </div>
                            <div className="mt-4 text-center">
                                <p className="font-bold text-gray-900 text-[13px] leading-tight mb-1">{member.name}</p>
                                <p className="text-[10px] text-se-jingga font-semibold uppercase tracking-wider">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center flex-wrap gap-2 px-8">
                    {['Ahmad Fuad Samad', 'Juliana Sihombing', 'Marlin Anastasia Ariesta', 'Panni Genti R. Pardede', 'Sertya Irta Marsuti Bandua', 'Villya Martha Christian', 'Angela Miranda Simanjorang', 'Roni Purba'].map((name) => (
                        <span key={name} className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px] font-medium border border-gray-200">{name}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

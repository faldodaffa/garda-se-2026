"use client";

import React from 'react';
import { motion } from 'framer-motion';

const events = [
    {
        date: 'Feb - April 2026',
        title: 'Dukungan Kelembagaan & Koordinasi',
        description: 'Penguatan koordinasi dengan Pemerintah Daerah dan instansi terkait.',
        status: 'completed'
    },
    {
        date: 'Mei 2026',
        title: 'Pencanangan & Apel Siaga',
        description: 'Pencanangan oleh Kepala Daerah dan Apel Siaga Petugas Sensus.',
        status: 'active'
    },
    {
        date: '16 Mei - 31 Juli 2026',
        title: 'Pelaksanaan Pendataan Lapangan',
        description: 'Petugas melakukan pendataan lengkap door-to-door seluruh unit usaha.',
        status: 'upcoming'
    },
    {
        date: 'Pasca Juli 2026',
        title: 'Pengolahan & Diseminasi',
        description: 'Pengolahan data hasil sensus dan diseminasi hasil sementara.',
        status: 'upcoming'
    }
];

export default function EventTimeline() {
    return (
        <div className="py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 border-l-4 border-primary pl-4">Roadmap SE2026</h2>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                {events.map((event, index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            {/* Icon / Dot */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 transition-colors duration-500">
                                <div className={`w-3 h-3 rounded-full ${event.status === 'active' ? 'bg-primary animate-ping' : event.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                {event.status === 'active' && (
                                    <div className="absolute w-3 h-3 rounded-full bg-primary"></div>
                                )}
                            </div>

                            {/* Content */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/40 bg-white/40 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center justify-between space-x-2 mb-1">
                                    <span className="font-bold text-slate-900">{event.title}</span>
                                    <time className="font-caveat font-medium text-primary text-sm">{event.date}</time>
                                </div>
                                <div className="text-slate-500 text-sm">{event.description}</div>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

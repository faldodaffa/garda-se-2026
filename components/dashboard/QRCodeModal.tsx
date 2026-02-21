"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode } from 'lucide-react';

interface QRCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function QRCodeModal({ isOpen, onClose }: QRCodeModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative border border-white/20"
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>

                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                                    <QrCode className="w-8 h-8" />
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Akses Mobile Petugas</h3>
                                    <p className="text-gray-500 text-sm mt-1">Scan QR Code ini untuk membuka Aplikasi Garda SE2026 di ponsel Anda.</p>
                                </div>

                                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl flex items-center justify-center shadow-inner my-6">
                                    {/* Placeholder QR Code - Simulated with grid */}
                                    <div className="w-48 h-48 bg-white p-2 rounded-lg grid grid-cols-5 gap-1">
                                        {Array.from({ length: 25 }).map((_, i) => (
                                            <div key={i} className={`bg-black ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`}></div>
                                        ))}
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <span className="bg-white px-2 py-1 text-xs font-bold text-black border border-black rounded">SE2026</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="w-full py-3 bg-secondary hover:bg-yellow-400 text-white rounded-xl font-semibold transition-colors"
                                >
                                    Tutup
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

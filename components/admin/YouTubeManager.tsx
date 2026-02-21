"use client";

import React, { useState } from 'react';
import { Plus, Trash2, Youtube as YoutubeIcon, AlertCircle } from 'lucide-react';

export default function YouTubeManager() {
    const [videos, setVideos] = useState([{ id: 1, url: 'https://www.youtube.com/watch?v=9vzSi78d-Ys' }]);

    const addVideo = () => {
        setVideos([...videos, { id: Date.now(), url: '' }]);
    };

    const removeVideo = (id: number) => {
        if (videos.length === 1) return; // Prevent deleting last child
        setVideos(videos.filter(v => v.id !== id));
    };

    const updateUrl = (id: number, newUrl: string) => {
        setVideos(videos.map(v => v.id === id ? { ...v, url: newUrl } : v));
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900"><YoutubeIcon className="text-red-600" /> YouTube Playlist Manager</h3>
                    <p className="text-sm text-gray-500 mt-1">Kelola tautan video YouTube yang akan ditampilkan pada Media Center.</p>
                </div>
                <button
                    onClick={addVideo}
                    className="flex items-center px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-se-jingga transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Video
                </button>
            </div>

            <div className="bg-blue-50 text-blue-800 text-sm p-4 rounded-xl flex gap-3 items-start border border-blue-100">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-blue-600" />
                <p>Masukkan Link format lengkap seperti: <strong className="font-mono">https://www.youtube.com/watch?v=9vzSi78d-Ys</strong></p>
            </div>

            {/* Dynamic Grid Mapping */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((vid, index) => (
                    <div key={vid.id} className="border border-gray-200 bg-gray-50/50 p-5 rounded-2xl flex flex-col gap-4 shadow-sm hover:border-gray-300 transition-colors">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-gray-700 text-sm">Video #{index + 1}</span>
                            <button
                                onClick={() => removeVideo(vid.id)}
                                disabled={videos.length === 1}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                        <input
                            type="text"
                            value={vid.url}
                            onChange={(e) => updateUrl(vid.id, e.target.value)}
                            placeholder="https://youtube.com/..."
                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-se-jingga focus:border-transparent outline-none transition-all text-sm font-medium"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

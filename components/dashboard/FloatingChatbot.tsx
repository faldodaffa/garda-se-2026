"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

// Simple Markdown Renderer Component due to npm install restrictions
const MarkdownRenderer = ({ content }: { content: string }) => {
    const renderText = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index} className="font-bold">{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    return (
        <div className="space-y-2 text-sm leading-relaxed">
            {content.split('\n').map((line, index) => {
                // Headers
                if (line.startsWith('### ')) return <h3 key={index} className="font-bold text-base mt-2 text-gray-900 dark:text-gray-100">{renderText(line.slice(4))}</h3>;
                if (line.startsWith('## ')) return <h2 key={index} className="font-bold text-lg mt-3 text-gray-900 dark:text-gray-100">{renderText(line.slice(3))}</h2>;

                // Lists
                if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
                    return (
                        <div key={index} className="flex items-start ml-2 space-x-2">
                            <span className="mt-2 w-1.5 h-1.5 bg-current rounded-full flex-shrink-0 opacity-60" />
                            <span>{renderText(line.replace(/^[-*]\s+/, ''))}</span>
                        </div>
                    );
                }

                // Empty lines
                if (!line.trim()) return <div key={index} className="h-1" />;

                // Paragraphs
                return <p key={index}>{renderText(line)}</p>;
            })}
        </div>
    );
};

export default function FloatingChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Halo! Saya NOKEN, siap membantu Anda menjelaskan konsep dan definisi Sensus Ekonomi.',
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            // Call local proxy instead of external API directly
            const params = new URLSearchParams({
                prompt: inputValue
            });

            const response = await fetch(`/api/chat?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("API Error Response:", errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Assuming the API returns the answer in a property called 'answer' or 'text' based on common patterns.
            // If the structure is different, we might need to adjust.
            // Based on standard RAG APIs, let's assume valid JSON return.
            // Safely handling response structure:
            const botText = data.answer || data.text || data.response || (typeof data === 'string' ? data : "Maaf, format respon tidak dikenali.");

            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: botText,
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botResponse]);

        } catch (error) {
            console.error('Error sending message:', error);
            const errorResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: "Maaf, sistem sedang sibuk. Silakan coba beberapa saat lagi.",
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className="mb-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl w-[90vw] max-w-[380px] h-[500px] flex flex-col overflow-hidden"
                        >
                            {/* Chat Header */}
                            <div className="bg-gradient-to-r from-primary to-orange-500 p-4 flex items-center justify-between text-white shadow-sm">
                                <div className="flex items-center space-x-2">
                                    <div className="bg-white/20 p-1.5 rounded-full">
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm">NOKEN AI - Asisten SE2026</h3>
                                        <p className="text-[10px] text-white/80 flex items-center">
                                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></span>
                                            Navigasi Obrolan & Kecerdasan Ekonomi Nasional
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Chat Body */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[80%] p-3 text-sm ${msg.sender === 'user'
                                                ? 'bg-[#f79039] text-white font-medium shadow-sm rounded-2xl rounded-br-none'
                                                : 'bg-gray-100 text-slate-800 border border-gray-200 shadow-sm rounded-2xl rounded-bl-none prose prose-sm max-w-none prose-headings:text-slate-900 prose-strong:text-slate-900'
                                                }`}
                                        >
                                            {msg.sender === 'user' ? (
                                                msg.text
                                            ) : (
                                                <MarkdownRenderer content={msg.text} />
                                            )}
                                            <div className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-none shadow-sm flex items-center space-x-2">
                                            <span className="text-xs text-gray-400 font-medium animate-pulse">NOKEN sedang berpikir</span>
                                            <div className="flex space-x-1">
                                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Chat Input */}
                            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Tanya NOKEN tentang pedoman sensus..."
                                    className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2 text-sm text-slate-900 placeholder-gray-400 focus:ring-2 focus:ring-[#f79039]/50 focus:bg-white transition-all outline-none"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isLoading}
                                    className="p-2 bg-secondary text-white rounded-xl hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Floating Action Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Buka Chatbot NOKEN AI"
                    className={`p-4 rounded-full shadow-lg border border-white/20 backdrop-blur-md transition-all duration-300 ${isOpen ? 'bg-red-500 rotate-90' : 'bg-gradient-to-r from-primary to-orange-500'
                        }`}
                >
                    {isOpen ? (
                        <X className="w-6 h-6 text-white" />
                    ) : (
                        <MessageCircle className="w-8 h-8 text-white" />
                    )}
                </motion.button>
            </div>
        </>
    );
}

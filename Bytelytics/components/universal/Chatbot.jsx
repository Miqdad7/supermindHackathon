'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Send, Loader, MessageCircle } from 'lucide-react';

const formatAnalysisContent = (content) => {
    if (!content.includes('save-to-like ratio')) return content;

    const formattedContent = content
        .replace(/\*\*/g, '')
        .split('\n')
        .map(line => {
            if (line.match(/^\d+\.\s(Reel|Carousel|Static|Other)/)) {
                const [num, rest] = line.split('. ');
                return `<div class="font-bold text-lg mt-4 mb-2 text-blue-100">${num}. ${rest}</div>`;
            }
            if (line.includes('Post ID:')) {
                const posts = line.trim()
                    .split(',')
                    .map(post => {
                        const [id, ratio] = post.split('(');
                        return `<span class="inline-block bg-opacity-20 bg-white rounded px-2 py-1 m-1 text-sm">
                            ${id.replace('Post ID:', 'Post').trim()}: ${ratio?.replace(')', '')}
                        </span>`;
                    })
                    .join('');
                return `<div class="flex flex-wrap gap-1 mt-1">${posts}</div>`;
            }
            return `<div class="mb-2">${line}</div>`;
        })
        .join('');

    return formattedContent;
};

const ChatMessage = React.memo(({ message }) => {
    const formattedContent = formatAnalysisContent(message.content);

    return (
        <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
            <div
                className={`max-w-[90%] rounded-lg p-4 ${message.type === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                    : 'bg-gradient-to-r from-gray-800 to-gray-900 text-gray-100 shadow-lg'
                    }`}
            >
                <div
                    className="break-words"
                    dangerouslySetInnerHTML={{ __html: formattedContent }}
                />
            </div>
        </div>
    );
});

ChatMessage.displayName = 'ChatMessage';

const ChatWindow = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!input.trim() || isLoading) return;

        const userMessage = { type: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    input_value: input,
                    tweaks: {
                        "AstraDBToolComponent-CF8aW": {},
                        "ParseData-cwkgx": {},
                        "TextInput-OS4Th": {},
                        "ChatInput-L0kXb": {},
                        "CombineText-JYwrG": {},
                        "GroqModel-7sUX4": {},
                        "ChatOutput-X19Q2": {}
                    }
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }

            if (data.outputs?.[0]?.outputs?.[0]?.artifacts?.message) {
                setMessages((prev) => [...prev, {
                    type: 'bot',
                    content: data.outputs[0].outputs[0].artifacts.message
                }]);
            } else {
                throw new Error('Invalid response format from API');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessages((prev) => [
                ...prev,
                {
                    type: 'bot',
                    content: `Error: ${error.message || 'An unexpected error occurred. Please try again.'}`
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gradient-to-b from-gray-900 to-black rounded-lg shadow-2xl w-[800px] max-w-[90vw] flex flex-col border border-gray-800">
                <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-lg flex justify-between items-center">
                    <h3 className="font-medium text-white flex items-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        Analysis Assistant
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-200 transition-colors text-2xl font-light"
                        aria-label="Close chat"
                    >
                        ×
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 max-h-[600px] min-h-[500px] bg-gradient-to-b from-gray-900 to-black">
                    {messages.map((message, index) => (
                        <ChatMessage key={index} message={message} />
                    ))}
                    {isLoading && (
                        <div className="flex justify-center items-center py-2">
                            <Loader className="w-6 h-6 animate-spin text-blue-500" />
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800 bg-gray-900">
                    <div className="flex gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about your data analysis..."
                            className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg px-6 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            aria-label="Send message"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            <button
                onClick={handleOpen}
                className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 z-50"
                aria-label="Open chat"
            >
                <MessageCircle className="w-6 h-6" />
            </button>
            <ChatWindow isOpen={isOpen} onClose={handleClose} />
        </>
    );
}
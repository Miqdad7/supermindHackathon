import { Brain } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 border-t border-gray-800">
            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-3 mb-6 md:mb-0">
                        <div className="p-2 rounded-lg bg-teal-900/50">
                            <Brain className="w-6 h-6 text-teal-400" />
                        </div>
                        <span className="text-xl font-bold text-white">Bytelytics</span>
                    </div>
                    <div className="flex flex-col items-center md:items-end">
                        <p className="text-gray-400 mb-2">Built for SuperMinds Hackathon 2024</p>
                        <p className="text-gray-500 text-sm">© 2024 Bytelytics. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
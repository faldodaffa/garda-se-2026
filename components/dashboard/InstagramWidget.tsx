'use client';
export default function InstagramMinimalist() {
    return (
        <div className="w-full bg-white rounded-3xl shadow-lg border border-gray-100 min-h-[350px] md:min-h-[500px] flex flex-col items-center justify-center p-6 md:p-8 text-center relative overflow-hidden group">

            {/* Dekorasi Latar Belakang (Biarkan sama) */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full opacity-10 blur-3xl transition-transform duration-700 group-hover:scale-150"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#f79039] rounded-full opacity-10 blur-3xl transition-transform duration-700 group-hover:scale-150"></div>

            {/* Ikon Instagram - Diperkecil di Mobile (w-20 h-20) */}
            <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-2xl md:rounded-3xl flex items-center justify-center mb-6 md:mb-8 shadow-xl transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-3">
                <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
            </div>

            {/* Tipografi */}
            <div className="relative z-10 text-center">
                <h3 className="font-extrabold text-2xl md:text-3xl text-slate-900 mb-2">@bpspapua</h3>
                <p className="text-gray-500 mb-6 md:mb-8 max-w-xs mx-auto text-sm md:text-base px-4">
                    Dapatkan update harian, infografis, dan dokumentasi lapangan Sensus Ekonomi 2026.
                </p>
            </div>

            {/* Tombol Aksi - Lebih ramping di Mobile */}
            <a
                href="https://instagram.com/bpspapua"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 flex items-center justify-center w-full max-w-[250px] md:max-w-xs py-3 md:py-4 bg-slate-900 hover:bg-[#f79039] text-white font-bold text-sm md:text-base rounded-xl md:rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
                Buka Instagram Kami
            </a>
        </div>
    );
}

"use client";

import { FaFileDownload } from "react-icons/fa";
import { MdOutlineLocalPrintshop } from "react-icons/md";

const PrintAndDownloadBtn = () => {
    return (
        <div className="invoice-btn bg-white p-8 rounded-b-xl shadow-sm">
            <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col justify-between invoice-btn">
                <button className="mb-3 sm:mb-0 md:mb-0 lg:mb-0 flex items-center justify-center bg-emerald-500 text-white transition-all font-semibold h-10 py-2 px-5 rounded-md">
                    Download Invoice <FaFileDownload className="ms-3 text-lg" />
                </button>
                <button onClick={() => window.print()} className="cursor-pointer mb-3 sm:mb-0 md:mb-0 lg:mb-0 flex items-center justify-center bg-emerald-500 text-white transition-all font-semibold h-10 py-2 px-5 rounded-md">
                    Print Invoice <MdOutlineLocalPrintshop className="ms-3 text-lg" />
                </button>
            </div>
        </div>
    );
};

export default PrintAndDownloadBtn;
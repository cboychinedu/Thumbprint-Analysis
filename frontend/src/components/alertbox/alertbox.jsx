// Importing the necessary modules 
import { Fragment } from 'react';
import { ShieldCheck, ShieldAlert, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Creating the alert box component 
const AlertBox = ({ status, alertMessage, onClose }) => {
    // Getting the error values 
    const isError = status?.toLowerCase().includes('error') || status?.toLowerCase().includes('denied');
    
    // Use solid hex colors or Tailwind colors without "/" opacity modifiers for the main fill
    const accentColor = isError ? 'text-red-500' : 'text-indigo-400';
    const borderColor = isError ? 'border-red-900/50' : 'border-indigo-900/50';
    
    // We use a solid dark background + backdrop-blur to ensure it is NOT transparent
    // 'bg-[#161b22]' matches the dark theme of your register page
    const bgColor = isError ? 'bg-[#1a0505]' : 'bg-[#0d1117]';

    // Rendering the alert box component
    return (
        <Fragment> 
            <AnimatePresence>
                <motion.div 
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 20, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    // Added 'backdrop-blur-md' and removed the /20 opacity from bg
                    className={`fixed top-24 left-0 z-[100] flex items-center gap-4 ${bgColor} backdrop-blur-md text-white p-4 rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.7)] border-l-4 ${isError ? 'border-l-red-600' : 'border-l-indigo-500'} border-y ${borderColor} border-r ${borderColor} w-[95%] max-w-sm font-mono`}
                >
                    {/* Status Icon */}
                    <div className={`${accentColor} p-1 flex-shrink-0`}>
                        {isError ? <ShieldAlert size={28} /> : <ShieldCheck size={28} />}
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] bg-black px-1 border border-slate-700 text-gray-500 uppercase tracking-tighter">
                                System Msg
                            </span>
                            <h4 className={`font-bold text-xs uppercase tracking-widest ${accentColor}`}>
                                {status}
                            </h4>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-1 leading-tight uppercase italic">
                            {alertMessage}
                        </p>
                    </div>

                    {/* Close Button */}
                    <button 
                        onClick={onClose} 
                        className="p-1 hover:bg-white/10 rounded border border-transparent hover:border-slate-700 transition-all flex-shrink-0"
                    >
                        <X size={16} className="text-gray-500" />
                    </button>
                </motion.div>
            </AnimatePresence>
        </Fragment>
    )
}

// Exporting the alert box 
export default AlertBox;
import { useState, useEffect, useRef } from 'react';
import { Palette, Type } from 'lucide-react';
import { useTheme, COLOR_THEMES } from '../context/ThemeContext';
import { useFont, FONT_FAMILIES } from '../context/FontContext';

const Checkmark = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const FloatingControls = () => {
  const { colorTheme, changeColorTheme, theme } = useTheme();
  const { fontFamily, changeFontFamily } = useFont();
  const [activePanel, setActivePanel] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActivePanel(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggle = (panel) => setActivePanel(prev => (prev === panel ? null : panel));

  const btnBase =
    'w-10 h-10 flex items-center justify-center rounded-l-xl shadow-md transition-all duration-200 border-y border-l border-gray-200 dark:border-gray-700';
  const btnActive =
    'bg-[var(--theme-primary)] text-white border-[var(--theme-primary)]';
  const btnIdle =
    'bg-white dark:bg-dark-card text-gray-500 dark:text-gray-400 hover:text-[var(--theme-primary)] dark:hover:text-[var(--theme-primary-light)]';

  return (
    <div
      ref={containerRef}
      className="fixed right-0 top-1/3 z-40 flex flex-col gap-1.5 items-end"
    >
      {/* ── Color Theme ── */}
      <div className="relative flex items-start justify-end">
        {activePanel === 'color' && (
          <div className="absolute right-12 top-0 w-44 bg-white dark:bg-dark-card rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-3 animate-slide-up">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-2 px-1">
              Theme Color
            </p>
            <div className="flex flex-col gap-0.5">
              {Object.entries(COLOR_THEMES).map(([key, colorObj]) => {
                const swatch =
                  theme === 'light'
                    ? colorObj.primary.light[500]
                    : colorObj.primary.dark[400];
                const isActive = colorTheme === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      changeColorTheme(key);
                      setActivePanel(null);
                    }}
                    className={`flex items-center gap-2.5 px-2 py-1.5 rounded-lg transition-all text-left ${
                      isActive
                        ? 'bg-gray-100 dark:bg-gray-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/60'
                    }`}
                  >
                    <span
                      className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: swatch }}
                    >
                      {isActive && <Checkmark />}
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {colorObj.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        <button
          onClick={() => toggle('color')}
          aria-label="Change theme color"
          title="Theme Color"
          className={`${btnBase} ${activePanel === 'color' ? btnActive : btnIdle}`}
        >
          <Palette className="w-5 h-5" />
        </button>
      </div>

      {/* ── Font Family ── */}
      <div className="relative flex items-start justify-end">
        {activePanel === 'font' && (
          <div className="absolute right-12 top-0 w-52 bg-white dark:bg-dark-card rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-slide-up">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 px-3 py-2 border-b border-gray-100 dark:border-gray-700 sticky top-0 bg-white dark:bg-dark-card">
              Font Family
            </p>
            <div className="overflow-y-auto max-h-64 py-1">
              {Object.entries(FONT_FAMILIES).map(([key, fontObj]) => {
                const isActive = fontFamily === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      changeFontFamily(key);
                      setActivePanel(null);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 transition-colors ${
                      isActive
                        ? 'bg-gray-100 dark:bg-gray-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/60'
                    }`}
                    style={{ fontFamily: fontObj.fontFamily }}
                  >
                    <div className="text-left">
                      <div className="text-sm text-gray-800 dark:text-gray-200">
                        {fontObj.name}
                      </div>
                      <div className="text-[11px] text-gray-400 font-sans">
                        Aa Bb Cc
                      </div>
                    </div>
                    {isActive && (
                      <span style={{ color: 'var(--theme-primary)' }}>
                        <Checkmark />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        <button
          onClick={() => toggle('font')}
          aria-label="Change font family"
          title="Font Family"
          className={`${btnBase} ${activePanel === 'font' ? btnActive : btnIdle}`}
        >
          <Type className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default FloatingControls;

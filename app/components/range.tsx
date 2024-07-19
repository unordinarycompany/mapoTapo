import React from "react";

interface RangeProps {
  label: string;
  value: number | undefined;
  min: number;
  max: number;
  step?: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: number) => void;
}

export const Range = ({label, value, min, max, onChange, step}: RangeProps) => (
  <div className="relative mb-9">
    <label htmlFor="labels-range-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}:</label>
    <input id="labels-range-input" onChange={(e) => onChange(parseInt(e.target.value))} type="range" step={step} value={value} min={min} max={max} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-800" />
    {step && [...new Array(((max - min) + 1) / step)].map((_, idx, arr) => (<React.Fragment key={idx}>
      {idx === 0 && <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">{(idx + 1) * step}</span>}
      {idx !== 0 && idx !== arr.length - 1 && <span style={{insetInlineStart: `${(100 / (arr.length - 1)) * idx}%`}} className={`text-sm text-gray-500 dark:text-gray-400 absolute -translate-x-1/2 rtl:translate-x-1/2 -bottom-6`}>{(idx + 1) * step}</span>}
      {idx === arr.length - 1 && <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">{(idx + 1) * step}</span>}
    </React.Fragment>))}
  </div>
)
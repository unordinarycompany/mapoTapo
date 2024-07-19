// eslint-disable-next-line no-unused-vars
export const NumberInput = ({value, onChange, label, placeholder}: {value: number | undefined, onChange: (value: number) => void, label: string, placeholder?: string}) => (
  <>
    <label htmlFor="zip-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}:</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 10h9.231M6 14h9.231M18 5.086A5.95 5.95 0 0 0 14.615 4c-3.738 0-6.769 3.582-6.769 8s3.031 8 6.769 8A5.94 5.94 0 0 0 18 18.916"/>
            </svg>
        </div>
        <input value={value} min={0.01} step={0.01} onChange={(e) => onChange(Number(e.target.value))} type="number" id="zip-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder || label} pattern="^\d{5}(-\d{4})?$" required />
  </div>
  </>
)
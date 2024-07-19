import { ReactNode } from "react"
import { Button } from "./button"

interface ModalProps {
  open: boolean, 
  // eslint-disable-next-line no-unused-vars
  setOpen: (open: boolean) => void, 
  children: ReactNode,
  okButtonTitle?: string,
  cancelButtonTitle?: string,
  title: string,
  onOk: () => void
  onCancel?: () => void
}

export const Modal = ({title, children, open, setOpen, okButtonTitle, onOk, onCancel, cancelButtonTitle}: ModalProps) => (
    <>{open && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 z-50 flex justify-center items-center" onClick={() => setOpen(false)}>
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
            <button onClick={() => setOpen(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            {children}
          </div>
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <Button title={okButtonTitle || "Ok"} onClick={() => {onOk(); setOpen(false)}}/>
            <Button primary={false} title={cancelButtonTitle || "Cancel"} onClick={() => {onCancel && onCancel(); setOpen(false)}} className="ml-4"/>
          </div>
        </div>
      </div>
    </div>}</>
)
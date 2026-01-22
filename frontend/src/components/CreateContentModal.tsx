import { CloseIcon } from "../icons/CloseIcon";
import { Button } from "./Button";
import { Input } from "./Input";

export function CreateContentModal({ open, onClose }) {
  // Return null if not open to keep the DOM clean
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 1. The Backdrop Overlay */}
      <div 
        className="absolute inset-0 bg-slate-400 opacity-60" 
        onClick={onClose} 
      />

      {/* 2. The Modal Content Card */}
      <div className="relative bg-white p-6 rounded-lg shadow-xl border border-gray-200 min-w-[320px] z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Add Content</h2>
          <div className="cursor-pointer hover:bg-gray-100 p-1 rounded" onClick={onClose}>
            <CloseIcon />
          </div>
        </div>

        <div className="space-y-4 flex flex-col">
          <Input placeholder="Title" onChange={(e) => {}} />
          <Input placeholder="Link (URL)" onChange={(e) => {}} />
          <Input placeholder="Type" onChange={(e) => {}} />
          
          <div className="flex justify-end pt-4">
            <Button variant="primary" text="Submit" onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
}
import { ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  title: React.ReactNode; 
  children: ReactNode;
}

export default function Modal({ onClose, title, children }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-blue-600">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
}

import React from 'react'
import { Trash } from 'lucide-react'; // Import the Trash icon from Lucide

interface LinkInputProps {
    value: string
    index: number
    onChange: (index: number, value: string) => void
    onDelete: (index: number) => void
}

const LinkInput: React.FC<LinkInputProps> = ({ value, index, onChange, onDelete }) => {
    return (
        <div className="flex space-x-2">
            <input
                type="text"
                className="textbox w-full"
                placeholder="Paste product link..."
                value={value}
                onChange={(e) => onChange(index, e.target.value)}
            />
            <button
                onClick={() => onDelete(index)}
                className="btn-delete"
                aria-label="Delete"
            >
                <Trash className="w-5 h-5" /> {/* Trash icon with a size of 5 */}
            </button>
        </div>
    )
}

export default LinkInput

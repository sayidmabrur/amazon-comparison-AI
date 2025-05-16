import { ReactNode } from 'react'

type IconButtonProps = {
    icon: ReactNode
    text: string
    onClick: () => void
    className?: string
}

const IconButton = ({ icon, text, onClick, className = '' }: IconButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`flex textbox items-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${className}`}
        >
            <span className="flex items-center">{icon}</span>
            {text}
        </button>
    )
}

export default IconButton

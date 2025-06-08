'use client'

import React, { useState } from 'react'
import SubmitButton from './SubmitButton'
import LinkInput from './LinkInput'
import { useRouter } from 'next/navigation'

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  onCompare: (links: string[]) => void
}

export default function ProductModal({ isOpen, onClose, onCompare }: ProductModalProps) {
  const [inputs, setInputs] = useState<string[]>(['', ''])
  const router = useRouter()
  const [warning, setWarning] = useState<string | null>(null)

  const handleInputChange = (index: number, value: string) => {
    const updated = [...inputs]
    updated[index] = value
    setInputs(updated)
  }

  const handleAddInput = () => {
    if (inputs.length >= 5) {
      setWarning('You can only add up to 5 products.')
      return
    }
    setWarning(null) // clear warning if under limit
    setInputs(prev => [...prev, ''])
  }

  const handleDeleteInput = (index: number) => {
    setInputs(prev => prev.filter((_, i) => i !== index))
  }

  const handleCompareNow = () => {
    const validLinks = inputs.filter(link => link.trim() !== '')
    const query = encodeURIComponent(JSON.stringify(validLinks))
    router.push(`/comparison?links=${query}`)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300">
      <div
        className="relative p-6 rounded-xl shadow-2xl max-w-2xl w-full card"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-800 hover:text-red-600 text-2xl font-bold transition-colors duration-200"
        >
          &times;
        </button>

        <h3 className="text-lg font-semibold mb-4">Add Product Link</h3>


        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {inputs.map((link, index) => (
            <LinkInput
              key={index}
              index={index}
              value={link}
              onChange={handleInputChange}
              onDelete={handleDeleteInput}
            />
          ))}
        </div>

        {warning && (
          <p className="text-sm text-red-500 mt-2">{warning}</p>
        )}

        <div className="mt-6 flex justify-between">
          <SubmitButton
            onClick={handleAddInput}
            text="+Add Product"
            className='add-product-button'
          />
          <SubmitButton
            onClick={handleCompareNow}
            text="Compare Now"
          />
        </div>
      </div>
    </div>
  )
}

'use client'

import React, { useEffect, useState } from 'react'
import { Check, Search, X } from 'lucide-react'
import useResumeGlobalStyle from '@/store/zustand/resumeGlobalStyleStore'

type FontFamily = {
    family: string
    category: string
    variants: string[]
    files: {
        [variant: string]: string
    }
}

const FontFamilyMenu = () => {
    const {
        fontFamily: globalFontFamily,
        setFontFamily: setGlobalFontFamily,
    } = useResumeGlobalStyle()

    const [fonts, setFonts] = useState<FontFamily[]>([])
    const [filteredFonts, setFilteredFonts] = useState<FontFamily[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedFont, setSelectedFont] = useState<{ name: string; regularUrl: string | null } | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [page, setPage] = useState(0)

    const fontsPerPage = 20

    const fetchFonts = async () => {
        try {
            setLoading(true)
            setError(null)

            const response = await fetch(
                `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&sort=popularity`
            )
            const res = await response.json()

            if (res.items && Array.isArray(res.items)) {
                setFonts(res.items)
                setFilteredFonts(res.items)

                if (!selectedFont) {
                    const foundFont = res.items.find((f: FontFamily) => f.family === globalFontFamily.name)
                    const fallbackFont = res.items[0]

                    const selected = foundFont || fallbackFont

                    setSelectedFont({
                        name: selected.family,
                        regularUrl: selected.files['regular'] || null,
                    })
                }
            } else {
                setError('Invalid API response format')
            }
        } catch (error) {
            console.error(error)
            setError('Failed to fetch fonts. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFonts()
    }, [])

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredFonts(fonts)
            setPage(0)
        } else {
            const filtered = fonts.filter((font) =>
                font.family.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setFilteredFonts(filtered)
            setPage(0)
        }
    }, [searchTerm, fonts])

    useEffect(() => {
        if (selectedFont?.name && selectedFont.regularUrl) {
            const fontName = selectedFont.name
            const fontUrl = selectedFont.regularUrl

            const style = document.createElement('style')
            style.setAttribute('data-font', fontName)
            style.innerHTML = `
        @font-face {
          font-family: '${fontName}';
          src: url('${fontUrl}');
          font-weight: 400;
          font-style: normal;
        }
      `

            const existingStyle = document.querySelector(`style[data-font="${fontName}"]`)
            if (!existingStyle) document.head.appendChild(style)

            setGlobalFontFamily(fontName, fontUrl)
        }
    }, [selectedFont, setGlobalFontFamily])

    const handleFontSelect = (font: FontFamily) => {
        const regularUrl = font.files['regular'] || null
        setSelectedFont({ name: font.family, regularUrl })
        setIsOpen(false)
    }

    const toggleMenu = () => setIsOpen(!isOpen)
    const clearSearch = () => setSearchTerm('')

    const totalPages = Math.ceil(filteredFonts.length / fontsPerPage)
    const displayedFonts = filteredFonts.slice(page * fontsPerPage, (page + 1) * fontsPerPage)

    return (
        <div className="max-w-md mx-auto p-4 bg-gray-800 rounded-lg">
            <h2 className="text-xl mb-4 text-white font-bold">Font Family Selector</h2>

            {selectedFont?.name && (
                <div className="mb-6 p-4 border border-gray-600 rounded-lg bg-gray-700">
                    <p className="text-gray-300 mb-2">
                        Current Font: <span className="text-white">{selectedFont.name}</span>
                    </p>
                    <p className="text-xl text-white" style={{ fontFamily: selectedFont.name }}>
                        The quick brown fox jumps over the lazy dog.
                    </p>
                    <p className="text-sm text-white mt-2" style={{ fontFamily: selectedFont.name }}>
                        ABCDEFGHIJKLMNOPQRSTUVWXYZ
                        abcdefghijklmnopqrstuvwxyz
                        0123456789
                    </p>
                </div>
            )}

            <div className="relative mb-4">
                <button
                    onClick={toggleMenu}
                    className="flex items-center justify-between w-full p-3 text-left border border-gray-600 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
                    disabled={loading || fonts.length === 0}
                >
                    <span style={{ fontFamily: selectedFont?.name || undefined }}>
                        {selectedFont?.name || (loading ? 'Loading fonts...' : 'Select a font')}
                    </span>
                    <svg
                        className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg overflow-hidden flex flex-col">
                        <div className="p-2 border-b border-gray-600 sticky top-0 bg-gray-700">
                            <div className="relative">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search fonts..."
                                    className="w-full pl-9 pr-9 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                {searchTerm && (
                                    <button
                                        onClick={clearSearch}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    >
                                        <X className="w-4 h-4 text-gray-400 hover:text-white" />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="overflow-y-auto max-h-64">
                            {loading ? (
                                <div className="p-4 text-center text-gray-300">Loading fonts...</div>
                            ) : error ? (
                                <div className="p-4 text-center text-red-400">{error}</div>
                            ) : displayedFonts.length === 0 ? (
                                <div className="p-4 text-center text-gray-300">No fonts found</div>
                            ) : (
                                displayedFonts.map((font) => (
                                    <button
                                        key={font.family}
                                        onClick={() => handleFontSelect(font)}
                                        className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-600 border-b border-gray-600 transition"
                                    >
                                        <div>
                                            <span className="block text-white" style={{ fontFamily: font.family }}>
                                                {font.family}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                {font.category} • {font.variants.length} variant{font.variants.length !== 1 ? 's' : ''}
                                            </span>
                                        </div>
                                        {selectedFont?.name === font.family && (
                                            <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                                        )}
                                    </button>
                                ))
                            )}
                        </div>

                        {totalPages > 1 && (
                            <div className="p-2 border-t border-gray-600 bg-gray-700 flex justify-between items-center">
                                <button
                                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                                    disabled={page === 0}
                                    className={`px-3 py-1 rounded ${page === 0 ? 'text-gray-500' : 'text-white hover:bg-gray-600'}`}
                                >
                                    Previous
                                </button>
                                <span className="text-gray-300 text-sm">
                                    Page {page + 1} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                                    disabled={page >= totalPages - 1}
                                    className={`px-3 py-1 rounded ${page >= totalPages - 1 ? 'text-gray-500' : 'text-white hover:bg-gray-600'}`}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="text-sm text-gray-400">
                {fonts.length > 0 ? (
                    <>Font collection: {fonts.length} fonts available</>
                ) : loading ? (
                    <>Loading font collection...</>
                ) : (
                    <>No fonts loaded. Click "Fetch Fonts" to load.</>
                )}
            </div>

            {!fonts.length && !loading && (
                <button
                    onClick={fetchFonts}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Fetch Fonts
                </button>
            )}
        </div>
    )
}

export default FontFamilyMenu

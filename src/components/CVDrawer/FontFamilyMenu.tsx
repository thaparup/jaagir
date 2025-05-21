
'use client'

import React, { useEffect, useState } from 'react'
import { Check, Search, X } from 'lucide-react'
import useResumeGlobalStyle from '@/store/zustand/resumeGlobalStyleStore'
// update this import path as needed

type FontFamily = {
    family: string
    category: string
    variants: string[]
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
    const [selectedFont, setSelectedFont] = useState<string | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [page, setPage] = useState(0)

    const fontsPerPage = 20

    // Fetch fonts from Google Fonts API
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

                // If no font has been selected yet, initialize from Zustand
                if (!selectedFont) {
                    const foundFont = res.items.find((f: FontFamily) => f.family === globalFontFamily)
                    setSelectedFont(foundFont ? foundFont.family : res.items[0].family)
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

    // Load fonts on mount
    useEffect(() => {
        fetchFonts()
    }, [])

    // Filter fonts
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

    // Dynamically inject font CSS
    useEffect(() => {
        if (selectedFont) {
            const link = document.createElement('link')
            link.rel = 'stylesheet'
            const fontForUrl = selectedFont.replace(/\s+/g, '+')
            link.href = `https://fonts.googleapis.com/css2?family=${fontForUrl}:wght@400;700&display=swap`

            const existingLinks = document.querySelectorAll('link[href*="fonts.googleapis.com/css2"]')
            if (existingLinks.length > 3) {
                existingLinks[0].remove()
            }

            document.head.appendChild(link)

            // Sync selected font to global state
            setGlobalFontFamily(selectedFont)
        }
    }, [selectedFont, setGlobalFontFamily])

    const handleFontSelect = (fontFamily: string) => {
        setSelectedFont(fontFamily)
        setIsOpen(false)
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const clearSearch = () => {
        setSearchTerm('')
    }

    const totalPages = Math.ceil(filteredFonts.length / fontsPerPage)
    const displayedFonts = filteredFonts.slice(page * fontsPerPage, (page + 1) * fontsPerPage)

    return (
        <div className="max-w-md mx-auto p-4 bg-gray-800 rounded-lg">
            <h2 className="text-xl mb-4 text-white font-bold">Font Family Selector</h2>

            {selectedFont && (
                <div className="mb-6 p-4 border border-gray-600 rounded-lg bg-gray-700">
                    <p className="text-gray-300 mb-2">
                        Current Font: <span className="text-white">{selectedFont}</span>
                    </p>
                    <p className="text-xl text-white" style={{ fontFamily: selectedFont }}>
                        The quick brown fox jumps over the lazy dog.
                    </p>
                    <p className="text-sm text-white mt-2" style={{ fontFamily: selectedFont }}>
                        ABCDEFGHIJKLMNOPQRSTUVWXYZ
                        abcdefghijklmnopqrstuvwxyz
                        0123456789
                    </p>
                </div>
            )}

            {/* Font Dropdown */}
            <div className="relative mb-4">
                <button
                    onClick={toggleMenu}
                    className="flex items-center justify-between w-full p-3 text-left border border-gray-600 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
                    disabled={loading || fonts.length === 0}
                >
                    <span style={{ fontFamily: selectedFont || undefined }}>
                        {selectedFont || (loading ? 'Loading fonts...' : 'Select a font')}
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
                                        onClick={() => handleFontSelect(font.family)}
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
                                        {selectedFont === font.family && (
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
                                    className={`px-3 py-1 rounded ${page >= totalPages - 1 ? 'text-gray-500' : 'text-white hover:bg-gray-600'
                                        }`}
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

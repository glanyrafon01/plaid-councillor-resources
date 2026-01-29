import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const [currentPdf, setCurrentPdf] = useState('100Tips')
  const [currentPage, setCurrentPage] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchIndex, setSearchIndex] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const searchInputRef = useRef(null)
  
  const pdfs = [
    { id: '100Tips', name: '100 Tips for Councillors', pages: 6 },
    { id: 'BeingaCouncillor', name: 'Being a Councillor', pages: 2 }
  ]
  
  const currentPdfInfo = pdfs.find(pdf => pdf.id === currentPdf)
  
  // Load search index on component mount
  useEffect(() => {
    async function loadSearchIndex() {
      try {
        const response = await fetch('/search-index.json')
        const data = await response.json()
        setSearchIndex(data)
      } catch (error) {
        console.error('Error loading search index:', error)
      }
    }
    
    loadSearchIndex()
  }, [])

  useEffect(() => {
    setIsImageLoaded(false)
  }, [currentPdf, currentPage])

  useEffect(() => {
    if (!searchTerm.trim()) {
      setHasSearched(false)
    }
  }, [searchTerm])
  
  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchTerm.trim() || !searchIndex) return
    
    setIsSearching(true)
    setHasSearched(true)
    
    // Perform search across all PDFs
    const results = []
    
    Object.entries(searchIndex).forEach(([pdfId, pages]) => {
      pages.forEach((pageData, pageIndex) => {
        const { content } = pageData
        
        // Simple case-insensitive search
        const searchRegex = new RegExp(searchTerm, 'gi')
        const matches = content.match(searchRegex)
        
        if (matches && matches.length > 0) {
          results.push({
            pdfId,
            page: pageIndex,
            matchCount: matches.length,
            context: getSearchContext(content, searchTerm)
          })
        }
      })
    })
    
    setSearchResults(results)
    setIsSearching(false)
  }
  
  const getSearchContext = (content, term) => {
    const searchRegex = new RegExp(`(.{0,50})(${term})(.{0,50})`, 'i')
    const match = content.match(searchRegex)
    
    if (match) {
      return match[1] + '**' + match[2] + '**' + match[3]
    }
    
    return content.substring(0, 100) + '...'
  }
  
  const navigateToSearchResult = (pdfId, page) => {
    setCurrentPdf(pdfId)
    setCurrentPage(page)
    setSearchResults([])
    setSearchTerm('')
    // Scroll to top to show the PDF viewer
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  return (
    <div className="container">
      <div className="hero">
        <div className="hero-text">
          <h1>Plaid Councillor Resources</h1>
          <p className="hero-subtitle">Searchable guidance for councillors, with fast navigation and clear, structured tips.</p>
          <div className="hero-actions">
            <Link href="/100tips" className="primary-button">Browse 100 Tips</Link>
            <button
              type="button"
              className="secondary-button"
              onClick={() => searchInputRef.current?.focus()}
            >
              Search PDFs
            </button>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-card-title">Quick access</div>
          <ul>
            <li>2 official guides, page-by-page</li>
            <li>Instant keyword search across PDFs</li>
            <li>Structured tips for fast scanning</li>
          </ul>
        </div>
      </div>

      <div className="main-navigation" role="tablist" aria-label="Content sections">
        <Link href="/" className="tab active" aria-current="page">PDF Viewer</Link>
        <Link href="/100tips" className="tab">100 Tips (Structured)</Link>
      </div>
      
      <div className="controls">
        <div className="pdf-selector">
          {pdfs.map(pdf => (
            <button 
              key={pdf.id}
              onClick={() => {
                setCurrentPdf(pdf.id)
                setCurrentPage(0)
              }}
              className={currentPdf === pdf.id ? 'active' : ''}
            >
              {pdf.name}
            </button>
          ))}
        </div>
        
        <div className="search-box">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search across all documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              ref={searchInputRef}
              style={{ width: '300px', padding: '8px' }}
            />
            <button type="submit" disabled={!searchTerm.trim() || isSearching}>
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>
      </div>
      
      <div className="pdf-viewer">
        <div className="pdf-navigation">
          <button 
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <span>Page {currentPage + 1} of {currentPdfInfo.pages}</span>
          <button 
            onClick={() => setCurrentPage(p => Math.min(currentPdfInfo.pages - 1, p + 1))}
            disabled={currentPage === currentPdfInfo.pages - 1}
          >
            Next
          </button>
        </div>
        
        <div className="pdf-display">
          <div className={`pdf-skeleton ${isImageLoaded ? 'hidden' : ''}`}>
            <div className="skeleton-bar" />
            <div className="skeleton-bar short" />
          </div>
          <Image
            src={`/ocr_output/${currentPdf === '100Tips' ? '100tips_images' : 'councillor_images'}-00${currentPage}.jpg`}
            alt={`${currentPdf} page ${currentPage + 1}`}
            width={2480}
            height={3508}
            sizes="(max-width: 800px) 100vw, 800px"
            style={{ width: '100%', height: 'auto', maxWidth: '800px', margin: '0 auto', display: 'block' }}
            onLoad={() => setIsImageLoaded(true)}
            onError={(e) => {
              console.error('Error loading image:', e.target.src)
              e.target.style.display = 'none'
            }}
          />
          {!currentPdfInfo && <p>Loading PDF information...</p>}
        </div>
      </div>
      
      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Search Results ({searchResults.length} found)</h3>
          <ul>
            {searchResults.map((result, index) => {
              const pdfName = pdfs.find(pdf => pdf.id === result.pdfId)?.name || result.pdfId
              return (
                <li key={index} className="search-result-item">
                  <button 
                    onClick={() => navigateToSearchResult(result.pdfId, result.page)}
                    className="result-link"
                  >
                    {pdfName} - Page {result.page + 1}
                  </button>
                  <div className="result-context">
                    {result.context.split('**').map((part, i) => 
                      i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {hasSearched && !isSearching && searchResults.length === 0 && (
        <div className="search-results empty">
          <h3>No matches yet</h3>
          <p>Try a shorter phrase, a place name, or a topic like “planning” or “schools”.</p>
        </div>
      )}
      
      <style jsx>{`
        :global(body) {
          background: radial-gradient(circle at top, #f3f7f4 0%, #ffffff 45%, #f8faf6 100%);
        }

        .hero {
          display: grid;
          gap: 20px;
          grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
          align-items: stretch;
          background: linear-gradient(135deg, #ffffff 0%, #eef5f1 100%);
          border: 1px solid #e5ece8;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 12px 30px rgba(20, 41, 35, 0.08);
        }

        .hero-text h1 {
          margin: 0 0 8px 0;
          font-size: 2.2rem;
          letter-spacing: -0.02em;
        }

        .hero-subtitle {
          margin: 0 0 20px 0;
          color: #44524c;
          font-size: 1.05rem;
          line-height: 1.6;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .primary-button,
        .secondary-button {
          border-radius: 999px;
          padding: 10px 18px;
          font-weight: 600;
          border: 1px solid transparent;
        }

        .primary-button {
          background: #1f6b4f;
          color: #ffffff;
          text-decoration: none;
        }

        .secondary-button {
          background: #ffffff;
          color: #1f6b4f;
          border-color: #c7d8cf;
        }

        .hero-card {
          background: #f9fbfa;
          border-radius: 12px;
          padding: 18px;
          border: 1px solid #e1e9e4;
        }

        .hero-card-title {
          font-weight: 700;
          color: #1f6b4f;
          margin-bottom: 10px;
        }

        .hero-card ul {
          margin: 0;
          padding-left: 18px;
          color: #4b5852;
          line-height: 1.6;
        }

        .main-navigation {
          display: flex;
          gap: 12px;
          margin: 24px 0 16px 0;
          padding-bottom: 10px;
        }

        .tab {
          color: #1d2e28;
          text-decoration: none;
          font-weight: 600;
          padding: 8px 16px;
          border-radius: 999px;
          background: #eef3f0;
        }

        .tab:hover {
          background: #e2ece7;
        }

        .tab.active {
          color: #ffffff;
          background: #1f6b4f;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .controls {
          display: flex;
          justify-content: space-between;
          margin: 20px 0;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        
        .pdf-selector button {
          margin-right: 10px;
          padding: 8px 16px;
          cursor: pointer;
          border-radius: 999px;
        }
        
        .pdf-selector button.active {
          background-color: #1f6b4f;
          color: white;
        }
        
        .search-box {
          display: flex;
        }
        
        .search-box input {
          padding: 8px;
          margin-right: 8px;
          border-radius: 8px;
          border: 1px solid #d1ded7;
        }
        
        .pdf-navigation {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 20px 0;
        }
        
        .pdf-navigation button {
          margin: 0 10px;
          padding: 8px 16px;
        }
        
        .pdf-display {
          border: 1px solid #ddd;
          padding: 20px;
          background: white;
          border-radius: 12px;
          position: relative;
        }

        .pdf-skeleton {
          position: absolute;
          inset: 20px;
          border-radius: 10px;
          background: linear-gradient(90deg, #f2f5f3 0%, #e8eeea 50%, #f2f5f3 100%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 20px;
          z-index: 0;
        }

        .pdf-skeleton.hidden {
          display: none;
        }

        .skeleton-bar {
          height: 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.7);
          width: 60%;
        }

        .skeleton-bar.short {
          width: 35%;
        }
        
        .search-results {
          margin: 20px 0;
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 4px;
          border: 1px solid #dee2e6;
        }

        .search-results.empty {
          background: #f2f6f4;
          border-color: #d7e3dd;
        }
        
        .search-results h3 {
          margin-top: 0;
          color: #495057;
        }
        
        .search-result-item {
          margin: 10px 0;
          padding: 10px;
          background-color: white;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .result-link {
          color: #1f6b4f;
          text-decoration: none;
          cursor: pointer;
          font-weight: bold;
          background: none;
          border: none;
          padding: 0;
          margin: 0 0 5px 0;
          display: block;
        }
        
        .result-link:hover {
          text-decoration: underline;
          background-color: transparent;
        }
        
        .result-context {
          color: #6c757d;
          font-size: 0.9em;
          white-space: pre-wrap;
        }
        
        strong {
          color: #212529;
          background-color: #e5f3ec;
          padding: 1px 3px;
          border-radius: 2px;
        }

        @keyframes shimmer {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: -100% 0;
          }
        }

        @media (max-width: 900px) {
          .hero {
            grid-template-columns: 1fr;
          }

          .hero-actions {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  )
}

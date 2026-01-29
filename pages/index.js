import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [currentPdf, setCurrentPdf] = useState('100Tips')
  const [currentPage, setCurrentPage] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchIndex, setSearchIndex] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  
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
  
  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchTerm.trim() || !searchIndex) return
    
    setIsSearching(true)
    
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
      <h1>Plaid Councillor Resources</h1>
      
      <div className="main-navigation">
        <Link href="/" className={!currentPdf ? 'active' : ''}>PDF Viewer</Link>
        <Link href="/100tips" className={currentPdf ? 'active' : ''}>100 Tips (Structured)</Link>
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
          <img 
            src={`/ocr_output/${currentPdf === '100Tips' ? '100tips_images' : 'councillor_images'}-00${currentPage}.jpg`}
            alt={`${currentPdf} page ${currentPage + 1}`}
            style={{ width: '100%', height: 'auto', maxWidth: '800px', margin: '0 auto', display: 'block' }}
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
      
      <style jsx>{`
        .main-navigation {
          display: flex;
          gap: 20px;
          margin: 20px 0;
          padding-bottom: 10px;
          border-bottom: 2px solid #e0e0e0;
        }
        
        .main-navigation a {
          color: #0070f3;
          text-decoration: none;
          font-weight: bold;
          padding: 5px 10px;
        }
        
        .main-navigation a:hover {
          text-decoration: underline;
        }
        
        .main-navigation a.active {
          color: #0050c5;
          border-bottom: 2px solid #0050c5;
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
        }
        
        .pdf-selector button {
          margin-right: 10px;
          padding: 8px 16px;
          cursor: pointer;
        }
        
        .pdf-selector button.active {
          background-color: #0070f3;
          color: white;
        }
        
        .search-box {
          display: flex;
        }
        
        .search-box input {
          padding: 8px;
          margin-right: 8px;
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
        }
        
        .search-results {
          margin: 20px 0;
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 4px;
          border: 1px solid #dee2e6;
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
          color: #0070f3;
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
          background-color: #fff3cd;
          padding: 1px 3px;
          border-radius: 2px;
        }
      `}</style>
    </div>
  )
}
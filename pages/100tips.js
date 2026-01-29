import { useState } from 'react'
import Link from 'next/link'

// Import tips data at build time
import tipsData from '../public/100tips-categorized.json'

export default function HundredTips() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedTip, setExpandedTip] = useState(null)
  
  // Flatten all tips for search and "All" category
  const allTips = Object.values(tipsData).flat()
  
  // Get tips for selected category
  const categoryTips = selectedCategory === 'All' 
    ? allTips
    : tipsData[selectedCategory] || []
  
  // Filter by search term
  const filteredTips = categoryTips.filter(tip => 
    tip.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tip.number.toString().includes(searchTerm)
  )
  
  // Get all category names
  const categories = ['All', ...Object.keys(tipsData)]
  
  const toggleTipExpansion = (tipNumber) => {
    setExpandedTip(expandedTip === tipNumber ? null : tipNumber)
  }
  
  return (
    <div className="tips-container">
      <div className="page-header">
        <h1>100 Tips for Effective Councillors</h1>
        <Link href="/" className="back-link">← Back to PDF Viewer</Link>
      </div>
      
      <div className="tips-controls">
        <div className="category-selector">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category)
                setSearchTerm('')
              }}
              className={selectedCategory === category ? 'active' : ''}
            >
              {category} ({category === 'All' ? allTips.length : tipsData[category]?.length || 0})
            </button>
          ))}
        </div>
        
        <div className="search-box">
          <input
            type="text"
            placeholder={`Search ${filteredTips.length} tips...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="clear-search">
              Clear
            </button>
          )}
        </div>
      </div>
      
      <div className="tips-count">
        Showing {filteredTips.length} of {categoryTips.length} tips in &quot;{selectedCategory}&quot;
      </div>
      
      <div className="tips-list">
        {filteredTips.length === 0 ? (
          <div className="no-results">No tips found matching your search.</div>
        ) : (
          filteredTips.map(tip => (
            <div key={tip.number} className="tip-item">
              <div 
                className="tip-header"
                onClick={() => toggleTipExpansion(tip.number)}
              >
                <span className="tip-number">Tip {tip.number}</span>
                <span className="tip-preview">{tip.text.substring(0, 100)}{tip.text.length > 100 ? '...' : ''}</span>
                <span className="expand-icon">{expandedTip === tip.number ? '−' : '+'}</span>
              </div>
              
              {expandedTip === tip.number && (
                <div className="tip-full-content">
                  <p>{tip.text}</p>
                  <div className="tip-actions">
                    <button 
                      onClick={() => navigator.clipboard.writeText(`Tip ${tip.number}: ${tip.text}`)}
                      className="copy-button"
                    >
                      Copy Tip
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      <style jsx>{`
        .tips-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .back-link {
          color: #0070f3;
          text-decoration: none;
          font-size: 0.9em;
        }
        
        .back-link:hover {
          text-decoration: underline;
        }
        
        .tips-controls {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin: 20px 0;
          align-items: center;
        }
        
        .category-selector {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .category-selector button {
          padding: 8px 12px;
          border-radius: 20px;
          font-size: 0.9em;
          white-space: nowrap;
        }
        
        .category-selector button.active {
          background-color: #0070f3;
          color: white;
          border-color: #0070f3;
        }
        
        .search-box {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-left: auto;
        }
        
        .search-box input {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 20px;
          width: 250px;
        }
        
        .clear-search {
          padding: 8px 12px;
          background-color: #f0f0f0;
        }
        
        .tips-count {
          color: #666;
          font-size: 0.9em;
          margin: 10px 0;
        }
        
        .tips-list {
          display: grid;
          gap: 15px;
        }
        
        .tip-item {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .tip-header {
          padding: 15px;
          background-color: #f8f9fa;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .tip-header:hover {
          background-color: #e9ecef;
        }
        
        .tip-number {
          font-weight: bold;
          color: #0070f3;
          min-width: 60px;
        }
        
        .tip-preview {
          flex: 1;
          color: #333;
        }
        
        .expand-icon {
          font-size: 1.2em;
          color: #666;
          min-width: 20px;
          text-align: center;
        }
        
        .tip-full-content {
          padding: 20px;
          background-color: white;
          border-top: 1px solid #e0e0e0;
        }
        
        .tip-full-content p {
          margin: 0;
          line-height: 1.6;
          color: #333;
        }
        
        .tip-actions {
          margin-top: 15px;
          display: flex;
          gap: 10px;
        }
        
        .copy-button {
          padding: 6px 12px;
          font-size: 0.85em;
          background-color: #f0f0f0;
        }
        
        .no-results {
          padding: 40px;
          text-align: center;
          color: #666;
          font-style: italic;
        }
        
        .loading {
          padding: 40px;
          text-align: center;
          font-size: 1.2em;
        }
      `}</style>
    </div>
  )
}

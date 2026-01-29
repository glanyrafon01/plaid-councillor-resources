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
      <div className="hero">
        <div>
          <h1>100 Tips for Effective Councillors</h1>
          <p className="hero-subtitle">Browse the curated advice by theme, scan quickly, and expand when you need the detail.</p>
        </div>
        <div className="hero-stats">
          <div>
            <span className="stat-label">Total tips</span>
            <span className="stat-value">{allTips.length}</span>
          </div>
          <div>
            <span className="stat-label">Categories</span>
            <span className="stat-value">{Object.keys(tipsData).length}</span>
          </div>
        </div>
      </div>

      <div className="main-navigation" role="tablist" aria-label="Content sections">
        <Link href="/" className="tab">PDF Viewer</Link>
        <Link href="/100tips" className="tab active" aria-current="page">100 Tips (Structured)</Link>
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
          <div className="no-results">
            <div className="no-results-title">No tips found</div>
            <div>Try a shorter phrase or switch to another category.</div>
          </div>
        ) : (
          filteredTips.map(tip => (
            <div key={tip.number} className="tip-item">
              <div 
                className="tip-header"
                onClick={() => toggleTipExpansion(tip.number)}
              >
                <span className="tip-number">#{tip.number}</span>
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
        :global(body) {
          background: radial-gradient(circle at top, #f3f7f4 0%, #ffffff 45%, #f8faf6 100%);
        }

        .hero {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: center;
          background: linear-gradient(135deg, #ffffff 0%, #eef5f1 100%);
          border: 1px solid #e5ece8;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 12px 30px rgba(20, 41, 35, 0.08);
        }

        .hero h1 {
          margin: 0 0 8px 0;
          font-size: 2.1rem;
          letter-spacing: -0.02em;
        }

        .hero-subtitle {
          margin: 0;
          color: #44524c;
          font-size: 1.02rem;
          line-height: 1.6;
        }

        .hero-stats {
          display: grid;
          gap: 10px;
          background: #f9fbfa;
          border: 1px solid #e1e9e4;
          border-radius: 12px;
          padding: 16px 18px;
          min-width: 160px;
        }

        .stat-label {
          display: block;
          color: #5a6b63;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f6b4f;
        }

        .main-navigation {
          display: flex;
          gap: 12px;
          margin: 24px 0 16px 0;
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

        .tips-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
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
          border: 1px solid #d3dfd8;
          background: #f2f6f4;
        }
        
        .category-selector button.active {
          background-color: #1f6b4f;
          color: white;
          border-color: #1f6b4f;
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
          color: #5a6b63;
          font-size: 0.95em;
          margin: 14px 0;
        }
        
        .tips-list {
          display: grid;
          gap: 15px;
        }
        
        .tip-item {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 8px 18px rgba(20, 41, 35, 0.08);
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
          font-weight: 700;
          color: #1f6b4f;
          min-width: 60px;
          background: #e5f3ec;
          border-radius: 999px;
          padding: 6px 12px;
          text-align: center;
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
          border-radius: 999px;
        }
        
        .no-results {
          padding: 40px;
          text-align: center;
          color: #53625b;
          background: #f2f6f4;
          border-radius: 12px;
          border: 1px dashed #c7d8cf;
        }

        .no-results-title {
          font-weight: 700;
          color: #1f6b4f;
          margin-bottom: 6px;
        }
        
        .loading {
          padding: 40px;
          text-align: center;
          font-size: 1.2em;
        }

        @media (max-width: 900px) {
          .hero {
            flex-direction: column;
            align-items: flex-start;
          }

          .hero-stats {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

# Plaid Councillor Resources Web App

An interactive web application that replaces PDF documents with a searchable, structured interface for Plaid Cymru councillors.

## Features

### PDF Viewer
- View both "100 Tips for Councillors" and "Being a Councillor" documents
- Navigate between pages with Previous/Next buttons
- Search across all document content
- Click search results to navigate to specific pages

### Structured 100 Tips
- All 97 tips extracted and categorized
- 9 categories: Media, Community, Party, Organization, Elections, Communication, Networking, Documentation, Miscellaneous
- Search and filter by category
- Expandable tip details
- Copy tips to clipboard

## Technologies

- **Next.js 14** - React framework for static site generation
- **Tesseract OCR** - Text extraction from scanned PDFs
- **ImageMagick** - Image optimization
- **Vercel** - Hosting and deployment

## Development

### Setup

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
npm run start
```

### Data Processing

The `scripts/` directory contains scripts for:
- `create-search-index.js` - Creates search index from OCR text
- `improved-tips-extraction.js` - Extracts and categorizes 100 tips

## Deployment

1. Push to GitHub repository
2. Connect to Vercel
3. Automatic deployment on push

## File Structure

```
public/
├── 100Tips.pdf                  # Original PDF
├── BeingaCouncillor.pdf         # Original PDF  
├── ocr_output/                  # Extracted images & OCR text
├── search-index.json            # Search data
├── 100tips-categorized.json     # Structured tips data
└── favicon.ico                  # Site icon

pages/
├── index.js                    # PDF viewer page
├── 100tips.js                   # Structured tips page
├── _app.js                      # App wrapper
└── _document.js                # Global HTML template

scripts/
├── create-search-index.js      # Search index generator
└── improved-tips-extraction.js  # Tips extraction & categorization
```

## Optimization

- Images optimized for web (70% quality, stripped metadata)
- Static site generation for fast loading
- Categorized data for efficient filtering
- Responsive design for mobile/desktop

## License

This project is for Plaid Cymru internal use.

## Contact

For issues or questions, contact the Plaid Cymru digital team.
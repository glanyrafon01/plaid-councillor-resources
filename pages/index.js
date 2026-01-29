import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Landing() {
  const [language, setLanguage] = useState(null)
  const [role, setRole] = useState(null)
  const router = useRouter()

  const isEnglish = language === 'en'
  const isExistingCouncillor = role === 'existing'
  const canContinue = isEnglish && isExistingCouncillor

  const handleContinue = () => {
    if (!canContinue) return
    router.push('/viewer')
  }

  return (
    <div className="landing">
      <div className="hero">
        <div>
          <span className="eyebrow">Plaid Cymru</span>
          <h1>Plaid Councillor Resources</h1>
          <p className="hero-subtitle">
            Choose your language and role to get tailored guidance, fast navigation, and structured tips.
          </p>
        </div>
        <div className="hero-card">
          <div className="hero-card-title">What you will get</div>
          <ul>
            <li>Searchable guidance across the full PDFs</li>
            <li>Structured tips you can scan and expand</li>
            <li>Clear, role-focused pathways</li>
          </ul>
        </div>
      </div>

      <div className="steps">
        <div className="step-card">
          <div className="step-title">Step 1: Language</div>
          <div className="options">
            <button
              type="button"
              className={`option ${isEnglish ? 'active' : ''}`}
              onClick={() => {
                setLanguage('en')
                setRole(null)
              }}
            >
              English
            </button>
            <button type="button" className="option disabled" disabled>
              Cymraeg
              <span className="badge">Coming soon</span>
            </button>
          </div>
        </div>

        <div className="step-card">
          <div className="step-title">Step 2: Role</div>
          <div className="options">
            <button
              type="button"
              className={`option ${isExistingCouncillor ? 'active' : ''} ${!isEnglish ? 'disabled' : ''}`}
              onClick={() => isEnglish && setRole('existing')}
              disabled={!isEnglish}
            >
              Existing Councillor
            </button>
            <button type="button" className="option disabled" disabled>
              Prospective community and town council candidate
              <span className="badge">Coming soon</span>
            </button>
          </div>
        </div>
      </div>

      <div className="actions">
        <button type="button" className="primary-button" disabled={!canContinue} onClick={handleContinue}>
          Continue
        </button>
        {!canContinue && (
          <div className="helper-text">Select English and Existing Councillor to continue.</div>
        )}
      </div>

      <style jsx>{`
        :global(body) {
          background: radial-gradient(circle at top, #f3f7f4 0%, #ffffff 45%, #f8faf6 100%);
        }

        .landing {
          max-width: 1100px;
          margin: 0 auto;
          padding: 32px 20px 60px;
        }

        .hero {
          display: grid;
          gap: 20px;
          grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
          align-items: stretch;
          background: linear-gradient(135deg, #ffffff 0%, #eef5f1 100%);
          border: 1px solid #e5ece8;
          border-radius: 16px;
          padding: 26px;
          box-shadow: 0 12px 30px rgba(20, 41, 35, 0.08);
        }

        .eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 0.75rem;
          color: #5a6b63;
        }

        h1 {
          margin: 8px 0 10px;
          font-size: 2.4rem;
          letter-spacing: -0.02em;
        }

        .hero-subtitle {
          margin: 0;
          color: #44524c;
          font-size: 1.05rem;
          line-height: 1.6;
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

        .steps {
          display: grid;
          gap: 20px;
          margin: 28px 0;
        }

        .step-card {
          background: #ffffff;
          border-radius: 14px;
          padding: 20px;
          border: 1px solid #e5ece8;
          box-shadow: 0 8px 18px rgba(20, 41, 35, 0.06);
        }

        .step-title {
          font-weight: 700;
          margin-bottom: 14px;
          color: #1d2e28;
        }

        .options {
          display: grid;
          gap: 12px;
        }

        .option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 12px;
          border: 1px solid #d3dfd8;
          background: #f2f6f4;
          padding: 12px 16px;
          font-weight: 600;
          color: #1d2e28;
          text-align: left;
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
        }

        .option:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 16px rgba(20, 41, 35, 0.08);
          background: #e9f2ee;
        }

        .option.active {
          background: #1f6b4f;
          border-color: #1f6b4f;
          color: #ffffff;
        }

        .option.disabled,
        .option:disabled {
          cursor: not-allowed;
          color: #7a8a84;
          background: #f6f8f7;
          border-color: #e1e9e4;
          box-shadow: none;
          transform: none;
        }

        .badge {
          background: #f0f3f2;
          color: #5b6a64;
          border-radius: 999px;
          padding: 4px 10px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .actions {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
        }

        .primary-button {
          border-radius: 999px;
          padding: 10px 22px;
          font-weight: 700;
          border: 1px solid transparent;
          background: #1f6b4f;
          color: #ffffff;
        }

        .primary-button:disabled {
          background: #a9b9b2;
        }

        .helper-text {
          color: #5a6b63;
          font-size: 0.9rem;
        }

        @media (max-width: 900px) {
          .hero {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

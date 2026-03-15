import React from 'react'

function Calendar() {
  return (
    <div className="page">
      <div className="page-inner">
        <h1>Calendar</h1>
        <h2>Welcome to 2026!</h2>

        <iframe
          title="2026"
          src="/documentation/Calendar of Events DGC 2026.pdf"
          width="100%"
          height="800px"
        />

        <details>
          <summary>2025 Calendar</summary>
          <a
            className="newsletter123"
            target="_blank"
            rel="noreferrer"
            href="/documentation/Calendar of Events 2025 (29 May 2025).pdf"
          >
            Calendar of Events 2025
          </a>
        </details>

        <details>
          <summary>2024 Calendar</summary>
          <a
            className="newsletter123"
            target="_blank"
            rel="noreferrer"
            href="/documentation/Calander of Events 2024 (updated).pdf"
          >
            Calendar of Events 2024
          </a>
        </details>
      </div>
    </div>
  )
}

export default Calendar
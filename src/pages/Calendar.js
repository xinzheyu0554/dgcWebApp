import React from 'react'

function Calendar() {
  return (
    <div style={{margin:"10px"}}>
      <div style={{padding:"10px"}}>
              <h1>Calendar</h1>
      <h2>Welcome to 2025!</h2>
      <iframe title="2023" src="/documentation/Calendar of Events 2025 (29 May 2025).pdf" width="100%" height="800px"></iframe>

      <details>
        <summary>2024 Newsletters</summary>
        <a className="newsletter123" target="_blank" rel="noreferrer" href={"/documentation/Calander of Events 2024 (updated).pdf"}>Calander of Events 2024</a>
        </details>
      </div>
    </div>
  )
}
export default Calendar
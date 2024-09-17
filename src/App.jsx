import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [matches, setMatches] = useState([]);
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    fetch("https://api.openligadb.de/getmatchdata/bl1/2024")
      .then(response => response.json())
      .then(data => setMatches(data))
    </>
  )
}

export default App
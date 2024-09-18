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
      .catch(error => console.error("Error", error));
  }, []);

  const handleSearch = () => {
    const foundMatch = matches.find(match => 
      (match.team1.teamName.toLowerCase().includes(team1.toLowerCase()) &&
       match.team2.teamName.toLowerCase().includes(team2.toLowerCase())) ||
      (match.team1.teamName.toLowerCase().includes(team2.toLowerCase()) &&
       match.team2.teamName.toLowerCase().includes(team1.toLowerCase()))
    );
    
    if (foundMatch) {
      const homeTeam = foundMatch.team1.teamName;
      const awayTeam = foundMatch.team2.teamName;
      const score = `${foundMatch.goals[1].scoreTeam1}:${foundMatch.goals[1].scoreTeam2}`;
      const date = `${foundMatch.matchDateTime}`;

      setResult(`Match found:
      Date: ${date}\n
      das Spiel findet in 
      ${homeTeam} vs ${awayTeam}\n
      Score: ${score}`);
    } else {
      setResult( " No match");
    }
  };

  return (
    <>
      <h1>Bundesliga Match Finder</h1>
      <div className='inputStyle'>
        <input
          type="text"
          value={team1}
          onChange={(e) => setTeam1(e.target.value)}
          placeholder="Enter First Team Name"
        />
        <input
          type="text"
          value={team2}
          onChange={(e) => setTeam2(e.target.value)}
          placeholder="Enter Second Team Name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <p className='result'>{result}</p>

    </>
  )
}

export default App
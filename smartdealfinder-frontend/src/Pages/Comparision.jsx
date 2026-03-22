import Header from '../Components/Header.jsx';
import SearchBar from '../Components/SearchBar.jsx';
import Main from '../Components/Main.jsx';
import { useAuth } from "../Context/AuthContext";
import { useState } from 'react';

export default function Comparision() {
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comparisonData, setComparisonData] = useState(null);
  const { user } = useAuth();

  async function HandleSubmit(selectedPlatforms, searchText) {
  setClicked(true);
  setLoading(true);
  setComparisonData(null);

  const payload = {
    searchText,
    platforms: selectedPlatforms
  };

  try {
    if (user) {
      await fetch("http://localhost:5000/api/history/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: user.username,
          searchText: searchText
        })
      });
    }
    const response = await fetch("http://localhost:5000/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log(data);
    setComparisonData(data);

    } catch (error) {
        console.error("Error sending data:", error);
    } finally {
        setLoading(false);
    }
 }


  function clearResults() {
    setComparisonData(null);
  }

  return (
    <>
      <Header />
      <SearchBar HandleSubmit={HandleSubmit} clearResults={clearResults} />

      {loading && <div style={{ textAlign: "center", marginTop: "20px" }}>
        Loading best deals for you...
      </div>}

      {clicked && !loading && comparisonData && (
        <Main data={comparisonData} />
      )}
    </>
  );
}

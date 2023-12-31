import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getResults = async (searchTerm) => {
    if (!searchTerm) {
      alert('Enter a food name to search!!');
    } else {
      try {
        const result = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
        );
        if (result.data.meals) {
          setMeals(result.data.meals);
        } else {
          alert(`No meals found with "${searchTerm}" - Try something else!!`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="App">
      <div>
        <h1 className="title">Meal Finder</h1>
        <input
          type="text"
          placeholder="Search Meal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={() => getResults(searchTerm)}>
          Search
        </button>
        <span>Suggested: "chicken", "fish" etc</span>
      </div>
      <div className="container" style={{ marginTop: '20px' }}>
        <div className="row">
          {meals.map((item, key) => (
            <div className="col-md-4 col-sm-6" key={key}>
              <div className="card mb-4">
                <img src={item.strMealThumb} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{item.strMeal}</h5>
                  <a href={item.strYoutube} className="btn btn-primary">
                    Watch video
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;


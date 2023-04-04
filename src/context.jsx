import React, { useContext, useEffect, useState} from 'react';

import axios from 'axios';
const AppContext = React.createContext()

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealURL = "https://www.themealdb.com/api/json/v1/1/random.php";
const getFavoritesFromLocalStorage=()=>{
  let favorites = localStorage.getItem('favorites');
  if(favorites){
    favorites = JSON.parse(localStorage.getItem('favorites'));
  }
  else{
    favorites = [];
  }
  return favorites;
}
const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false); 
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());
  
  const fetchMeals = async(url)=>{
    setLoading(true);
      try{
        const {data} = await axios(url);
        setMeals(data.meals);      
      }
      catch(err){
        console.log(err.response);
      }
    setLoading(false); 
    }

  const fetchRandomMeal=()=>{
    fetchMeals(randomMealURL);
  }
  const selectMeal=(idMeal, favouriteMeal) =>{
    // console.log(console.log(idMeal));
    let meal;
    if(favouriteMeal){
      meal = favorites.find((meal)=>meal.idMeal === idMeal);
    }    
    else{
      meal = meals.find((meal)=>meal.idMeal === idMeal);
    }
    setSelectedMeal(meal);
    setShowModal(true);
  }
  const closeModal= ()=>{
    setShowModal(false);
    
  }
  const addToFavorites= (idMeal)=>{
    // console.log(idMeal);
    const meal = meals.find((meal)=>meal.idMeal === idMeal);
    const alreadyFavorite = favorites.find((meal)=>meal.idMeal === idMeal);
    if(alreadyFavorite) return;
    const updatedFavorites = [...favorites, meal];
    setFavorites(updatedFavorites);
    // console.log(favorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    
  }
  const removeFromFavorites= (idMeal)=>{
    const updatedFavorites = favorites.filter((meal)=> meal.idMeal!== idMeal);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  }
  useEffect(() => {
    if(!searchTerm) return;
    fetchMeals(allMealsUrl);
  }, [])
  useEffect(() => {
    fetchMeals(allMealsUrl+searchTerm);
  }, [searchTerm])
  return <AppContext.Provider value={{loading, meals, setSearchTerm, fetchRandomMeal, showModal, selectedMeal, selectMeal, closeModal, addToFavorites, removeFromFavorites, favorites}}>
    {children}
  </AppContext.Provider>
}


const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext };
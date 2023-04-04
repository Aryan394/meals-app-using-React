
import {useGlobalContext} from '../context';
import {BsFillBookmarkHeartFill} from 'react-icons/bs';
const Meals = () =>{
  const {meals, loading, selectMeal, addToFavorites} = useGlobalContext()
  // console.log(context);

  if(loading){
    return <section className='section'>
       <h4>Loading...</h4>
    </section>
  }
  
  return(<section className='section-center'>
    {meals.map((singleMeal)=>{
    const {idMeal, strMeal: title, strMealThumb: image} = singleMeal;
     
    // console.log(singleMeal);
    return <article key={idMeal} className = 'single-meal'>
      <img src = {image} className = 'img' onClick ={()=> selectMeal(idMeal)}/>
      <footer>
        <h5>{title}</h5>
        <button className = "like-btn" onClick = {()=>addToFavorites(idMeal)}><BsFillBookmarkHeartFill/></button>
      </footer>
    </article>
    })}
  </section>) 
}
export default Meals;
import { useGlobalContext } from "../context";


const Modals = () =>{
  const {selectedMeal, closeModal} = useGlobalContext();
  const {strMealThumb:image, strMeal: title, strInstructions: text, strSource: source} = selectedMeal
  return <aside className="modal-overlay">
    <div className="modal-container">
{/*       <h1>{selectedMeal.strMeal}</h1> */}
      <img src = {image} alt = {title} className = {"img modal-img"}/>
      <div className = "modal-content">
        <h4>{title}</h4>
        <p>Cooking Instructions</p>
        <p>{text}</p>
        <a href = {source} target = "_blank">Original Source</a>
        <button className = "btn btn-hipster close-btn" onClick= {closeModal}>close</button>
      </div>
    </div>
  </aside>
}
export default Modals;
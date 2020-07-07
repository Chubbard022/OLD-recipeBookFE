import axios from "axios"
import Inspiration from "../Components/Dashboard/LinksWithinDash/Inspiration";
require('dotenv').config()

export const 
    GET_INSPIRATION = "GET_INSPIRATION",
    GET_INSPIRATION_SUCCESS = "GET_INSPIRATION_SUCCESS",
    GET_INSPIRATION_FAILURE = "GET_INSPIRATION_FAILURE",
    GET_INSPIRATION_DROPDOWN = "GET_INSPIRATION_DROPDOWN",
    GET_INSPIRATION_DROPDOWN_SUCCESS = "GET_INSPIRATION_DROPDOWN_SUCCESS",
    GET_INSPIRATION_DROPDOWN_FAILURE = "GET_INSPIRATION_DROPDOWN_FAILURE"


const RECIPE = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${process.env.REACT_APP_SPOON_API}`
const URL = "http://localhost:6500/api"



export const getInspiration = () => dispatch =>{
    dispatch({type: GET_INSPIRATION})
    axios
        .get(`${RECIPE}`)
            .then(res=>{
                let ingredients = []
                const ingredientList = Object.values(res.data.recipes[0].extendedIngredients)
                const image = res.data.recipes[0].image

                ingredientList.map(item=> ingredients.push(item.original))
                const finalIngredientList = ingredients.join()

                let newRecipe = {
                    instructions: res.data.recipes[0].instructions,
                    name: res.data.recipes[0].title,
                    ingredients: finalIngredientList,
                    image: image,
                
                }
                
                axios
                //Putting recipe into the backend for persistence
                    .post(`${URL}/inspiration/newrecipe`,newRecipe)
                        .then(()=>{
                            axios
                                .get(`${URL}/inspiration`)
                                    .then(res=>{
                                        let updateList = res.data.map(item=>{
                                            return {...item,clicked:false}
                                        })
                                        dispatch({
                                            type: GET_INSPIRATION_SUCCESS,
                                            payload: updateList
                                        })
                                    })
                                    .catch(err=>{
                                        console.log("ERR")
                                    })

                        })
            })
            .catch(err=>{
                dispatch({
                    type: GET_INSPIRATION_FAILURE,
                    payload: "ERROR: Failure to get new recipe"
                })
            })
}

export const dropDownInspoRecipe = (recipe,recipeList) => (dispatch) =>{
    dispatch({type:GET_INSPIRATION_DROPDOWN})
    let updatedRecipe = {...recipe,clicked:!recipe.clicked}
    let returnRecipeList = recipeList.map(r=>{
        if(r.id === recipe.id){
            r = updatedRecipe
            return r
        }
        return r
    })
    dispatch({
            type:GET_INSPIRATION_DROPDOWN_SUCCESS,
            payload: returnRecipeList
        })
    if(recipe === undefined){
        dispatch({type: GET_INSPIRATION_DROPDOWN_FAILURE})
    }
}
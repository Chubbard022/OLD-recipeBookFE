import axios from "axios"



export const 
    CREATE_RECIPE = "CREATE_RECIPE",
    CREATE_RECIPE_SUCCESS = "CREATE_RECIPE_SUCCESS",
    CREATE_RECIPE_FAILURE = "CREATE_RECIPE_FAILURE",
    EDIT_RECIPE = "EDIT_RECIPE",
    EDIT_RECIPE_SUCCESS = "EDIT_RECIPE_SUCCESS",
    EDIT_RECIPE_FAILURE = "EDIT_RECIPE_FAILURE",
    DELETE_RECIPE = "DELETE_RECIPE",
    DELETE_RECIPE_SUCCESS = "DELETE_RECIPE_SUCCESS",
    DELETE_RECIPE_FAILURE = "DELETE_RECIPE_FAILURE"

    const URL = "http://localhost:6500/api"


export const createRecipe = (newRecipe) => dispatch =>{
    dispatch({type:CREATE_RECIPE})
    axios
    .post(`${URL}/recipes`,newRecipe)
        .then(res=>{
            dispatch({
                type: CREATE_RECIPE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err=>{
            dispatch({
                type: CREATE_RECIPE_FAILURE,
                payload: "ERROR: Failure to create new recipe"
            })
        })
}

export const editRecipe = (editedRecipe) => dispatch=>{
    dispatch({type:EDIT_RECIPE})
    axios
    .post(`${URL}/recipes`,editRecipe)
        .then(res=>{
            dispatch({
                type: EDIT_RECIPE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err=>{
            dispatch({
                type: EDIT_RECIPE_FAILURE,
                payload: "ERROR: Failure to edit a recipe"
            })
        })
}
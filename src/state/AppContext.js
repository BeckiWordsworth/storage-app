import React, { useReducer, useEffect } from "react";
const axios = require('axios');
import dummyState from './DummyState.json';


const initialState = {
     people: [],
     isSavingPerson: false,
     isFetchingPeople: false,
     isDeletingPerson: false,
     isPeopleDirty: true
}

const reducer = (state, action) => {
    switch (action.type) {
        case "START_SAVE_PERSON": 
            return { ...state, savePayload: action.payload, isSavingPerson: true };

        case "FINISH_SAVE_PERSON":
            return { ...state, savePayload: null, isSavingPerson: false, isPeopleDirty: true };

        case "START_FETCH_PEOPLE":
            return { ...state, isFetchingPeople: true };

        case "FINISH_FETCH_PEOPLE":
            let newPeople = action.people ? action.people : state.people;
            return { ...state, isFetchingPeople: false, isPeopleDirty: false, people: newPeople};

        case "START_DELETE_PERSON":
            if (typeof(action.id) === 'string' && action.id.length > 0) {
                return { ...state, isDeletingPerson: true, deletePersonId:action.id }
            } 

            console.log("START_DELETE_PERSON action requires an action.id");            
            return state;

        case "FINISH_DELETE_PERSON":
            return { ...state, isDeletingPerson: false, deletePersonId:null, isPeopleDirty: true };

        default:
            return { ...state };
  }
};

const AppContext = React.createContext(initialState);
const API_KEY = '5e25fcf94327326cf1c91990';

function AppProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    // SAVE_PERSON Effect 
    useEffect(
        () => {
            if (state.isSavingPerson) {

                let method = "";
                let url = "";
            
                if (state.savePayload._id !== undefined) {
                    url = `https://vindentest-34fc.restdb.io/rest/people/${state.savePayload._id}`;
                    method = 'PUT';
                } else {
                    url = 'https://vindentest-34fc.restdb.io/rest/people';
                    method = 'POST';
                }

                axios.request({
                    url,
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-apikey': API_KEY
                    },
                    data: state.savePayload
                }).then(function (response) {
                    dispatch({type: "FINISH_SAVE_PERSON"});
                })
                .catch(function (error) {
                    console.log(error);
                    dispatch({type: "FINISH_SAVE_PERSON"});
                });
            }
        },
        [state.isSavingPerson]
    )

    // FETCH People Effect
    useEffect(
        () => {
            if (state.isFetchingPeople) {
                axios.get('https://vindentest-34fc.restdb.io/rest/people', {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-apikey': API_KEY
                    }
                }).then(function (response) {
                    dispatch({type: "FINISH_FETCH_PEOPLE", people:response.data});
                })
                .catch(function (error) {
                    console.log(error);
                    dispatch({type: "FINISH_FETCH_PEOPLE", people:response.data});
                });
            }
        },
        [state.isFetchingPeople]
    )

    // Delete Person Effect
    useEffect(
        () => {
            if (state.isDeletingPerson) {
                axios.delete(`https://vindentest-34fc.restdb.io/rest/people/${state.deletePersonId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-apikey': API_KEY
                    }
                }).then(function (response) {
                    dispatch({type: "FINISH_DELETE_PERSON", people:response.data});
                })
                .catch(function (error) {
                    console.log(error);
                    dispatch({type: "FINISH_DELETE_PERSON", people:response.data});
                });
            }
        },
        [state.isDeletingPerson]
    )    

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}

export { AppContext, AppProvider };

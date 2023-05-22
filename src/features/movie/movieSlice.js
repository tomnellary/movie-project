import { createSlice } from '@reduxjs/toolkit';

export const movieSlice = createSlice({
    name: 'movies',
    initialState: ({
        moviesList: [
            {
                id: "7nhPr",
                movie_title: "The Curious Case of Benjamin Button",
                movie_description: "While lying in a hospital bed after Hurricane Katrina's devastation, Daisy remembers her friendship with Benjamin Button, a person suffering from a rare ageing ailment wherein he aged backwards.",
                movie_duration: "166",
                movie_genre: "Action",
                movie_poster: "https://fastly.picsum.photos/id/551/200/200.jpg?hmac=vxRitsvMJEbK15DKl4ZRj7NQWF6RTfzBvievdi9q96s"
            }
        ],
        genres: ["Action", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Thriller"]
    }),
    reducers: {
        addCard: (state, action) => {
            state.moviesList = [...state.moviesList, action.payload]
        },
        deleteCard: (state, action) => {
            state.moviesList.splice(state.moviesList.findIndex((movie) => movie.id === action.payload), 1);
        },
        editCard: (state, action) => {
            let idx = state.moviesList.findIndex((movie) => movie.id === action.payload.id);
            state.moviesList.splice(idx, 1, action.payload);
        },
    }
});

// this is for dispatch
export const { addCard, deleteCard, editCard } = movieSlice.actions;

// this is for configureStore
export default movieSlice.reducer;

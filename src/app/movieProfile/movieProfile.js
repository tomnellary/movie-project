import React, { useState } from "react";
import ShowCards from './showCards'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CreateCard from '../createCard';
import { Button } from "@mui/material";
import { useSelector } from 'react-redux';

export default function ResponsiveGrid() {

  const [openModal, setOpenModal] = useState(false);
  const movies = useSelector((state) => state.movies.moviesList);

  function handleModalClose() {
    setOpenModal(false)
  }

  return (
    <Box sx={{ flexGrow: 1, mr: 5, ml: 5, mt: 5 }}>
      <Button sx={{margin: 2}} variant="contained" onClick={() => setOpenModal(true)}>Add New Card</Button>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {movies.map((movie, index) => (
          <Grid item xs={4} sm={2} md={3} key={index}>
            <ShowCards details={movie} />
          </Grid>
        ))}
      </Grid>
      <CreateCard
        type="Create"
        title="Create New Card"
        openPopup={openModal}
        setOpenPopup={handleModalClose}
      ></CreateCard>
    </Box>
  );
}
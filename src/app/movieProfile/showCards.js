import React, { useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import DetailCard from './showDetails';
import CreateCard from '../createCard';
import { useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteCard } from '../../features/movie/movieSlice';

export default function MediaCard(props) {

  const dispatch = useDispatch();
  const [movieDetail, setMovieDetail] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  function handleModalClose() {
    setOpenModal(false)
  }

  const handleDetail = (detail) => {
    setOpenModal(true);
    setMovieDetail(detail[0]);
  }

  const handleDelete = (id) => {
    dispatch(deleteCard(id));
  }

  const handleEdit = (detail) => {
    setOpenEditModal(true)
    setMovieDetail(detail[0]);
  }

  function handleEditModalClose () {
    setOpenEditModal(false);
  }

  return (
    <Box>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          height="200"
          component="img"
          sx={{cursor: "pointer"}}
          image={props?.details?.movie_poster}
          onClick={() => handleDetail([props?.details])}
        />
        <CardActions disableSpacing>
          <IconButton aria-label="delete card" onClick={() => handleDelete(props?.details?.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit details" onClick={() => handleEdit([props?.details])}>
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>
      <CreateCard
        type="Edit"
        title="Edit Card"
        details={movieDetail}
        openPopup={openEditModal}
        setOpenPopup={handleEditModalClose}
      ></CreateCard>
      <DetailCard
        details={movieDetail}
        openPopup={openModal}
        setOpenPopup={handleModalClose}
      ></DetailCard>
    </Box>
  );
}
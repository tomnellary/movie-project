import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  Box,
  FormGroup,
  TextField,
  Alert,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from 'react-redux';
import { addCard } from '../features/movie/movieSlice';
import { editCard } from '../features/movie/movieSlice';

export default function CreateCard(props) {
  const { openPopup, setOpenPopup, title, type, details } = props;

  const dispatch = useDispatch();
  const [Errors, setErrors] = useState({});
  const [movieTitle, setMovieTitle] = useState("");
  const [moviePoster, setMoviePoster] = useState();
  const [movieGenre, setMovieGenre] = useState("");
  const [movieDuration, setMovieDuration] = useState("");
  const [movieDescription, setMovieDescription] = useState("");

  const genres = useSelector((state) => state.movies.genres);

  useEffect(() => {
    if (type === "Edit") {
      console.log("fgef", details?.movie_genre)
      setMovieTitle(details?.movie_title);
      setMovieGenre(details?.movie_genre);
      setMoviePoster(details?.movie_poster);
      setMovieDuration(details?.movie_duration);
      setMovieDescription(details?.movie_description);
    }
  }, [props])

  const validateFields = () => {
    let _Errors = {};
    let form_valid = true;
    if (!movieTitle) {
      form_valid = false;
      _Errors["movieTitle"] = "Field is required";
    }
    if (!movieDescription) {
      form_valid = false;
      _Errors["Description"] = "Field is required";
    }
    if (!moviePoster) {
      form_valid = false;
      _Errors["Poster"] = "Field is required";
    }
    setErrors(_Errors);
    return form_valid;
  };

  const ClearErrors = (field) => {
    let errs = Errors;
    errs[field] = false;
  };

  const handleImage = e => {
    let file = e.target.files[0];
    if (file && file.size > 1000000) {
      Alert("File Size Exceeded")
    } else if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        setMoviePoster(reader.result);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  };

  const generateId = () => {
    var length = 5,
      charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789',
      retVal = '';
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  };

  const handleRemove = () => {
    setMoviePoster('');
  }

  const createNewCard = () => {
    let isValied = validateFields(true)
    if (!isValied) return
    let data = {
      "id": generateId(),
      "movie_title": movieTitle,
      "movie_description": movieDescription,
      "movie_duration": movieDuration,
      "movie_genre": movieGenre,
      "movie_poster": moviePoster
    }
    if (type === "Create") {
      dispatch(addCard(data));
    }
    else {
      dispatch(editCard(data));
    }
    handleClose();
  };

  const handleClose = () => {
    setOpenPopup(false);
    setMovieTitle('');
    setMovieGenre('');
    setMoviePoster('');
    setMovieDescription('');
    setMovieDuration('');
  };

  return (
    <Dialog open={openPopup} fullWidth maxWidth="xs">
      <div style={{ display: "flex" }}>
        <DialogTitle style={{ flexGrow: 1, color: "#5d686b" }}>
          {title}
        </DialogTitle>
        <Button sx={{ color: "#000" }} variant="" onClick={handleClose}>
          <CloseIcon />
        </Button>
      </div>
      <Box
        color="secondary"
        sx={{ mb: 2, py: 0, px: 0 }}
      >
        <DialogContent sx={{ pt: 0, mb: 0 }}>
          <DialogContentText>
            <FormGroup className="txt-font-size">
              <TextField
                required
                fullWidth
                sx={{ my: 1 }}
                id="outlined-basic"
                value={movieTitle}
                onChange={(e) => {
                  setMovieTitle(e.target.value);
                  ClearErrors("movieTitle");
                }}
                inputProps={{ maxLength: 60 }}
                label="Title"
                variant="outlined"
                error={Errors["movieTitle"] ? true : false}
                helperText={
                  Errors["movieTitle"] ? Errors["movieTitle"] : ""
                }
              />
              <TextField
                multiline
                rows={2}
                inputProps={{ maxLength: 255 }}
                id="outlined-basic"
                value={movieDescription}
                onChange={(e) => {
                  setMovieDescription(e.target.value);
                  ClearErrors("Description");
                }}
                label="Description"
                variant="outlined"
                error={Errors["Description"] ? true : false}
                helperText={Errors["Description"] ? Errors["Description"] : ""}
              />
              <TextField
                fullWidth
                type="number"
                sx={{ my: 1 }}
                id="outlined-basic"
                value={movieDuration}
                onChange={(e) => {
                  setMovieDuration(e.target.value);
                  ClearErrors("movieTitle");
                }}
                inputProps={{ maxLength: 60 }}
                label="Duration"
                variant="outlined"
              />
              <Select
                value={movieGenre}
                placeholder="Genre" onChange={(e) => {
                  setMovieGenre(e.target.value);
                }}              >
                {genres.map((genre, i) => {
                  return (
                    <MenuItem key={i} value={genre}>
                      {genre}
                    </MenuItem>
                  );
                })}
              </Select>
              {moviePoster ?
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img src={moviePoster} style={{ marginTop: "8px" }} alt="whitelogo" width="190" height="100" />
                  <Typography sx={{ ml: 1, cursor: "pointer" }} onClick={handleRemove}>Remove</Typography>
                </Box> :
                <Button variant="contained" component="label" sx={{ mt: 2 }}>
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImage}
                    onClick={e => (e.target.value = null)}
                  />
                  <Typography>{Errors["Poster"] ? Errors["Poster"] : ""}</Typography>
                </Button>
              }
            </FormGroup>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          className="btn-align"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            onClick={createNewCard}
            sx={{ px: 4, py: 1 }}
          >
            {type}
          </Button>
        </DialogActions>
      </Box>
    </Dialog >
  );
}

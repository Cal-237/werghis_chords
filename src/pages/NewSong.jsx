import { Box, Container, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { notesSharp } from "../scripts/keys";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from '../firebase';
import { useState } from "react";
import parseSongObject from "../scripts/parseSongObject";
import SubmitButton from "../components/SubmitButton.jsx";

function NewSong() {

  const [key, setKey] = useState('C');

  const [status, setStatus] = useState("default");

  const handleKeyChange = (event) => {
    setKey(event.target.value);
  };

  async function pushToServer([songBase, songFull]) {
    try {
      const docRef = await addDoc(collection(db, "songs"), songBase);
      console.log("Base document written with ID: ", docRef.id);

      await setDoc(doc(db, "songDatas", docRef.id), songFull)
      console.log("Data document written with ID: ", docRef.id);

      setStatus("success");
    } catch (e) {
      console.error("Error adding document: ", e);
      setStatus("error");
    }
  }


  return (
    <>
    <Box height={25}></Box>

    <Box margin={5}>
      <Container>
        <Box marginY={2} maxWidth={765} marginX="auto">
          <TextField size="small" fullWidth id="song-title" label="Song Title" variant="outlined" />
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small" style={{ float: "right" }}>
            <InputLabel id="select-key-label">Key</InputLabel>
            <Select
              labelId="select-key-label"
              id="select-key"
              value={key}
              label="Key"
              onChange={handleKeyChange}
            >
              {notesSharp.map((note) => (
                <MenuItem value={note} key={notesSharp.indexOf(note)}>{note}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Container>
      <Container>
        <textarea id="newsong" rows={30} cols={100}></textarea>
      </Container>
      <Box marginTop={2}>
        <SubmitButton
          label="add song"
          status={status}
          onClick={() => {
            setStatus("loading");
            try {
              var song = parseSongObject(
                document.getElementById("newsong").value,
                document.getElementById("song-title").value,
                key
              );
            } catch (error) {
              console.error("Error parsing song object: ", error)
              setStatus("error");
            }

            console.log(song);
            pushToServer(song);
          }}
          variant="outlined">
        </SubmitButton>
      </Box>
    </Box>

    </>
  );
}

export default NewSong;

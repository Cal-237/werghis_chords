import { Box, Container, TextField, FormControl, InputLabel, Select, MenuItem, CircularProgress } from "@mui/material";
import { notesSharp } from "../scripts/keys";
import { doc, setDoc, getDoc} from "firebase/firestore";
import { db } from '../firebase';
import { useEffect, useState } from "react";
import parseSongObject from "../scripts/parseSongObject";
import { useParams } from "react-router-dom";
import createEditableText from "../scripts/createEditableText";
import SubmitButton from "../components/SubmitButton";

export default function EditSong() {
  const { id } = useParams();

  const [key, setKey] = useState('C');

  const [status, setStatus] = useState("default");

  const [songData, setSongData] = useState({});

  useEffect(() => {
    async function pullSongData() {
        const docRef = doc(db, "songDatas", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setSongData(docSnap.data());
          document.getElementById("editsong").value = createEditableText(docSnap.data(), "C");
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
    }
  
    pullSongData(id);
    console.log("pulling data");
  }, [id]);

  const handleKeyChange = (event) => {
    setKey(event.target.value);
  };

  const handleTitleChange = (e) => {
    setSongData((prev => ({
      ...prev,
      title: e.target.value
    })))
  }

  const handleTextChange = () => {
    setStatus((prev) => {
      if (prev != "default") return "default";
    });
  }

  // eslint-disable-next-line no-unused-vars
  async function updateOnServer(docId, [songBase, songFull]) {
    try {
      await setDoc(doc(db, "songDatas", docId), songFull);
      console.log("Document updated with ID: ", docId);
      setStatus("success");
    } catch (e) {
      console.error("Error updating document: ", e);
      setStatus("error");
    }
  }

  return ( 
    <>

    <Box height={25}></Box>
    
    {songData == {} ? 

    <Box><CircularProgress /></Box>

    :

    <Box margin={5}>
      <Container>
        <Box marginY={2} maxWidth={765} marginX="auto">
          <TextField value={songData.title ? songData.title : ""} onChange={handleTitleChange} size="small" fullWidth label="Song Title" id="song-title"/>
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
        <textarea onChange={handleTextChange} id="editsong" rows={30} cols={100}></textarea>
      </Container>
      <Box marginTop={2}>
        <SubmitButton
          label="Update"
          status={status}
          onClick={() => {
            setStatus("loading");

            try {
              var song = parseSongObject(
                document.getElementById("editsong").value,
                document.getElementById("song-title").value,
                key
              );
            } catch (error) {
              console.error("Error parsing song object: ", error)
              setStatus("error");
            }

            console.log(song);
            updateOnServer(id, song);
          }}>
        </SubmitButton>
      </Box>
    </Box>}

    </>
  );
}
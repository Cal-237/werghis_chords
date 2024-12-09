import { useEffect, useState } from "react";

import SongsTable from "../components/SongsTable";
import { query, collection, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Fab } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material"
import { useNavigate } from "react-router-dom";


export default function Homepage() {

    // use a state hook to store the songs once they are loaded and then display them
    const [songs, setSongs] = useState([]);

    const navigate = useNavigate();

    // set an effect to load the songs from Firebase at start
    useEffect(() => {
        // declare the async function
        async function pullSongs() {          
          const fetchedSongs = [];  // array to hold fetched songs

          const q = query(collection(db, "songs"), orderBy("title")); // create a query for the "songs" collection in firestore, ordering by title
    
          const songsDB = await getDocs(q); // request this query and store the result in songsDB
    
          songsDB.forEach((doc) => {  // for each song we recieved in the query
            let docData = doc.data();   // create an object with the document's data
            
            if (!fetchedSongs.find(song => song.id == doc.id)) { // avoids duplicates when using React.StrictMode

              fetchedSongs.push({     // add a new object to fetchedSongs with that data
                title: docData.title,
                date: docData.date,
                id: doc.id
              });
            }
          });
    
          setSongs(fetchedSongs); // set the state of this object using the fetched songs
        }
    
        pullSongs();  // execute the function
        
      }, []) // empty brackets to only run once at start of page


    return (
        <>
          <SongsTable songs={songs} />
          <Fab sx={{position: "fixed", right: 30, bottom: 30}} 
            color="primary" 
            aria-label="new"
            onClick={() => {
              navigate("/newSong");
            }}
          >
            <AddIcon />
          </Fab>
        </>
      );
}
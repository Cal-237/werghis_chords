/* eslint-disable react/jsx-key */
import { notesFlat, notesSharp } from "../scripts/keys";
import { Box, Typography, CircularProgress, IconButton, Tooltip } from "@mui/material";
import { Edit, Print } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Chord from "../components/Chord";
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import ViewControls from "../components/ViewControls";


export default function SongView() {
    const { id } = useParams();

    const navigate = useNavigate();

    const [params, setParams] = useState({key: "C", flats: false, twoCols: false});

    const [songData, setSongData] = useState({});

    useEffect(() => {
        const box = document.getElementById("song-display");
        box.style.maxHeight = "none";
        box.style.maxHeight = `${(box.offsetHeight / 2) + 200}px`;
    }, [songData])

    useEffect(() => {
        async function pullSongData() {
            const docRef = doc(db, "songDatas", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              setSongData(docSnap.data());
            } else {
              // docSnap.data() will be undefined in this case
              console.error("No such document!");
            }
        }
      
        pullSongData();
    }, [id]);

    
    const handleParamsChange = (e) => {
        if (e.target.value && e.target.name === undefined) {
            setParams(prevParams => ({
                ...prevParams, 
                key: e.target.value
            }));
        } else if (e.target.id == "use-flats") {
            setParams(prevParams => {
                prevParams.flats = e.target.checked;
                
                let newKey = "";
                if (prevParams.key.includes("b")) {
                    newKey = notesSharp[notesFlat.indexOf(prevParams.key)];
                } else if (prevParams.key.includes("#")) {
                    newKey = notesFlat[notesSharp.indexOf(prevParams.key)];
                }

                return {
                    ...prevParams,
                    flats: e.target.checked,
                    key: (newKey ? newKey : prevParams.key)
                };
            });
        } else if (e.target.id == "two-cols") {
            setParams(prevParams => ({
                ...prevParams,
                twoCols: e.target.checked
            }))
        }
    };

    return (
        <>

        <Box height={25}></Box>

        <Box
            marginBottom={10}
            maxWidth={700}
            sx={{ bgcolor: "background.default" }}
        >
            <Box justifyContent={"space-between"} display={"flex"} alignItems={"center"}>
                <Box display={"flex"}>
                <Typography mr={1} variant="h5" align="left">
                    {//@ts-ignore
                    songData.title}
                </Typography>
                <Tooltip title="Edit">
                    <IconButton
                      onClick={() => {
                        navigate(`/edit/${id}`)
                      }}
                      size='small'
                      aria-label='edit'>
                      <Edit fontSize='inherit'></Edit>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Print">
                    <IconButton
                      onClick={() => {
                        window.print();
                      }}
                      size='small'
                      aria-label='edit'>
                      <Print fontSize='inherit'></Print>
                    </IconButton>
                </Tooltip>
                </Box>

                <ViewControls params={params} handleChange={handleParamsChange}></ViewControls>
            </Box>

        
            <Box id="song-display" display={"flex"} columnGap={5} flexWrap={"wrap"} flexDirection={"column"}>
            
                {songData.stanzas ? 

                songData.stanzas.map((stanza) => (
                    <Box>
                        <Typography mt={2} variant="h6" align="left">{stanza.name}</Typography>
                        {stanza.lines.map((line) => (
                            <Box
                                textAlign={"left"}
                                mr={1.5}
                            >
                                {line.segments.map((segment) => (
                                    <Box display={"inline-block"}>
                                        <Chord useFlats={params.flats} chord={segment.chord} songKey={params.key}></Chord>
                                        <Typography variant="body1" align="left">
                                            {segment.text.replace(/\s/g, "\u00A0") }
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        ))}
                    </Box>
                )
                ) 
                                
                : 
                                
                <Box marginY={10}>
                    <CircularProgress size={50}></CircularProgress>
                </Box>
                }
            </Box>

        </Box>
        </>
    );
}
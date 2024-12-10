import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CircularProgress, IconButton, Box, Link } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function SongsTable({ songs }) {

  const navigate = useNavigate();

  async function deleteSong(songId, title) {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      await deleteDoc(doc(db, "songs", songId));
      await deleteDoc(doc(db, "songDatas", songId));
      location.reload();
    }
  }

  return songs.length == 0 ? 

  (
    <Box marginY={10}>
      <CircularProgress size={50}></CircularProgress>
    </Box>
  ) 
  
  : 
  
  (
    <TableContainer sx={{maxWidth: 800, mx: 'auto', my: 3}} component={Paper} elevation={0}>
      <Table size="small" sx={{ minWidth: 400, maxWidth: 800 }} aria-label="songs table">

        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell></TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {songs.map((song) => (
            <TableRow
              key={song.title}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link component={RouterLink} to={`/songs/${song.id}`}>
                  {song.title}
                </Link>
              </TableCell>

              <TableCell sx={{minWidth: 60}}>
                <IconButton
                  onClick={() => {
                    navigate(`/edit/${song.id}`);
                  }}
                  size="small"
                  aria-label="edit"
                >
                  <Edit fontSize="inherit"></Edit>
                </IconButton>
                <IconButton
                  onClick={() => {
                    deleteSong(song.id, song.title);
                  }}
                  size="small"
                  aria-label="delete"
                >
                  <Delete fontSize="inherit"></Delete>
                </IconButton>
              </TableCell>

              <TableCell align="right">{song.date}</TableCell>

            </TableRow>)
          )}
        </TableBody>

      </Table>
    </TableContainer>
  );
}

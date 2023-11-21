import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function Prayer(props) {
  return (
    <>
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={props.img}
          alt="green iguana"
        />
        <CardContent>
          <h2 gutterBottom variant="h4" component="div">
            {props.name}
          </h2>
          <Typography variant="h2" color="text.secondary">
            {props.time}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default Prayer;

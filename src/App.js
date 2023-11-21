import Container from "@mui/material/Container";
import "./App.css";
import MainContent from "./components/MainContent";

function App() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Container>
          <MainContent />
        </Container>
      </div>
    </>
  );
}

export default App;

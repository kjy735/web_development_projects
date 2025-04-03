import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/Toolbar';
import Typrgraphy from '@mui/material/Typography';
import  Container  from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  

  return (
    <Container maxWidth="x1">
      <CssBaseline />
      <AppBar position="static">
        <ToolBar>
          <Typrgraphy variant="h6">
            Car shop
          </Typrgraphy>
        </ToolBar>
      </AppBar>
    </Container>
  )
}

export default App


import { Container } from '@mui/material';
import NavBar from './components/NavBar';
import TaskManager from './components/TaskManager';

function App() {
  return (
   <>
   <NavBar />
   <Container maxWidth='lg'>
    <TaskManager />
   </Container>
 
   </>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProjectsList } from './components/ProjectsList';
import { ProjectDetails } from './components/ProjectDetails';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectsList />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

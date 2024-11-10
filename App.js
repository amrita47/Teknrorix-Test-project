import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import JobDetailsPage from './Pages/JobDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact component={HomePage} />
        <Route path="/job/:id" component={JobDetailsPage} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookingsPage from '../page/BookingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookingsPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
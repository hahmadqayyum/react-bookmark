import "./App.css";
import BookMark from "./components/BookMarks";
import AddBookMark from "./components/AddBookMark";

function App() {
  return (
    <div className="App">
      <AddBookMark />
      <BookMark />
    </div>
  );
}

export default App;

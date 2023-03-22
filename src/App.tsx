import { Home } from "./components/Home";
import { Sounds } from "./components/Sounds";

function App() {
  return <Home children={<Sounds/>}/>;
}

export default App;

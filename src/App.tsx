import BoardComponent from "./components/BoardComponent";

// refaktorerade så App har så lite kod som möjligt, best practice
// att dela upp mer i komponenter

export default function App() {
  return <BoardComponent></BoardComponent>;
  // testa hör för ska köra PR i Github o de ska ej gå för ja har
  // satt actions till o bara acceptera PR från dev til main, EJ test till main
  // som ja ska testa nu!
}

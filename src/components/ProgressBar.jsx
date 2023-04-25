import { Line, Circle } from 'rc-progress';



export default function App() {
   return (
    <>
    <Line percent={10} strokeWidth={4} strokeColor="red" />
    <Circle percent={50} strokeWidth={4} strokeColor="aqua" />
    </>
    )
};

import { Image } from "react-bootstrap";


export default function Home() {
  return (
    <>
    <h1 className="text-center">Bienvenue sur Metal Lycra</h1>
    <div className = "mx-auto" style={{display:"flex"}}>
      <Image className = "mx-auto" src = "https://i.pinimg.com/474x/4d/6d/84/4d6d846b691904459920175d80415c93.jpg" alt="metallycra" fluid/>
    </div>
    
    </>
  );
}

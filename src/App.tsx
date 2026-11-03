import { useEffect, useState } from "react"
import Users from "./components/Users";

function App() {
  // const [szamlalo, setSzamlalo] = useState(0);
  // const [nev, setNev] = useState("hoho");

  // useEffect(()=>{
  //   console.log("asd");
  // });

  // useEffect(()=>{
  //   console.log("aaaaaaaaaa");
  // }, []);

  // useEffect(()=>{
  //   console.log("33333333333: " + szamlalo + ", " + nev);
  //   document.title = `${nev} (${szamlalo})`
  // }, [szamlalo, nev]);

  const [telefonok, setTelefonok] = useState<Telefon[]>([]);
  const [novekvo, setNovekvo] = useState(false);

  useEffect(() => {
    async function betolt() {
      try {
        const response = await fetch("/phones.json");
        const data: Telefon[] = await response.json();

        setTelefonok(data)
      }
      catch (e) {
        console.log(e);
      }
    }
    betolt();
  }, [])

  useEffect(()=>{
    if(novekvo) {
      setTelefonok(telefonok.toSorted((a,b) => a.nev.localeCompare(b.nev)))
    }
    else {
      setTelefonok(telefonok.toSorted((a,b) => b.nev.localeCompare(a.nev)))
    }
  }, [novekvo])

  return (
    <>
      {/* <p>Érték: {szamlalo}</p>
      <button onClick={()=>
      {
        setSzamlalo(szamlalo+1)
      }}>Gomba</button>
      <button onClick={()=>{
        setNev("Hoho")
      }}>névmás</button>


      <Users /> */}

      <table>
        <thead>
          <th>Id</th>
          <th>Név</th>
          <th>Gyártó</th>
          <th>Ár</th>
          <th>Memória</th>
        </thead>
        <tbody>
          {telefonok.map(t => (
            <tr>
              <td>{t.id}</td>
              <td>{t.nev}</td>
              <td>{t.gyarto}</td>
              <td>{t.ar}</td>
              <td>{t.memoria}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={()=>{
        setNovekvo(!novekvo)
      }}>Rendezés</button>
    </>
  )
}

export default App


type Telefon = {
  id: number;
  nev: string;
  gyarto: string;
  ar: number;
  memoria: number;
}
import { useEffect, useState } from "react";

export default function Users() {
    const URL = "https://jsonplaceholder.typicode.com/users";
    
    const [felhasznalok, setFelhasznalok] = useState<Felhasznalo[]>([]);

    useEffect(()=>{
        async function betolt() {
            try {
                const response = await fetch(URL);
                const data: Felhasznalo[] = await response.json();

                setFelhasznalok(data)
            }
            catch (e) {
                console.log(e);
            }
        } 
        betolt();
        console.log(felhasznalok);
    }, [])

    return (
        <>
            <h2>Felhasználó lista</h2>
            <ul>
                {felhasznalok.map(f => (
                <li key={f.id}>{f.name}, {f.email}</li>
            ))}
            </ul>
        </>
    )
}

type Felhasznalo = {
    id: number;
    name: string;
    email: string;        
}
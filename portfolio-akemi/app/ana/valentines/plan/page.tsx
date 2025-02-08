"use client";

import { useState, useEffect } from 'react';
import { db, collection, addDoc } from '@/firebaseConfig';
import Image from 'next/image';
import dynamic from "next/dynamic";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Playfair_Display, Sacramento } from 'next/font/google';

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '700'], 
});

const sacramento = Sacramento({
    subsets: ['latin'],
    weight: ['400', '400'], 
});
  
  const foodTypes = [
    { name: "Italiana", img: "/images/italian.jpg" },
    { name: "Mexicana", img: "/images/mexican.jpg" },
    { name: "Japonesa", img: "/images/japanese.jpg" },
    { name: "Libanesa", img: "/images/lebanese.jpg" },
    { name: "China", img: "/images/chinese.jpg" },
    { name: "Mariscos", img: "/images/seafood.jpg" },
  ];
  
  const dessertsCoffee = [
    { name: "Helados", img: "/images/icecream.jpg" },
    { name: "Pastel", img: "/images/cake.jpg" },
    { name: "Chocolate", img: "/images/chocolate.jpg" },
    { name: "Té", img: "/images/bubbletea.jpg" },
    { name: "Café", img: "/images/coffee.jpg" },
    { name: "Donas", img: "/images/donuts.jpg" },
    { name: "Milkshake", img: "/images/milkshake.jpg" },
    { name: "Churros", img: "/images/churros.jpg" },
    { name: "Crepas", img: "/images/crepes.jpg" },
  ];
  
  const activities = [
    { name: "Cine", img: "/images/movie.jpg" },
    { name: "Arcade", img: "/images/arcade.jpg" },
    { name: "Museo", img: "/images/museum.jpg" },
    { name: "Parque", img: "/images/park.jpg" },
    { name: "Zoológico", img: "/images/zoo.jpg" },
    { name: "Pista de hielo", img: "/images/icerink.jpg" },
  ];
  const timeOptions = Array.from({ length: 8 }, (_, i) => `${13 + i}:00`);

export default function Plan() {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
    const [pagina, setPagina] = useState(0);
    const [fecha, setFecha] = useState<Date | null>(null);
    const [hora, setHora] = useState<string | null>(null);
    const [comida, setComida] = useState<string[]>([]);
    const [postre, setPostre] = useState<string[]>([]);
    const [actividad, setActividad] = useState<string[]>([]);
    const [db, setDb] = useState<any>(null);

    useEffect(() => {
        import("@/firebaseConfig").then((firebase) => {
          setDb(firebase.db);
        });
      }, []);
    
      const toggleSelection = (selection: string[], setSelection: any, item: string) => {
        if (selection.includes(item)) {
          setSelection(selection.filter((opt) => opt !== item));
        } else if (selection.length < 3) {
          setSelection([...selection, item]);
        }
      };

      const submitChoices = async () => {
        try {
          await addDoc(collection(db, "valentine_choices"), {
            date: fecha?.toDateString(),
            time: hora,
            food: comida,
            dessert: postre,
            activity: actividad,
            timestamp: new Date(),
          });
          alert("¡Tus opciones han sido guardadas! ❤️");
        } catch (error) {
          console.error("Error saving choices:", error);
        }
      };

      return (
        <div style={{ 
            textAlign: "center", 
            padding: "20px", 
            backgroundImage: `url(${basePath}/valentines2025.jpg)`, 
            height: "100vh",
        }}>
      <h1>¡Sí, acepto! ❤️</h1>

      {/* Date Selection */}
      {pagina === 0 && (
        <div>
          <h2>Selecciona una fecha</h2>
          <DatePicker selected={fecha} onChange={(date) => setFecha(date)} dateFormat="dd/MM/yyyy" minDate={new Date()} inline />
          <button onClick={() => setPagina(1)} disabled={!fecha} style={{ marginTop: "10px" }}>
            Siguiente
          </button>
        </div>
      )}

      {/* Time Selection */}
      {pagina === 1 && (
        <div>
          <h2>Selecciona una hora</h2>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            {timeOptions.map((time) => (
              <button
                key={time}
                onClick={() => setHora(time)}
                style={{
                  padding: "8px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor: hora === time ? "#ff69b4" : "#ddd",
                  color: hora === time ? "white" : "black",
                }}
              >
                {time}
              </button>
            ))}
          </div>
          <button onClick={() => setPagina(2)} disabled={!hora} style={{ marginTop: "10px" }}>
            Siguiente
          </button>
        </div>
      )}

      {/* Food Selection */}
      {pagina === 2 && (
        <div>
          <h2>Selecciona hasta 3 tipos de comida</h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
            {foodTypes.map((food) => (
              <button
                key={food.name}
                onClick={() => toggleSelection(comida, setComida, food.name)}
                style={{
                  cursor: "pointer",
                  padding: "10px",
                  borderRadius: "8px",
                  backgroundColor: comida.includes(food.name) ? "#ff69b4" : "#ddd",
                  color: comida.includes(food.name) ? "white" : "black",
                }}
                >
                <Image src={food.img} alt={food.name} width={100} height={100} />
                <p>{food.name}</p>
                </button>
            ))}
          </div>
          <button onClick={() => setPagina(3)} disabled={comida.length === 0}>
            Siguiente
          </button>
        </div>
      )}

      {/* Dessert/Coffee Selection */}
      {pagina === 3 && (
        <div>
          <h2>Selecciona hasta 3 postres o cafés</h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
            {dessertsCoffee.map((dessert) => (
              <button
                key={dessert.name}
                onClick={() => toggleSelection(postre, setPostre, dessert.name)}
                style={{
                  cursor: "pointer",
                  padding: "10px",
                  borderRadius: "8px",
                  backgroundColor: postre.includes(dessert.name) ? "#ff69b4" : "#ddd",
                  color: postre.includes(dessert.name) ? "white" : "black",
                }}
                >
                <Image src={dessert.img} alt={dessert.name} width={100} height={100} />
                <p>{dessert.name}</p>
                </button>
            ))}
          </div>
          <button onClick={() => setPagina(4)} disabled={postre.length === 0}>
            Siguiente
          </button>
        </div>
      )}

      {/* Activity Selection */}
      {pagina === 4 && (
        <div>
          <h2>Selecciona hasta 3 actividades</h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
            {activities.map((activity) => (
              <button
                key={activity.name}
                onClick={() => toggleSelection(actividad, setActividad, activity.name)}
                style={{
                  cursor: "pointer",
                  padding: "10px",
                  borderRadius: "8px",
                  backgroundColor: actividad.includes(activity.name) ? "#ff69b4" : "#ddd",
                  color: actividad.includes(activity.name) ? "white" : "black",
                }}
                >
                <Image src={activity.img} alt={activity.name} width={100} height={100} />
                <p>{activity.name}</p>
                </button>
            ))}
          </div>
          <button onClick={submitChoices} disabled={actividad.length === 0}>
            Confirmar ❤️
          </button>
        </div>
      )}
    </div>
    );
}
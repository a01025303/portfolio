"use client";

import { useState, useEffect } from 'react';
import { db, collection, addDoc } from '@/firebaseConfig';
import Image from 'next/image';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Playfair_Display, Sacramento } from 'next/font/google';
import styles from "../styles.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '700'], 
});

const sacramento = Sacramento({
    subsets: ['latin'],
    weight: ['400', '400'], 
});
  
  const foodTypes = [
    { name: "Italiana", img: `${basePath}/italiana.jpg` },
    { name: "Mexicana", img: `${basePath}/mexicana.jpg` },
    { name: "Japonesa", img: `${basePath}/japonesa.jpg` },
    { name: "Libanesa", img: `${basePath}/libanesa.jpg` },
    { name: "China", img: `${basePath}/china.jpg` },
    { name: "Mariscos", img: `${basePath}/mariscos.jpg` },
  ];
  
  const dessertsCoffee = [
    { name: "Helados", img: `${basePath}/helado.jpg` },
    { name: "Pastel", img: `${basePath}/pastel.jpg` },
    { name: "Chocolate", img: `${basePath}/chocolate.jpg` },
    { name: "Té", img: `${basePath}/bubbletea.jpg` },
    { name: "Café", img: `${basePath}/cafe.jpg` },
    { name: "Donas", img: `${basePath}/donas.jpg` },
    { name: "Milkshake", img: `${basePath}/milkshake.jpg` },
    { name: "Churros", img: `${basePath}/churros.jpg` },
    { name: "Crepas", img: `${basePath}/crepas.jpg` },
  ];
  
  const activities = [
    { name: "Cine", img: `${basePath}/cine.jpg` },
    { name: "Arcade", img: `${basePath}/arcade.jpg` },
    { name: "Museo", img: `${basePath}/museo.jpg` },
    { name: "Parque", img: `${basePath}/parque.jpg` },
    { name: "Zoológico", img: `${basePath}/zoo.jpg` },
    { name: "Pista de hielo", img: `${basePath}/patinaje.jpg` },
  ];
  const timeOptions = Array.from({ length: 8 }, (_, i) => `${13 + i}:00`);

export default function Plan() {
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
          await addDoc(collection(db, "plan_valentines2025"), {
            fecha: fecha?.toDateString(),
            hora: hora,
            comida: comida,
            postre: postre,
            actividad: actividad,
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
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
        }}
        className={playfair.className}>
            <h1 style={{ color: "#ab1c1c", marginBottom: "30px", fontSize: "20px"}}>Planea la cita!</h1>
                  {/* Main box simulating a mini browser window */}
                  <div
                style={{
                    position: "relative", // Makes child elements (header) position relative to this
                    backgroundColor: "#fef7fc",
                    minHeight: "60vh",
                    width: "60vw",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    // flexDirection: "column"
                }}
            >
                {/* Fake Browser Header (Fixed at the top) */}
                <div 
                    style={{
                        position: "absolute", // Sticks to the top inside the box
                        top: 0,
                        left: 0,
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        background: "#ffdede",
                        padding: "5px 15px",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                        height: "30px" // Fixed height
                    }}
                >
                    {/* Fake Browser Buttons */}
                    <div style={{ display: "flex", gap: "5px" }}>
                        <span style={{ width: "12px", height: "12px", background: "#ff5f56", borderRadius: "50%" }}></span>
                        <span style={{ width: "12px", height: "12px", background: "#ffbd2e", borderRadius: "50%" }}></span>
                        <span style={{ width: "12px", height: "12px", background: "#27c93f", borderRadius: "50%" }}></span>
                    </div>
                </div>
    
                {/* Content Inside (Pushed down to avoid overlap) */}
                <div style={{ padding: "40px 0px 40px 0px", textAlign: "center", flexGrow: 1 }}>
                    {/* Date Selection */}
                    {pagina === 0 && (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <h2 style={{color: "#ab1c1c", margin: "10px"}}>Elige la fecha</h2>
                            <div style={{ display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center" }}>
                                <div className={styles.customDatepicker} style={{marginTop: "10px"}}>
                                    <DatePicker selected={fecha} onChange={(date) => setFecha(date)} dateFormat="dd/MM/yyyy" minDate={new Date()} inline />
                                </div>
                            </div>
                            <button onClick={() => setPagina(1)} disabled={!fecha} style={{ marginTop: "15px", color:"#ab1c1c", border: "1px solid #ab1c1c", padding: "10px", borderRadius: "8px"}}>
                                Siguiente
                            </button>
                            </div>
                        )}

                        {/* Time Selection */}
                        {pagina === 1 && (
                            <div>
                            <h2 style={{color: "#ab1c1c", margin: "10px"}}>Elige la hora</h2>
                            <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", marginTop: "10px" }}>
                                {timeOptions.map((time) => (
                                <button
                                    key={time}
                                    onClick={() => setHora(time)}
                                    style={{
                                    padding: "8px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    backgroundColor: hora === time ? "#ff69b4" : "#ffdede",
                                    color: hora === time ? "white" : "black",
                                    }}
                                >
                                    {time}
                                </button>
                                ))}
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", margin: "20px", gap: "20px" }}>
                                <button onClick={() => setPagina(0)} style={{ marginTop: "15px", color:"#ab1c1c", border: "1px solid #ab1c1c", padding: "10px", borderRadius: "8px"}}>
                                    Anterior
                                </button>
                                <button onClick={() => setPagina(2)} disabled={!hora} style={{ marginTop: "15px", color:"#ab1c1c", border: "1px solid #ab1c1c", padding: "10px", borderRadius: "8px"}}>
                                    Siguiente
                                </button>
                            </div>
                            </div>
                        )}

                        {/* Food Selection */}
                        {pagina === 2 && (
                            <div>
                            <h2 style={{color: "#ab1c1c", margin: "10px"}}>Elige top 3 tipos de comida</h2>
                            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
                                {foodTypes.map((food) => (
                                <button
                                    key={food.name}
                                    onClick={() => toggleSelection(comida, setComida, food.name)}
                                    style={{
                                    cursor: "pointer",
                                    padding: "10px",
                                    borderRadius: "8px",
                                    backgroundColor: comida.includes(food.name) ? "#ff69b4" : "#ffdede",
                                    color: comida.includes(food.name) ? "white" : "black",
                                    }}
                                    >
                                    <Image src={food.img} alt={food.name} width={100} height={100} layout="intrinsic" objectFit="cover" />
                                    <p>{food.name}</p>
                                    </button>
                                ))}
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", margin: "20px", gap: "20px" }}>
                                <button onClick={() => setPagina(1)} style={{ marginTop: "15px", color:"#ab1c1c", border: "1px solid #ab1c1c", padding: "10px", borderRadius: "8px"}}>
                                    Anterior
                                </button>
                                <button onClick={() => setPagina(3)} disabled={!hora} style={{ marginTop: "15px", color:"#ab1c1c", border: "1px solid #ab1c1c", padding: "10px", borderRadius: "8px"}}>
                                    Siguiente
                                </button>
                            </div>
                            </div>
                        )}

                        {/* Dessert/Coffee Selection */}
                        {pagina === 3 && (
                            <div>
                            <h2 style={{color: "#ab1c1c", margin: "10px"}}>Elige top 3 postres o cafés</h2>
                            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
                                {dessertsCoffee.map((dessert) => (
                                <button
                                    key={dessert.name}
                                    onClick={() => toggleSelection(postre, setPostre, dessert.name)}
                                    style={{
                                    cursor: "pointer",
                                    padding: "10px",
                                    borderRadius: "8px",
                                    backgroundColor: postre.includes(dessert.name) ? "#ff69b4" : "#ffdede",
                                    color: postre.includes(dessert.name) ? "white" : "black",
                                    }}
                                    >
                                    <Image src={dessert.img} alt={dessert.name} width={100} height={100} />
                                    <p>{dessert.name}</p>
                                    </button>
                                ))}
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", margin: "20px", gap: "20px" }}>
                                <button onClick={() => setPagina(2)} style={{ marginTop: "15px", color:"#ab1c1c", border: "1px solid #ab1c1c", padding: "10px", borderRadius: "8px"}}>
                                    Anterior
                                </button>
                                <button onClick={() => setPagina(4)} disabled={!hora} style={{ marginTop: "15px", color:"#ab1c1c", border: "1px solid #ab1c1c", padding: "10px", borderRadius: "8px"}}>
                                    Siguiente
                                </button>
                            </div>
                            </div>
                        )}

                        {/* Activity Selection */}
                        {pagina === 4 && (
                            <div>
                            <h2 style={{color: "#ab1c1c", margin: "10px"}}>Elige top 3 actividades</h2>
                            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
                                {activities.map((activity) => (
                                <button
                                    key={activity.name}
                                    onClick={() => toggleSelection(actividad, setActividad, activity.name)}
                                    style={{
                                    cursor: "pointer",
                                    padding: "10px",
                                    borderRadius: "8px",
                                    backgroundColor: actividad.includes(activity.name) ? "#ff69b4" : "#ffdede",
                                    color: actividad.includes(activity.name) ? "white" : "black",
                                    }}
                                    >
                                    <Image src={activity.img} alt={activity.name} width={100} height={100} />
                                    <p>{activity.name}</p>
                                    </button>
                                ))}
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", margin: "20px", gap: "20px" }}>
                                <button onClick={() => setPagina(3)} style={{ marginTop: "15px", color:"#ab1c1c", border: "1px solid #ab1c1c", padding: "10px", borderRadius: "8px"}}>
                                    Anterior
                                </button>
                                <button onClick={submitChoices} disabled={actividad.length === 0} style={{ marginTop: "15px", color:"#ab1c1c", border: "1px solid #ab1c1c", padding: "10px", borderRadius: "8px"}}>
                                    Confirmar ❤️
                                </button>
                            </div>
                            </div>
                        )}
                </div>
        </div>
    </div>
    );
}
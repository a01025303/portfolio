"use client";
import React from 'react';
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { Playfair_Display, Sacramento } from 'next/font/google';

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '700'], 
});

const sacramento = Sacramento({
    subsets: ['latin'],
    weight: ['400', '400'], 
});

const ValentinesPage: React.FC = () => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
    const router = useRouter();
    const [mouseCerca, setMouseCerca] = useState(false);
    const [dijoQueSi, setDijoQueSi] = useState(false);
    const [posicionBotonNo, setPosicionBotonNo] = useState({ x: 0, y: 0 });
    const [posicionBotonSi, setPosicionBotonSi] = useState({ x: -60, y: 0 });
    const [botonLibre, setBotonLibre] = useState(false);
    const movimientoMouse = (e: any) => {
        const boton = document.getElementById('boton-no');
        if (boton) {
            const botonRect = boton.getBoundingClientRect();
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            if (
                mouseX > botonRect.left - 15 &&
                mouseX < botonRect.right + 15 &&
                mouseY > botonRect.top -15 &&
                mouseY < botonRect.bottom + 15
            ) {
                setMouseCerca(true);
            } else {
                setMouseCerca(false);
            }
        }
    };

    const clicksi = () => {
        setDijoQueSi(true);
    };

    const clickPlan = () => {
        router.push('/ana/valentines/plan');
    }
    const posicionRandom = () => {
        const x = Math.random() * (window.innerWidth - 1000);
        const y = Math.random() * (window.innerHeight - 1000);
        return { x, y };
    }

    useEffect(() => {
        window.addEventListener('mousemove', movimientoMouse);
        return () => {
            window.removeEventListener('mousemove', movimientoMouse);
        };
    }, []);

    useEffect(() => {
        if (mouseCerca) {
            setPosicionBotonNo(posicionRandom());
            setBotonLibre(true);
        }
    }, [mouseCerca]);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundImage: `url(${basePath}/valentines2025.jpg)`,
                backgroundPosition: "center",
                flexDirection: "column",
                fontFamily: "Arial, sans-serif",
            }}
        >
            {/* Main box simulating a mini browser window */}
            <div
                style={{
                    position: "relative", // Makes child elements (header) position relative to this
                    backgroundColor: "#fef7fc",
                    height: "auto",
                    width: "40vw",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column"
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
                    {dijoQueSi ? (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <h2 className={playfair.className} style={{ color: "#ab1c1c" }}>¡Todavía no te vayas! ❤️</h2>
                            <Image
                                src={`${basePath}/wuwu.jpg`}
                                alt="corazon"
                                width={200}
                                height={200}
                                style={{ marginTop: "10px" }}
                            />
                            <button
                                onClick={clickPlan}
                                className={playfair.className}
                                style={{
                                    padding: "10px 20px",
                                    fontSize: "16px",
                                    backgroundColor: "#fe93c8",
                                    color: "white",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    marginTop: "20px",
                                }}
                            >
                                Continuar
                            </button>
                        </div>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}>
                            <p className={playfair.className} style={{color: "#ab1c1c"}}>Ana,</p>
                            <h1 className={playfair.className} style={{color: "#ab1c1c"}}>¿Quieres ser mi San Valentín?</h1>
                            <Image
                                src={botonLibre ? `${basePath}/andale.JPG`:`${basePath}/porfis.jpg`}
                                alt="porfiiis"
                                width={200}
                                height={200}
                                style={{ marginTop: "10px" }}
                            />
                            <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
                                <button
                                    onClick={clicksi}
                                    className={playfair.className}
                                    style={{
                                        padding: "10px 20px",
                                        fontSize: "16px",
                                        // backgroundColor: "#fe93c8",
                                        color: "#fe93c8",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        position: "relative",
                                        width: "80px",
                                        height: "50px",
                                        marginRight: botonLibre ? "120px" : "40px",
                                        border: "5px solid #fe93c8",
                                        // left: posicionBotonSi.x,
                                        // top: posicionBotonSi.y,
                                    }}
                                >
                                    Sí
                                </button>
    
                                {/* Animate the "No" button to disappear and reappear randomly */}
                                <motion.button
                                    id="boton-no"
                                    disabled
                                    className={playfair.className}
                                    onClick={() => alert("¡Nooo! 😢")}
                                    style={{
                                        position: botonLibre? "fixed": "relative",
                                        padding: "10px 20px",
                                        fontSize: "16px",
                                        backgroundColor: "#ff6666",
                                        color: "white",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        width: "80px",
                                        height: "50px",
                                        // ...(botonLibre ? {} : { left: 60 }),
                                    }}
                                    animate={{
                                        opacity: mouseCerca ? 0 : 1,
                                        x: posicionBotonNo.x,
                                        y: posicionBotonNo.y,
                                    }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    No
                                </motion.button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ValentinesPage;
"use client";
import JuegoMouse from "./components/principal";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function Page() {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
    const startGame = () => {
        setIsGameStarted(true);
    };

    const finishGame = () => {
        setIsGameFinished(true);
    };

    return (
        <div>
            {isGameStarted ? (
                <div>
                    <JuegoMouse />
                </div> 
                ) : (
                <div
                    style={{
                        position: 'relative',
                        width: '100vw',
                        height: '100vh',
                        backgroundImage: `url(${basePath}/sateliyork.png)`,//'url("/sateliyork.png")',
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        overflow: 'hidden',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'end',
                            alignContent: 'stretch',
                            height: '50%',
                        }}
                    >
                        <div className={styles.empty}></div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                                // background: 'rgba(0, 0, 0, 0.7)',
                            }}
                        >
                            <div 
                                style={{
                                    background: 'pink',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '85%',
                                    height: '70%',
                                    borderRadius: '10px',
                                    border: '5px solid white',
                                }}>
                                    <div style={{
                                        height: '100%',
                                        overflow: 'auto',
                                    }}>
                                        {/* <img src="/sateliyork.png" alt="sateliyork" style={{width: '100%'}} /> */}
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '50%',
                                        height: '100%',
                                    }}>
                                        <button 
                                            style={{
                                                borderRadius: '10px',
                                                border: '5px solid yellow',
                                                background: 'red',
                                                color: 'white',
                                                width: '100%',
                                                height: '35%',
                                            }}
                                            onClick={startGame}>Iniciar Juego</button>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'end',
                            alignContent: 'stretch',
                            height: '50%',
                        }}
                    >
                        <div className={styles.empty}></div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                                backgroundImage: `url(${basePath}/kiario.gif)`,//'url("/kiario.gif")',
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                // background: 'rgba(0, 0, 0, 0.7)',
                            }}
                        >
                            {/* <div 
                                style={{
                                    padding: '20px',
                                    // backgroundImage: 'url("/kiario.gif")',
                                }}>
                               
                            </div> */}
                        </div>
                    </div>
                    {/* <button onClick={startGame}>Start Game</button> */}
                </div>
                )
            }
        </div>
    );
};
import React, { useState, useEffect, use } from 'react';
import { act } from 'react-dom/test-utils';

interface Position {
    top: number;
    left: number;
}

interface Box {
    top: number;
    left: number;
    active: boolean;
}

interface Modal{
    padding: string;
}

interface ModalContent {
    message: string;
    mediaType?: 'image' | 'video' | 'audio' | 'text';
    mediaSource?: string;
}

const JuegoKeys: React.FC = () => {
    const [position, setPosition] = useState<Position>({ top: 50, left: 25 });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowUp':
                    setPosition((prev) => ({ ...prev, top: prev.top - 25 }));
                    break;
                case 'ArrowDown':
                    setPosition((prev) => ({ ...prev, top: prev.top + 25 }));
                    break;
                case 'ArrowLeft':
                    setPosition((prev) => ({ ...prev, left: prev.left - 25 }));
                    break;
                case 'ArrowRight':
                    setPosition((prev) => ({ ...prev, left: prev.left + 25 }));
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div
            style={{
                position: 'absolute',
                top: position.top,
                left: position.left,
                width: 50,
                height: 50,
                backgroundColor: 'red',
            }}
        />
    );
};

const JuegoMouse: React.FC = () => {
    // Inicialización de variables de estado
    // const [isGameStarted, setIsGameStarted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<ModalContent[]>([]);
    const [currentContentIndex, setCurrentContentIndex] = useState(0);

    // Inicialización de posición y velocidad
    const [position, setPosition] = useState<Position>({ top: 50, left: 50 });
    const [mousePosition, setMousePosition] = useState<Position>({ top: 50, left: 50 });
    const speed = 5; 

    // Inicialización de índice de caja actual
    const [currentBoxIndex, setCurrentBoxIndex] = useState(0);
    // Inicialización de posiciones de cajas
    const [boxesPositions, setBoxesPositions] = useState<Box[]>([
        { top: 50, left: 150, active: true},
        { top: 675, left: 250, active: false},
        { top: 100, left: 300, active: false},
        { top: 100, left: 400, active: false},
        { top: 100, left: 500, active: false},
        { top: 100, left: 600, active: false},
    ]);


    // Función para manejar el inicio del juego
    // const startGame = () => {
    //     setIsGameStarted(true);
    // };

    // Función para manejar que el personaje toque una caja
    const handleCollision = () => { 
        // Cambiar luego
        setIsModalOpen(true);
        setModalContent([{
            message: '¡Has tocado una caja!', mediaType: 'image', mediaSource: 'https://media.giphy.com/media/3o7TKz9bX9v9KzCnXa/giphy.gif'}]);
        setCurrentContentIndex(0);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent([]);
        if (currentBoxIndex < boxesPositions.length - 1) {
            boxesPositions[currentBoxIndex].active = false;
            boxesPositions[currentBoxIndex + 1].active = true;
            setCurrentBoxIndex(currentBoxIndex + 1);
        }
    };

    // Handle carousel content
    const handleNextContent = () => {
        if (currentContentIndex < modalContent.length - 1) {
            setCurrentContentIndex(currentContentIndex + 1);
        }
    };
    
    const handlePrevContent = () => {
        if (currentContentIndex > 0) {
            setCurrentContentIndex(currentContentIndex - 1);
        }
    };

    // Función para detectar colisión entre personaje y cajas
    const detectCollision = (character: Position, box: Position, size: number) => {
        return (
            character.top < box.top + size &&
            character.top + size > box.top &&
            character.left < box.left + size &&
            character.left + size > box.left
        );
    };

    // Función para manejar el movimiento del mouse
    const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ top: e.clientY, left: e.clientX });
    };

    // Función para mover el personaje
    const moveCharacter = () => {
        // Calcula la distancia entre la posición actual y la posición del mouse
        setPosition( (prev) => {
            const dx = mousePosition.left - prev.left;
            const dy = mousePosition.top - prev.top;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < speed) {
                return mousePosition;
            }

            const angle = Math.atan2(dy, dx);

            return {
                top: prev.top + Math.sin(angle) * speed,
                left: prev.left + Math.cos(angle) * speed,
            };
        });
    };

    useEffect(() => {
        boxesPositions.forEach((box) => {
            if (detectCollision(position, box, 50) && box.active) {
                handleCollision();
            }
        });
    }, [position]);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);

        const interval = setInterval(moveCharacter, 1000 / 80);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(interval);
        };
    }, [mousePosition]);

    return (
        <div>
            {/* {isGameStarted ? ( */}
                <div>
                    <div
                        style={{
                            position: 'absolute',
                            top: position.top,
                            left: position.left,
                            width: 50,
                            height: 50,
                            backgroundColor: 'red',
                        }}
                    />
                    {boxesPositions.map((box, index) => (
                        index === currentBoxIndex && (
                        <div
                            key={index}
                            style={{
                                position: 'absolute',
                                top: box.top,
                                left: box.left,
                                width: 50,
                                height: 50,
                                backgroundColor: 'blue',
                            }}
                        />
                    )
                    ))}
                    {isModalOpen && modalContent.length > 0 && (
                        <div
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: 'white',
                                    padding: 20,
                                    borderRadius: 10,
                                }}
                            >
                                <div style={{flex: 1, padding: 20}}>
                                    {modalContent[currentContentIndex].mediaType === 'image' && (
                                        <img src={modalContent[currentContentIndex].mediaSource} style={{ width: 200 }} />
                                    )}
                                    {modalContent[currentContentIndex].mediaType === 'video' && (
                                        <video src={modalContent[currentContentIndex].mediaSource} style={{ width: 200 }} controls />
                                    )}
                                    {modalContent[currentContentIndex].mediaType === 'audio' && (
                                        <audio src={modalContent[currentContentIndex].mediaSource} controls />
                                    )}
                                    {modalContent[currentContentIndex].mediaType === 'text' && (
                                        <p>{modalContent[currentContentIndex].message}</p>
                                    )}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p>{modalContent[currentContentIndex].message}</p>
                                    <div style={{ marginTop: 10, textAlign: 'center' }}>
                                        {currentContentIndex > 0 &&(
                                            <button onClick={handlePrevContent}>
                                                Previous
                                            </button>
                                        )}
                                        {currentContentIndex < modalContent.length - 1 && (
                                            <button onClick={handleNextContent}>
                                                Next
                                            </button>
                                        )}
                                    </div>
                                    <button onClick={closeModal} style={{ marginTop: 20 }}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            {/* ) : ( */}
                {/* <div>
                    <button onClick={startGame}>Start Game</button>
                </div>
            )} */}
        </div>
    //    <div
    //     style={{
    //         position: 'absolute',
    //         top: position.top,
    //         left: position.left,
    //         width: 50,
    //         height: 50,
    //         backgroundColor: 'red',
    //     }}
    //    >
    //    </div>
    );
};
export default JuegoMouse;
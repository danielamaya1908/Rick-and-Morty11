import styles from '../css/About.module.css';
export default function About() {
    return (
        <div className={styles.bigContainer}>
        <div className={styles.aboutCard}>
            <div className={styles.titulo}>
                ¡Bienvenido a la Página de Rick and Morty!
            </div>
            <div className={styles.textBottom}>
                Explora el emocionante universo de Rick and Morty, la popular serie de animación creada por Dan Harmon y Justin Roiland. Acompaña a Rick, el excéntrico científico, y a su nieto Morty en aventuras interdimensionales llenas de comedia y ciencia ficción. Descubre personajes peculiares, mundos extraños y humor irreverente en cada episodio.
            </div>
            <div className={styles.textBottom}>
                En nuestra página, encontrarás información detallada sobre los episodios, personajes, teorías de fans y mucho más. ¡Sumérgete en el caos cósmico y las locuras de Rick and Morty con nosotros!
            </div>
        </div>
    </div>
    
    )
}
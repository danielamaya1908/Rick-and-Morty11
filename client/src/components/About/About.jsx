import styles from "../../css/About.module.css";

export default function About() {
  return (
    <div className={styles.bigContainer}>
      <div
        className={styles.aboutCard}
        style={{ color: "#fff", textShadow: "0 2px 8px #232526, 0 1px 0 #000" }}
      >
        <div
          className={styles.titulo}
          style={{
            color: "#fff",
            textShadow: "0 2px 8px #232526, 0 1px 0 #000",
          }}
        >
          🚀 Bienvenido al Universo de{" "}
          <span className={styles.highlight}>Rick and Morty</span>
        </div>
        <div className={styles.textBottom}>
          Explora el <span className={styles.highlight}>multiverso</span> de la
          serie animada más irreverente y genial de la galaxia. Acompaña a{" "}
          <span className={styles.highlight}>Rick</span>, el científico más
          loco, y a su nieto <span className={styles.highlight}>Morty</span> en
          aventuras interdimensionales llenas de{" "}
          <span className={styles.highlight}>
            humor, ciencia ficción y caos cósmico
          </span>
          .
        </div>
        <div className={styles.textBottom}>
          En esta página puedes:
          <ul
            style={{
              textAlign: "left",
              margin: "16px auto",
              maxWidth: 480,
              fontSize: "1.08rem",
            }}
          >
            <li>🔍 Buscar y filtrar personajes de la serie</li>
            <li>❤️ Guardar tus favoritos y ver sus detalles</li>
            <li>🌌 Descubrir curiosidades y datos de cada personaje</li>
            <li>🧪 Disfrutar de una experiencia visual moderna y divertida</li>
          </ul>
        </div>
        <div className={styles.textBottom}>
          <span className={styles.highlight}>
            ¡Sumérgete en el caos, experimenta y diviértete!
          </span>{" "}
          <br />
          <span
            style={{
              fontSize: "1.1rem",
              color: "#fff",
              textShadow: "0 1px 0 #000",
            }}
          >
            Desarrollado por <b>Daniel Amaya</b> — 2023
          </span>
        </div>
      </div>
    </div>
  );
}

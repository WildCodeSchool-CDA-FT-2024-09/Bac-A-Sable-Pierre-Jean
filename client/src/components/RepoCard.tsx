import "./repoCard.css"
import { Link } from "react-router-dom";
import type { Repo } from "../types/RepoTypes";
export default function RepoCard({ name, url, id, langs, isFavorite }: Repo) {
  return (
    <>
      <section className="repoCard">
        <h2 className="repoTitle">{name}</h2>
        <a href={url} target="_blank">
          {url}
        </a>{" "}
        <ul>
          {langs.map((lang) => (
            <li key={lang.id}>{lang.label}</li>
          ))}{" "}
        </ul>
        <Link to={`/detail/${id}`}>Plus d'infos</Link>
        <p>{isFavorite ? "Favory :❤️‍🔥" : "Non Favory 🩶"}</p>
      </section>
    </>
  );
}

import './ArticleComponent.css'

export default function ArticleComponent({article}) {
    return (
        <div className="article">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
                <h2>{article.title}</h2>
            </a>
        </div>
    )
}
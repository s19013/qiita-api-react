import './ArticleComponent.css'

export default function ArticleComponent({article}) {
    return (
        <div className="article">
            <a href={article.url}>
                <h2>{article.title}</h2>
            </a>
        </div>
    )
}
import './App.css';
import axios from 'axios';
import { useState,useEffect } from 'react';
import ArticleComponent from './Components/ArticleComponent';
import InputComponent from './Components/InputComponent';
import SelectorComponent from './Components/SelectorComponent';

function App() {
    const [articles,setArticles] = useState([])

    /** 検索窓の文字 */
    const [keyword,setKeyword] = useState("")

    /** 検索表示数 */
    const [per_page,setPerPage] = useState(10)

    const [inputHistory,setInputHistory] = useState({
        page:1,
        per_page:10,
        keyword:null
    })

    /** 記事取ってくる */
    const getArticle = async({page,per_page,keyword}) => {
        await axios.get('https://qiita.com/api/v2/items',{
            params:{
                page:page,
                per_page:per_page,
                query:keyword
            }
        })
        .then((res) => { setArticles(res.data) })
        .catch((err) => { console.log(err); })
    }

    // 記事を表示する用の変数
    const articleList = articles.map((article,index) => {
        return (
            <ArticleComponent article={article} key={index}/>
        )
    })

    /** 検索 */
    const search = () => {
        getArticle({
            page:1,
            per_page:per_page,
            keyword:keyword
        })
    }

    useEffect(() => {
        
    },[])

  return (
    <div className="App">
        <InputComponent 
            text={keyword}
            setKeyword={setKeyword}
        />
        <button onClick={() => {search()}}>push</button>
        <SelectorComponent 
            options={[5,10,15,20,25,30]}
            per_page={per_page}
            setPerPage={setPerPage}
        />
        {articleList}
    </div>
  );
}

export default App;

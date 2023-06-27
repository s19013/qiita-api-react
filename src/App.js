import './App.css';
import axios from 'axios';
import { useState,useEffect } from 'react';
import ArticleComponent from './Components/ArticleComponent';
import InputComponent from './Components/InputComponent';
import SelectorComponent from './Components/SelectorComponent';
import PaginationComponent from './Components/PaginationComponent';

function App() {
    /** 記事 */
    const [articles,setArticles] = useState([])

    /** 読み込み中の文字 */
    const [loading,setLoading] = useState("")

    /** 検索窓の文字 */
    const [keyword,setKeyword] = useState(null)

    /** 検索表示数 */
    const [per_page,setPerPage] = useState(10)

    /** 何ページ目か */
    const [page,setPage] = useState(1)

    /** 入力記録 ページめくりで使う */
    const [inputHistory,setInputHistory] = useState({
        page:page,
        per_page:per_page,
        keyword:keyword
    })



    /** 記事取ってくる */
    const getArticle = async({page,per_page,keyword}) => {
        // 読み込み中の文字表示
        setLoading(<p>読み込み中</p>)

        await axios.get('https://qiita.com/api/v2/items',{
            params:{
                page:page,
                per_page:per_page,
                query:keyword
            }
        })
        .then((res) => {
            setArticles(res.data) 
            // 検索した情報を保管
            setInputHistory({
                page:page,
                per_page:per_page,
                keyword:keyword
            })
        })
        .catch((err) => { console.log(err); })

        // 読み込み中の文字削除
        setLoading("")
    }

    // 記事を表示する用の変数
    const articleList = articles.map((article,index) => {
        return ( <ArticleComponent article={article} key={index}/> )
    })

    /** 検索 */
    const search = () => {
        // 空文字だったらnullにする必要がある じゃないと何も取ってこない
        if (keyword == "") { setKeyword(null) }
        getArticle({
            page:1,
            per_page:per_page,
            keyword:keyword
        })

        // pageをリセット
        setPage(1)
    }

    /** ページめくり */
    const turnPage = (page) => {
        setPage(page)
        getArticle({
            page:page,
            per_page:inputHistory.per_page,
            keyword:inputHistory.keyword
        })
    }

    // このwebページを最初に読み込んだ時の動き
    // vueでいうmounted
    useEffect(() => {
        getArticle({
            page:inputHistory.page,
            per_page:inputHistory.per_page,
            keyword:inputHistory.keyword
        })
    },[])

  return (
    <div className="App">
        <InputComponent 
            text={inputHistory.keyword}
            setKeyword={setKeyword}
        />
        <button onClick={() => {search()}}>push</button>
        <SelectorComponent 
            options={[5,10,15,20,25,30]}
            per_page={inputHistory.per_page}
            setPerPage={setPerPage}
        />

        {loading}

        {articleList}
        <PaginationComponent
            selected={inputHistory.page}
            pageCount={100}
            turnPage={turnPage}
        />
    </div>
  );
}

export default App;

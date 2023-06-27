export default function ArticleComponent({keyword,setKeyword}) {

    /** 入力するたびに親コンポーネントの`keyword`に代入 */
    const handleChange = (e) => {setKeyword(e.target.value)}

    return (
        <div className='input'>
            <input
                type="text"
                value={keyword}
                onChange={handleChange}
            />
        </div>
    )
}
export default function SelectorComponent({options,per_page,setPerPage}) {
    /** 入力するたびに親コンポーネントの`per_page`に代入 */
    const handleChange = (e) => {
        // e.target.valueでoptionのvalueを受けるもよう
        setPerPage(e.target.value)
    }


    /** オプションを表示 */
    const renderOptions = options.map((option,index) => {
        return (<option value={option} key={index}>{option}</option>)
    })

    return (
        <div className="selector">
            <select value={per_page} onChange={handleChange}>
                {renderOptions}
            </select>
        </div>
    )
}
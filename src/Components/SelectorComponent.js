export default function SelectorComponent({options,per_page,setPerPage}) {
    /** 入力するたびに親コンポーネントの`per_page`に代入 */
    const handleChange = (e) => {
        setPerPage(e.target.value)

        // e.target.valueはお決まりみたいなものなのかな?
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
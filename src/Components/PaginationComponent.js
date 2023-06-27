import { useState,useEffect } from 'react';

export default function PaginationComponent({selected,pageCount,turnPage}) {

    /** selectedに変化があったら動かす */
    useEffect(() => {
        /** 5以下の時の処理 */
        if (selected <= 5) {rebuildingDisplayNumber(1,9)}
        else {rebuildingDisplayNumber(selected - 4,selected + 4)}
      }, [selected])

    const [pages,setPages] = useState([1,2,3,4,5,6,7,8,9])

    /** 画面の一番したに表示するやつ */
    const displayPages = pages.map((page,index) => {
        return (
            <li key={index}>
                <button
                    className={page === selected ? 'selected': ''}
                    disabled={page === selected}
                    onClick={() =>{turnPage(page)}}
                >
                    { page }
                </button>
            </li>
        )
    })

    // value={page} にすればe.target.valueで受け取れる
    // turnPageってそのまま書くと表示されるのと同時に1度関数が動いてしまうもよう

    const rebuildingDisplayNumber = (min,max) => {
        const temp = []
        for (let index = min; index <= max; index++) { temp.push(index) }
        setPages(temp)
    }



    return (
        <div className="pagination">
            <p>{selected}</p>
            <p>{pageCount}</p>
            <ul>
                {displayPages}
            </ul>
        </div>
    )
}
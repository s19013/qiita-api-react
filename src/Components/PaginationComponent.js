import { useState,useEffect } from 'react';
import './PageinationComponent.css'

export default function PaginationComponent({selected,pageCount,turnPage}) {

    // vueでいうwatch
    /** selectedに変化があったら動かす */
    useEffect(() => {
        /** 5以下の時の処理 */
        if (selected <= 5) {rebuildingDisplayNumber(1,9)}
        else {rebuildingDisplayNumber(selected - 4,selected + 4)}
      }, [selected])


    // 一番下に表示するやつの原型
    const [pages,setPages] = useState([])

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
    // turnPage(page)ってそのまま書くと表示されるのと同時に1度関数が動いてしまうもよう
    // 加えて無限ループぽい動きを見せた

    const rebuildingDisplayNumber = (min,max) => {
        const temp = []
        for (let index = min; index <= max; index++) { temp.push(index) }
        setPages(temp)
    }



    return (
        <div className="pagination">
            <ul>
                {displayPages}
            </ul>
        </div>
    )
}
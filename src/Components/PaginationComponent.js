import { useState,useEffect } from 'react';
import './PageinationComponent.css'

export default function PaginationComponent({selected,pageCount,turnPage}) {

    // vueでいうwatchとmounted
    /** selectedに変化があったら動かす */
    useEffect(() => {
        /** 5以下の時の処理 */
        if (selected <= 5) {rebuildingDisplayPages(1,9)}
        /** pageCountに近い時も特殊 */
        else if (selected > pageCount - 5) {rebuildingDisplayPages(pageCount - 8,pageCount)}
        else {rebuildingDisplayPages(selected - 4,selected + 4)}
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

    /** @func displayPagesを作り直す
     *  @param min 表示上の最小値
     *  @param max 表示上の最大値
    */
    const rebuildingDisplayPages = (min,max) => {
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
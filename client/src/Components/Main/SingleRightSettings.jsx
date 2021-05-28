import axios from 'axios';
import SingleRightPopup from './SingleRightPopup';

function SingleRightSettings(props) {
    // let [list, setList] = useState([])
    let arr = props.right.list;

    let popup = (e) => {
        if (e.target.className == 'button') e.target.parentNode.nextElementSibling.classList.add('overlay_target')
        if (e.target.classList[0] == 'overlay' || e.target.className == 'close') e.target.closest('.overlay').classList.toggle('overlay_target')
    }
    let createList = (e, name) => {
        if (arr.some(item => item === name)) {
            arr.splice(arr.indexOf(name), 1)
            // setList(list.splice(list.indexOf(name),1))
            e.target.style.backgroundColor = ''
            // e.target.classList.toggle('.chosen_item')
        } else {
            arr.push(name)
            // setList([...list,name])
            // e.target.classList.toggle('.chosen_item')
            e.target.style.backgroundColor = 'blueviolet'
        }
        console.log(arr)
    }
    let sendList = (rightId, whitelisted) => {
        if (!props.right.prevelegion) {
            debugger
            axios.put('http://localhost:8001/right/update/' + rightId, { list: arr, prevelegion: true, whitelisted })
        } else {
            axios.put('http://localhost:8001/right/update/' + rightId, { list: arr })
        }
    }
    return <li className='right_item'>
        <div>{props.title}</div>
        {!props.right.prevelegion
            ? <SingleRightPopup {...props}
                WLtitle='Назначить пользователей'
                BLtitle='Запретить пользователей' />
            : props.right.whitelisted
                ? <SingleRightPopup {...props}
                    WLtitle='Именить белый список'
                    BLtitle='Назначить черный список' />

                : <SingleRightPopup {...props}
                    WLtitle='Назначить белый список'
                    BLtitle='Изменить черный список' />
        }
    </li>
}

export default SingleRightSettings;
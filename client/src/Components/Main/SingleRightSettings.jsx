import axios from 'axios';

function SingleRightSettings(props) {
    // let [list, setList] = useState([])
    let arr=[]

    let popup = (e) => {
        if (e.target.className == 'button') e.target.parentNode.nextElementSibling.classList.add('overlay_target')
        if (e.target.classList[0] == 'overlay' || e.target.className == 'close') e.target.closest('.overlay').classList.toggle('overlay_target')
    }
    let createList=(e,name)=>{
        if(arr.some(item=>item===name)){
            arr.splice(arr.indexOf(name),1)
            // setList(list.splice(list.indexOf(name),1))
            e.target.style.backgroundColor=''
            // e.target.classList.toggle('.chosen_item')
        }else{
            arr.push(name)
            // setList([...list,name])
            // e.target.classList.toggle('.chosen_item')
            e.target.style.backgroundColor='blueviolet'
        }
        console.log(arr)
    }
    let sendList=(rightId,whitelisted)=>{
        if(!props.right.prevelegion){
            debugger
            axios.put('http://localhost:8001/right/update/'+rightId,{list:arr,prevelegion:true,whitelisted})
        }else{
            axios.put('http://localhost:8001/right/update/'+rightId,{list:arr})
        }
    }
    return <li className='right_item'>
        <div>{props.title}</div>
        {!props.right.prevelegion
            ? <div>
                <div className='whitelist'>
                    <div className='popup_wrapper' onClick={(e) => { popup(e) }}>
                        <div class="box">
                            <a class="button">Назначить пользователей</a>
                        </div>

                        <div class="overlay" >
                            <div class="popup">
                                <h2>Назначить пользователей</h2>
                                <a class="close">&times;</a>
                                <div class="content">
                                    <ul className='user_list'>
                                        {props.group.partners.map(item =>
                                            <li onClick={(e)=>{createList(e,item.name)}}
                                            className='user_item'>
                                                {item}
                                            </li>)}
                                    </ul>
                                    <button onClick={()=>{
                                        sendList(props.right._id,true)
                                        }}>ОК</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='blacklist'>
                    <div className='popup_wrapper' onClick={(e) => { popup(e) }}>
                        <div class="box">
                            <a class="button">Запретить пользователей</a>
                        </div>

                        <div class="overlay" >
                            <div class="popup">
                                <h2>Запретить пользователей</h2>
                                <a class="close">&times;</a>
                                <div class="content">
                                    <ul>
                                        {props.group.partners.map(item => <li>{item}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            : props.right.whitelisted
                ? <div>
                    <div className='whitelist'>
                        <div className='popup_wrapper' onClick={(e) => { popup(e) }}>
                            <div class="box">
                                <a class="button">Именить белый список</a>
                            </div>

                            <div class="overlay" >
                                <div class="popup">
                                    <h2>Белый список</h2>
                                    <a class="close">&times;</a>
                                    <div class="content">
                                        <ul>
                                            {props.group.partners.map(item => <li>{item}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='blacklist'>
                        <div className='popup_wrapper' onClick={(e) => { popup(e) }}>
                            <div class="box">
                                <a class="button">Назначить черный список</a>
                            </div>

                            <div class="overlay" >
                                <div class="popup">
                                    <h2>Черный список</h2>
                                    <a class="close">&times;</a>
                                    <div class="content">
                                        <ul>
                                            {props.group.partners.map(item => <li>{item}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <div>
                    <div className='whitelist'>
                        <div className='popup_wrapper' onClick={(e) => { popup(e) }}>
                            <div class="box">
                                <a class="button">Изменить черный список</a>
                            </div>

                            <div class="overlay" >
                                <div class="popup">
                                    <h2>Черный список</h2>
                                    <a class="close">&times;</a>
                                    <div class="content">
                                        <ul>
                                            {props.group.partners.map(item => <li>{item}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='blacklist'>
                        <div className='popup_wrapper' onClick={(e) => { popup(e) }}>
                            <div class="box">
                                <a class="button">Назначить белый список</a>
                            </div>

                            <div class="overlay" >
                                <div class="popup">
                                    <h2>Белый список</h2>
                                    <a class="close">&times;</a>
                                    <div class="content">
                                        <ul>
                                            {props.group.partners.map(item => <li>{item}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
    </li>
}

export default SingleRightSettings;
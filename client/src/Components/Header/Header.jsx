import s from './Header.module.css';
import { logout } from '../../redux/authReduser'
import { connect } from 'react-redux';

function Header(props) {
    
    return <div className='clearfix'>
        <header className={s.header}>
            <div className={s.header__logo}>
                {props.name}
            </div>
            <div className={s.header__main}>
                <span onClick={()=>{props.logout()}}>Выйти</span>
            </div>
        </header>
    </div>
}

let mapStateToProps = (state) => {
    return {
      name: state.auth.name
    }
  }
  
  export default connect(mapStateToProps, { logout})(Header);
import propTypes from 'prop-types'
import MainAppbar from '../components/MainAppbar';



const Layout = ({ children }) => {
    return (
        <div>
            <MainAppbar />
            {children}
        </div>
    );
}

export default Layout;


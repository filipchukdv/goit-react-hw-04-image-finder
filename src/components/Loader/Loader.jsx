import { MagnifyingGlass } from 'react-loader-spinner';
import PropTypes from 'prop-types';

const Loader = ({ isLoading }) => (
  <MagnifyingGlass
    visible={isLoading}
    height="120"
    width="120"
    ariaLabel="MagnifyingGlass-loading"
    wrapperStyle={{
      margin: '0',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
    wrapperClass="MagnifyingGlass-wrapper"
    glassColor="#c0efff"
    color="#e15b64"
  />
);

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loader;

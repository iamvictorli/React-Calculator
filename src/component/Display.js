import React from 'react';
import PropTypes from 'prop-types';

class Display extends React.Component {
    render() {
        return(
            <div>
                {this.props.value}
            </div>
        );
    }
}

Display.propTypes = {
    value: PropTypes.string.isRequired
}
export default Display;

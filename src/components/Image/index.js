import { Fragment} from 'react';
import PropTypes from 'prop-types';

const Image = ({url, title = ''}) => (
    <Fragment>
        <img src={url} alt={title} />
        {!!title && <span className="cd-image-label" data-type="modified">{title}</span>}
    </Fragment>
);

Image.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string
}

Image.defaultProps = {
    title: ''
}

export default Image;
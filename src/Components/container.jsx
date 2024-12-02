import PropTypes from 'prop-types'; // Ensure PropTypes is imported

const Container = ({ children }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {children}
    </div>
  );
};

// Add PropTypes validation for the Container component
Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;

import PropTypes from "prop-types"; // Import the prop-types package

const DashboardCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className={`p-4 rounded shadow ${color} text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-2xl">{value}</p>
        </div>
        <div className="text-4xl">
          {Icon && <Icon />}
        </div>
      </div>
    </div>
  );
};

// Define prop-types to validate the props
DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired, // Ensure 'icon' is a React component
  color: PropTypes.string.isRequired,
};

export default DashboardCard;

import { FontAwesome } from "@expo/vector-icons";

const Stars = ({ rating }) => {
  const tabStars = [];

  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      tabStars.push(
        <FontAwesome key={i} name="star" size={24} color="#FFB100" />
      );
    } else {
      tabStars.push(<FontAwesome key={i} name="star" size={24} color="grey" />);
    }
  }

  return tabStars;
};
export default Stars;

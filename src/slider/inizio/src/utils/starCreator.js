import { TiStarFullOutline,TiStarHalfOutline,TiStarOutline} from "react-icons/ti";
const starCreator = (num) => {
    return Array.from({ length: 5 }, (_, index) => {
    if (num >= index + 1) {
        return <TiStarFullOutline key={index} className="star" fill="#fca903" />;
    } else if (num >= index + 0.5) {
        return <TiStarHalfOutline key={index} className="star" fill="#fca903" />;
    } else {
        return <TiStarOutline key={index} className="star" fill="#fca903" />;
    }
});
};
export default starCreator;

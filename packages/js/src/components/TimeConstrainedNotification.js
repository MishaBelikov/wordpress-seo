import PropTypes from "prop-types";
import { select } from "@wordpress/data";
import PersistentDismissableNotification from "../containers/PersistentDismissableNotification";

/**
 * Checks if there are any warnings.
 *
 * @returns {boolean} Whether there are any warnings.
 */
const areThereAnyWarnings = () => {
	const warningsFree = select( "yoast-seo/editor" ).getWarningMessage();
	const warningsPremium = select( "yoast-seo-premium/editor" )?.getMetaboxWarning() ?? [];

	return warningsPremium.length > 0 || warningsFree.length > 0;
};

/**
 * @param {string}      store The Redux store identifier from which to determine dismissed state.
 * @param {JSX.Element} image The image or null if no image.
 * @param {string}      title The title of the notification.
 * @param {string}      promoId The promotion id.
 * @param {string}      alertKey The unique id for the alert.
 * @param {JSX.node}    children The content of the notification.
 *
 * @returns {JSX.Element} The TimeConstrainedNotification component.
 */
export const TimeConstrainedNotification = ( {
	store = "yoast-seo/editor",
	image: Image = null,
	title,
	promoId,
	alertKey,
	children,
	...props
} ) => {
	const promotionActive = select( store ).isPromotionActive( promoId );


	return (
		! areThereAnyWarnings() && promotionActive && <PersistentDismissableNotification
			alertKey={ alertKey }
			store={ store }
			id={ alertKey }
			title={ title }
			image={ Image }
			{ ...props }
		>
			{ children }
		</PersistentDismissableNotification>
	);
};

TimeConstrainedNotification.propTypes = {
	store: PropTypes.string,
	image: PropTypes.elementType,
	title: PropTypes.string.isRequired,
	promoId: PropTypes.string.isRequired,
	alertKey: PropTypes.string.isRequired,
	children: PropTypes.node,
};

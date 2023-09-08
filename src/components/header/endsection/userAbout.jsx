import {FaDesktop} from "react-icons/fa"
import {BiEnvelope, BiUser} from "react-icons/bi"
import Usertab from "../navigation/Usertab.jsx";
import {useState} from "react";

export const UserAbout = () => {
	const [opentab, setOpentab] = useState(false)
	
	return (
		<div className="user-block">
			<div className="desktop-icon">
				<FaDesktop/>
			</div>
			<div className="envelope-icon">
				<BiEnvelope/>
			</div>
			<div className="user-icon">
				<BiUser onClick={() => setOpentab(!opentab)}/>
				{opentab && <Usertab/>}
			</div>
		
		</div>
	)
}

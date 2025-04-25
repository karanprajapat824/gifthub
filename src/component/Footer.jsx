import './../css/Footer.css';
import { FaInstagram } from "react-icons/fa";
import { SlSocialFacebook } from "react-icons/sl";
import { TiSocialTwitter } from "react-icons/ti";
import { TiSocialYoutube } from "react-icons/ti";
import { SlSocialLinkedin } from "react-icons/sl";
import { IoMdContact } from "react-icons/io";

function Footer()
{
    return(
        <div className='footer'>
            <div className='footer-col'>
                <div className='footer-heading'>Company</div>
                <div className='footer-details'>
                    <div className='footer-detail'>Terms & Condition</div>
                    <div className='footer-detail'>privacy policy</div>
                    <div className='footer-detail'>about us</div>
                    <div className='footer-detail'>cookie policy</div>
                    <div className='footer-detail'>reviews</div>
                </div>
                <div className='footer-contact'><h3>
                    <div className='contact-logo'><IoMdContact /></div>
                    CONTACTS</h3>
                <div className='number'> +8877578677<br/>
                +9789766787</div>
                </div>
            </div>
            <div className='footer-col'>
            <div className='footer-heading'>Customer</div>
                <div className='footer-details'>
                    <div className='footer-detail'>Log-in</div>
                    <div className='footer-detail'>register</div>
                    <div className='footer-detail'>contact us</div>
                    <div className='footer-detail'>support hub</div>
                    <div className='footer-detail'>prefrence</div>
                </div>
            </div>
            <div className='footer-col'>
                <div className='footer-heading'>Social</div>
                <div className='footer-details'>
                    <div className='footer-detail'>Facebook</div>
                    <div className='footer-detail'>Instagram</div>
                    <div className='footer-detail'>Twitter</div>
                    <div className='footer-detail'>LinkedIn</div>
                    <div className='footer-detail'>YouTube</div>
                </div>
            </div>
            <div className='footer-col'>
            <div className='footer-heading'>Shipping-service</div>
                <div className='footer-details'>
                    <div className='footer-detail'>ship a package</div>
                    <div className='footer-detail'>Track a package</div>
                    <div className='footer-detail'>international shipping</div>
                    <div className='footer-detail'>delivery-services</div>
                </div>
                <div className='footer-logo'>
                <FaInstagram />
                <SlSocialFacebook />
                <TiSocialTwitter />
                <TiSocialYoutube />
                <SlSocialLinkedin />
                </div>
            </div>
        </div>

    )
}

export default Footer;
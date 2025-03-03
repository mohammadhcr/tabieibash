import styles from '../styles/Footer.module.scss';

const Footer = () => {

    const {copyright, footer} = styles;

    return (
        <>
            <footer className={footer}>
                <div className={copyright}>
                    <span>
                        <p>
                            © تمامی حقوق برای وب‌سایت «طبیعی باش» محفوظ است.
                        </p>
                    </span>
                    <span>
                        <p>Created by: <a href='https://github.com/mohammadhcr' target='_blank' rel="noopener noreferrer">Mohammad hcr</a></p>
                    </span>
                </div>
            </footer>
        </>
    );
};

export default Footer;
import "./WelcomeBanner.css";

const WelcomeBanner = () => {

    return(

        <div className="welcome-banner">

            <div>

                <h2>
                    👋 Welcome Back
                </h2>

                <p>

                    Monitor bugs, AI predictions,
                    team assignments and analytics
                    from one place.

                </p>

            </div>

            <button>

                + Report New Bug

            </button>

        </div>

    );

};

export default WelcomeBanner;
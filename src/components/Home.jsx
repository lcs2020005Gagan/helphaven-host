import logo from "../assets/logo.png";
import down from "../assets/down-icon.png";
import landingimg from "../assets/landing-background.jpg";
import LandingCards from "./LandingCards";
import Login from "./Login";
import React from "react";
import Interactive from "./Interactive";
import Doughnut from "./Doughnut";
import Area from "./Area";
import { Zoom, Slide, JackInTheBox, Bounce, Fade } from "react-awesome-reveal";
import {BsInstagram,BsFillTelephoneFill,BsTwitter} from 'react-icons/bs'
import {AiOutlineMail,AiOutlineCopyrightCircle} from 'react-icons/ai'
import { useNavigate } from "react-router-dom";



const Home = () => {
  const navigate=useNavigate()
  return (
    <>
      <div>
        <Interactive />
        <div className="landing-container">
          <div className="landing-text">
            <h1>HelpHaven</h1>
            <img className="logo" src={logo} alt="logo" />
            <p>
              Donate a little, help a lot,
              <br />
              Let's make kindness a daily thought !
            </p>
            <div className="landing-btns">
             

              <button> <a href="/" style={{"color":"white"}}>Go to home page</a></button>
              <Login/>
            </div>
          </div>
          <div className="landing-img">
            <img
              src="https://cdn.pixabay.com/photo/2015/03/30/14/36/hands-699486_960_720.jpg"
              alt=""
            />
          </div>
        </div>
        <Slide>
          <div className="our-mission">
            <h3 className="our-mission-heading">Our Mission</h3>
            <div className="mission-content">
              <div className="mission-img">
                <img
                  src="https://cdn.pixabay.com/photo/2020/05/24/23/44/hands-5216585_960_720.jpg"
                  alt=""
                />
              </div>
              <div className="our-mission-content">
                At HelpHaven, our mission is to provide assistance and support
                to those in need. We believe that everyone deserves access to
                resources and help, regardless of their background or
                circumstances. We strive to create a community where individuals
                can come together to find solutions to their problems and
                receive the help they need. Our goal is to make a positive
                impact on people's lives by offering guidance, advice, and
                support in a non-judgmental and compassionate manner. We believe
                that everyone deserves a helping hand, and we are committed to
                making a difference in the lives of those who seek our
                assistance. Join us in our mission to make the world a better
                place, one person at a time. Let's work together to create a
                community where everyone feels supported and empowered to
                overcome their obstacles and achieve their goals.
              </div>
            </div>
          </div>
        </Slide>
        {/* <div className="landing-blocks">
          <LandingCards />
        </div>
        <div className="demographics">
          <h2>Our Demographics</h2>
        </div> */}

        <Slide direction="right">
          <div className="doughnut-graph">
            <div className="doughnut">
              <Doughnut />
            </div>
            <div className="doughnut-content">
              <h2>Amount we recieved till now</h2>
              People's donations can help us earn revenue in several ways.
              Firstly, donations can directly fund our programs and initiatives,
              allowing us to carry out our mission and achieve our goals.
              Secondly, donations can help us attract additional funding from
              governments, corporations, and other organizations, as they see
              the support and impact we have within the community. Thirdly,
              donations can help us build a strong and engaged community of
              supporters, which can lead to greater awareness and exposure for
              our organization. Additionally, donations can help us expand our
              reach and impact, allowing us to serve more people and make a
              greater difference in the world. Overall, people's donations are
              critical to our success and enable us to continue making a
              positive impact in the world
            </div>
          </div>
        </Slide>
        <Slide>
          <div className="area-graph">
            <div className="area">
              <Area />
            </div>
            <div className="area-content">
              <h2>Monthly donations of last year</h2>
              Last year, our organization received monthly contributions from
              our supporters that helped us make a significant impact in the
              community. These regular donations allowed us to plan ahead and
              make long-term investments in our programs and initiatives. By
              receiving contributions on a monthly basis, we were able to better
              manage our resources and ensure that we had the necessary funds to
              carry out our mission. Furthermore, monthly contributions helped
              us build a strong and sustainable donor base, which is essential
              for the long-term success of our organization. We are grateful for
              the ongoing support of our donors and their commitment to making a
              positive difference in the world.
            </div>
          </div>
        </Slide>
      </div>
      <div className="home-footer">
        <div className="home-footer-left">
          <div className="footer-logo">
          <img src={logo} alt="" />
          </div>
         
        </div>
        <div className="home-footer-right">
          <ul className="footer-ul">
            <li >
              Contact Us
            </li>
            <li>
              About
            </li>
            <li>
              Sponsor
            </li>
            <li>
              Feedback
            </li>
          </ul>
          <div className="footer-icons">
            <BsInstagram/>
            <AiOutlineMail/>
            <BsFillTelephoneFill/>
            <BsTwitter/>
          </div>
          <div className="copyright">
            <AiOutlineCopyrightCircle /> 
            <p className="copyright-text">Copyright HelpHaven</p> 
          </div>
        </div>
       
      </div>
    </>
  );
};

export default Home;

import doctor from "../assets/doctor.jpg";
import shelter from "../assets/shelter.jpg";
import education from "../assets/education.jpg";
import food from "../assets/food.jpg";
import animal from "../assets/animal.jpg";
import clothes from "../assets/clothes.jpg";
import React from "react";
import Interactive from "./Interactive";

const cardClick = (e) => {
  if (e.target != e.currentTarget) return;
  const el = document.getElementById("card-popup");
  console.log(el);
  el.classList.toggle("display");
};
const closeClick = () => {
  const el = document.getElementById("card-popup");
  console.log(el);
  el.classList.toggle("display");
};

const cardClick1 = (e) => {
  if (e.target != e.currentTarget) return;
  const el = document.getElementById("card-popup1");
  console.log(el);
  el.classList.toggle("display");
};
const closeClick1 = () => {
  const el = document.getElementById("card-popup1");
  console.log(el);
  el.classList.toggle("display");
};

const cardClick2 = (e) => {
  if (e.target != e.currentTarget) return;
  const el = document.getElementById("card-popup2");
  console.log(el);
  el.classList.toggle("display");
};
const closeClick2 = () => {
  const el = document.getElementById("card-popup2");
  console.log(el);
  el.classList.toggle("display");
};

const cardClick3 = (e) => {
  if (e.target != e.currentTarget) return;
  const el = document.getElementById("card-popup3");
  console.log(el);
  el.classList.toggle("display");
};
const closeClick3 = () => {
  const el = document.getElementById("card-popup3");
  console.log(el);
  el.classList.toggle("display");
};

const cardClick4 = (e) => {
  if (e.target != e.currentTarget) return;
  const el = document.getElementById("card-popup4");
  console.log(el);
  el.classList.toggle("display");
};
const closeClick4 = () => {
  const el = document.getElementById("card-popup4");
  console.log(el);
  el.classList.toggle("display");
};

const cardClick5 = (e) => {
  if (e.target != e.currentTarget) return;
  const el = document.getElementById("card-popup5");
  console.log(el);
  el.classList.toggle("display");
};
const closeClick5 = () => {
  const el = document.getElementById("card-popup5");
  console.log(el);
  el.classList.toggle("display");
};

const LandingCards = () => {
  return (
    <>
      <div style={{ position: "relative" }}>
        <h1 className="landing-block-heading">Our Domains</h1>
        <div className="landing-cards">
          <div className="card">
            <div className="card-title">Health</div>
            <img src={doctor} alt="doctor" />
            <span className="card-desc" onClick={cardClick}>
              Facilitating medical help through the donations.
            </span>
            <div className="card-detail polka-dot" id="card-popup">
              <span className="x" onClick={closeClick}>
                X
              </span>
              <div className="card-image-1">
                <img
                  src="https://cdn.pixabay.com/photo/2016/11/14/03/05/surgery-1822458__340.jpg"
                  alt=""
                />
              </div>
              <div className="card-content">
                <h2>Health Support</h2>
                By donating to a health charity, you can make a meaningful
                difference in the lives of those affected by illness or disease.
                Your contribution can help to fund vital medical research,
                provide access to healthcare services, and support those in
                need. Every donation, no matter how small, can have a
                significant impact and bring us one step closer to a healthier
                world. So, consider donating to a health charity today and be a
                part of the solution in improving the health and well-being of
                individuals and communities.
              </div>
              <div className="card-image-2">
                <img
                  src="https://cdn.pixabay.com/photo/2013/03/09/04/43/medicine-91754__340.jpg"
                  alt=""
                />
              </div>
              <div className="card-image-3">
                <img
                  src="https://cdn.pixabay.com/photo/2020/09/25/13/49/blood-test-5601437__340.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-title">Shelter</div>
            <img src={shelter} alt="doctor" />
            <span className="card-desc" onClick={cardClick1}>
              Providing the needy people a shelter to live.
            </span>

            <div className="card-detail polka-dot" id="card-popup1">
              <span className="x" onClick={closeClick1}>
                X
              </span>
              <div className="card-image-1">
                <img
                  src="https://cdn.pixabay.com/photo/2016/07/29/06/13/people-1550504__340.jpg"
                  alt=""
                />
              </div>
              <div className="card-content">
                <h2>Shelter Arrangements</h2>
                Donating to shelter charities can have a profound impact on the
                lives of those in need. By providing shelter and support, these
                organizations help individuals and families rebuild their lives
                and escape homelessness. Your donation can provide crucial
                resources like food, clothing, and medical care, as well as the
                emotional support necessary for long-term success. With your
                help, we can make a real difference in the lives of those who
                are struggling, and create a brighter future for everyone.
                Please consider donating to a shelter charity today.
              </div>
              <div className="card-image-2">
                <img
                  src="https://cdn.pixabay.com/photo/2014/09/11/09/55/housing-441546__340.jpg"
                  alt=""
                />
              </div>
              <div className="card-image-3">
                <img
                  src="https://cdn.pixabay.com/photo/2016/02/28/12/55/boy-1226964__340.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-title">Education</div>
            <img src={education} alt="doctor" />
            <span className="card-desc" onClick={cardClick2}>
              Empowering kids through elementary education.
            </span>

            <div className="card-detail polka-dot" id="card-popup2">
              <span className="x" onClick={closeClick2}>
                X
              </span>
              <div className="card-image-1">
                <img
                  src="https://media.istockphoto.com/id/522079923/photo/schooling-symbol-african-young-girl-writing-notes.jpg?b=1&s=170667a&w=0&k=20&c=swmddqvv0BC57xpYvvx1R64t7qczxbmAAQiB1C2xC00="
                  alt=""
                />
              </div>
              <div className="card-content">
                <h2>Educate them!</h2>
                Investing in education is one of the most impactful ways to
                improve the lives of individuals and communities. By donating to
                educational charities, you can help provide access to quality
                education for those who may not otherwise have the opportunity.
                Your contribution can help fund scholarships, teacher training
                programs, and educational resources that can empower individuals
                to achieve their full potential. Every donation, no matter how
                small, can make a difference in shaping the future of our
                society. Join us in supporting education and help create a
                brighter future for all.
              </div>
              <div className="card-image-2">
                <img
                  src="https://cdn.pixabay.com/photo/2021/10/28/13/43/children-6749770__340.jpg"
                  alt=""
                />
              </div>
              <div className="card-image-3">
                <img
                  src="https://cdn.pixabay.com/photo/2021/10/28/13/45/children-6749783__340.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-title">Food</div>
            <img src={food} alt="doctor" />
            <span className="card-desc" onClick={cardClick3}>
              Evading hunger through food donations and camps.
            </span>
            <div className="card-detail polka-dot" id="card-popup3">
              <span className="x" onClick={closeClick3}>
                X
              </span>
              <div className="card-image-1">
                <img
                  src="https://cdn.pixabay.com/photo/2018/11/26/16/38/hunger-3839782__340.jpg"
                  alt=""
                />
              </div>
              <div className="card-content">
                <h2>Hungry haunts them!</h2>
                Hunger is a pervasive issue that affects millions of people
                worldwide. By donating to organizations that work towards
                combating hunger, you can make a real difference in the lives of
                those in need. Your contribution can help provide food, water,
                and other essential resources to individuals and families facing
                hunger. Your donation can make a significant impact, no matter
                how big or small. So join the fight against hunger today and
                help make a positive change in the world.
              </div>
              <div className="card-image-2">
                <img
                  src="https://cdn.pixabay.com/photo/2021/02/09/10/24/gaza-5998112__340.jpg"
                  alt=""
                />
              </div>
              <div className="card-image-3">
                <img
                  src="https://cdn.pixabay.com/photo/2021/02/09/10/24/gaza-5998112__340.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-title">Animals</div>
            <img src={animal} alt="doctor" />
            <span className="card-desc" onClick={cardClick4}>
              They can't speak but still bless you, help them.
            </span>
            <div className="card-detail polka-dot" id="card-popup4">
              <span className="x" onClick={closeClick4}>
                X
              </span>
              <div className="card-image-1">
                <img
                  src="https://cdn.pixabay.com/photo/2016/01/03/10/35/animal-welfare-1119262__340.jpg"
                  alt=""
                />
              </div>
              <div className="card-content">
                <h2>Animals need Humans</h2>
                Donating to animal charities can make a huge difference in the
                lives of animals in need. Your contribution can help provide
                food, shelter, and medical care to animals who have been
                abandoned, abused, or neglected. By supporting animal charities,
                you can help to improve the lives of animals and give them a
                second chance at happiness. Every donation, no matter how small,
                can make a big impact and help to create a better world for
                animals. Join us in making a difference today by donating to
                support the well-being of animals.
              </div>
              <div className="card-image-2">
                <img
                  src="https://cdn.pixabay.com/photo/2014/02/15/12/57/not-266530__340.jpg"
                  alt=""
                />
              </div>
              <div className="card-image-3">
                <img
                  src="https://media.istockphoto.com/id/1255713680/photo/homeless-sad-kitten-on-a-street-on-island-of-zanzibar-tanzania-africa-close-up.jpg?b=1&s=170667a&w=0&k=20&c=IsaJLO6IVbQXrA3qPBp2KGtDmxmGfuY0xC1-GOnAsNE="
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-title">Clothes</div>
            <img src={clothes} alt="doctor" />
            <span className="card-desc" onClick={cardClick5}>
              They also need comfort and safety from harsh weather.
            </span>
            <div className="card-detail polka-dot" id="card-popup5">
              <span className="x" onClick={closeClick5}>
                X
              </span>
              <div className="card-image-1">
                <img
                  src="https://cdn.pixabay.com/photo/2017/06/08/06/04/poor-2382641__340.jpg"
                  alt=""
                />
              </div>
              <div className="card-content">
                <h2>Weather affects them too!</h2>
                Donating clothes can make a huge difference in the lives of
                those in need. By donating your gently used clothes, you can
                provide warmth and comfort to someone who may not have access to
                these basic necessities. Your donation can also help reduce
                waste and support sustainable fashion practices. Additionally,
                donating clothes can be a simple and effective way to give back
                to your community and make a positive impact in the world. So,
                why not declutter your closet and donate your clothes to those
                who need them most? Your generosity can truly make a difference.
              </div>
              <div className="card-image-2">
                <img
                  src="https://cdn.pixabay.com/photo/2018/03/03/18/48/poor-kids-3196270__340.jpg"
                  alt=""
                />
              </div>
              <div className="card-image-3">
                <img
                  src="https://cdn.pixabay.com/photo/2017/01/20/12/47/children-of-uganda-1994833__340.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingCards;

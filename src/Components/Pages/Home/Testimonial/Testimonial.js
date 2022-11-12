import React from "react";
import quote from "../../../../assets/icons/quote.svg";
import people1 from "../../../../assets/images/people1.png";
import people2 from "../../../../assets/images/people2.png";
import people3 from "../../../../assets/images/people3.png";

const Testimonial = () => {
  const reviews = [
    {
      _id: 1,
      name: "Winson Herry",
      address: "California",
      img: people1,
      review:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
    },
    {
      _id: 2,
      name: "Winson Herry",
      address: "California",
      img: people2,
      review:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
    },
    {
      _id: 3,
      name: "Winson Herry",
      address: "California",
      img: people3,
      review:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
    },
  ];
  return (
    <section className="max-w-7xl mx-auto">
      <div className="flex justify-between my-[85px]">
        <div>
          <h4 className="text-xl font-bold text-primary">Testimonial</h4>
          <h2 className="text-4xl font-semibold">What Our Patients Says</h2>
        </div>
        <div>
          <img className="lg:w-[192px]" src={quote} alt="" />
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((rev) => (
            <div key={rev._id} className="card  shadow-xl">
              <div className="card-body">
                <p>{rev.review}</p>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-start">
                  <div className="flex items-center my-4">
                    <div className="w-[64px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img className="w-full" src={rev.img} />
                    </div>
                    <div className="ml-5">
                      <h2 className="text-xl font-semibold">{rev.name}</h2>
                      <p>{rev.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;

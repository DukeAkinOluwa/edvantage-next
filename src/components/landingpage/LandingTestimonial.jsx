function Template(props) {
  return (
    <div className="comment" key={props.index}>
      {/* <h1>{props.data.name}</h1> */}
      <div className="profile-card">
        <div className="profile-image-cont"></div>
        <div className="texts">
          <h4>{props.data.name}</h4>
          <p>
            {props.data.course}, {props.data.uni}
          </p>
        </div>
      </div>
      <p>{props.data.comment}</p>
    </div>
  );
}

export default function LandingTestimonial() {
  const data = [
    {
      name: "Akin",
      course: "Mechatronics",
      uni: "bells univerity of technology",
      comment:
        "As a college student, I've tried numerous apps to manage my academic life, but the Student App stands out as a true game-changer. the Student App stands out as a true game-changer.",
    },
    {
      name: "Akin",
      course: "Mechatronics",
      uni: "bells univerity of technology",
      comment:
        "As a college student, I've tried numerous apps to manage my academic life, but the Student App stands out as a true game-changer.",
    },
    {
      name: "Akin",
      course: "Mechatronics",
      uni: "bells univerity of technology",
      comment:
        "As a college student, I've tried numerous apps to manage my academic life, but the Student App stands out as a true game-changer.",
    },
    {
      name: "Akin",
      course: "Mechatronics",
      uni: "bells univerity of technology",
      comment:
        "As a college student, I've tried numerous apps to manage my academic life, but the Student App stands out as a true game-changer.",
    },
    {
      name: "Akin",
      course: "Mechatronics",
      uni: "bells univerity of technology",
      comment:
        "As a college student, I've tried numerous apps to manage my academic life, but the Student App stands out as a true game-changer.",
    },
    {
      name: "Akin",
      course: "Mechatronics",
      uni: "bells univerity of technology",
      comment:
        "As a college student, I've tried numerous apps to manage my academic life, but the Student App stands out as a true game-changer.",
    },
  ];

  return (
    <div className="landing-testimonial">
      <div className="testimonial-header">
        <h1>What Students are saying about us</h1>
      </div>
      <span className="comments">
        {data ? (
          <>
            {data.map((comment, index) => (
              <Template data={comment} key={index} />
            ))}
          </>
        ) : (
          <>Hi</>
        )}
      </span>
    </div>
  );
}

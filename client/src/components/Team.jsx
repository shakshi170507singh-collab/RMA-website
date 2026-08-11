import "./Team.css";
import president from "../assets/vp.jpeg";
import secretary from "../assets/sr1.jpeg";
import secret from "../assets/sr2.jpeg";
import jrsec from  "../assets/jr1.jpeg";
import jresec from "../assets/jr2.jpeg";






const members = [

  {
    id: 1,
    name: "Dr. M Hema",
    role: "Vice President",
    image: president
    
  },

  {
    id: 2,
    name: "Devanshi",
    role: "Sr Secretary",
    image: secretary
    
  },

  {
    id: 3,
    name: "Chandhini",
    role: "Sr Secretary",
    image: secret
    
  },

  {
    id: 4,
    name: "Sayen",
    role: "Jr Secretary",
    image : jrsec
   
  },

  {
    id: 5,
    name: "Deeksha",
    role: "Jr Secretary",
    image: jresec
    
  }

];

function Team() {

  return (

    <section className="team" id="team">

      <div className="team-heading">

        <p>OUR TEAM</p>

        <h2>Meet the Executive Committee</h2>

        <span>
          The passionate individuals who work together to make every
          event, workshop and competition a success.
        </span>

      </div>


      <div className="team-grid">

        {members.map((member) => (

          <div className="team-card" key={member.id}>

            <div className="team-image">

              <img
                src={member.image}
                alt={member.name}
              />

            </div>

            <div className="team-info">

              <h3>{member.name}</h3>

              <p>{member.role}</p>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}

export default Team;
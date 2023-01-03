import Link from "next/link";

const UserCard = ( props ) => {
  return (
    <div
      className="row"
      style={{ padding: "35px 10px 0px 30px", width: "40%" }}
    >
      <div
        className="col-md-6 col-lg-4"
        style={{
          backgroundImage: `url(${props.userImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "90px",
          borderRadius: "5%",
          width: "90px",
        }}
      />
      <div className="col-md-6 col-lg-8">
        <div className="row" style={{ paddingLeft: "8px", paddingTop: "10px" }}>
          <Link
            href={props.userLink}
            style={{ color: "black", textDecoration: "None", padding: "0" }}
          >
            <h5 style={{ padding: "0" }}>{props.userName}</h5>
          </Link>
        </div>
        <div className="row" style={{ paddingLeft: "8px", color: "grey" }}>
          {props.userFollowers} Followers &#183; {props.userFollowing} Following
        </div>
      </div>
    </div>
  );
};

export default UserCard;

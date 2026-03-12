const profiles = [
  {
    name: "Ava Thompson",
    role: "Frontend Engineer",
    description: "Builds user-friendly interfaces and loves clean design.",
    imageUrl: "https://i.pravatar.cc/200?img=32",
  },
  {
    name: "Rafael Kim",
    role: "Backend Developer",
    description: "Crafts APIs and keeps the services running smoothly.",
    imageUrl: "https://i.pravatar.cc/200?img=12",
  },
  {
    name: "Mia Patel",
    role: "Product Designer",
    description: "Designs delightful experiences and sharp interfaces.",
    imageUrl: "https://i.pravatar.cc/200?img=47",
  },
  {
    name: "Noah Chen",
    role: "DevOps Engineer",
    description: "Automates deployments and optimizes infrastructure.",
    imageUrl: "https://i.pravatar.cc/200?img=5",
  },
  {
    name: "Sofia Garcia",
    role: "QA Specialist",
    description: "Ensures quality with thoughtful testing and feedback.",
    imageUrl: "https://i.pravatar.cc/200?img=18",
  },
  {
    name: "Liam Johnson",
    role: "Product Manager",
    description: "Aligns the team on value and ships great products.",
    imageUrl: "https://i.pravatar.cc/200?img=22",
  },
];

const Service = async () => {
  return (
    <main style={{ padding: "2rem", maxWidth: "1120px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "1.25rem" }}>Our Team</h1>

      <div
        style={{
          display: "grid",
          gap: "1.25rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        {profiles.map((profile) => (
          <section
            key={profile.name}
            style={{
              border: "2px solid white",
              borderRadius: "12px",
              padding: "1rem",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              
              
            }}
          >
            <img
              src={profile.imageUrl}
              alt={`Profile image of ${profile.name}`}
              style={{
                display: "block",
                margin: "0 auto 0.75rem",
                borderRadius: "50%",
                width: "96px",
                height: "96px",
                objectFit: "cover",
                
              }}
            />
            <h2 style={{ margin: 0, fontSize: "1.1rem" }}>{profile.name}</h2>
            <p style={{ margin: "0.25rem 0 0.75rem", fontSize: "0.9rem", color: "rgba(0,0,0,0.7)" }}>
              {profile.role}
            </p>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "white" }}>
              {profile.description}
            </p>
          </section>
        ))}
      </div>
    </main>
  );
};

export default Service;

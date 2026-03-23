'use client';

import { useEffect, useState } from "react";
import Loading from "../loading.jsx";
import genderData from "../../../data/gender-data.json";

const DataFetchServerContent = ({ initialName }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({ name: initialName || "", gender: null, probability: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      let name = initialName || "";
      let data = { name, gender: null, probability: 0 };

      if (name) {
        const lowerName = name.toLowerCase();
        const lookup = genderData[lowerName];
        console.log("Local lookup for " + name + ":", lookup);

        if (lookup && lookup.gender) {
          data.gender = lookup.gender;
          data.probability = lookup.probability || 0;
        }
      }

      setUserData(data);
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [initialName]);

  const confidencePercentage = Math.round((userData.probability || 0) * 100);
  const gender = userData.gender;

  const rootStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    fontFamily: "'Work Sans', sans-serif",
    padding: "20px",
    gap: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    flexWrap: "wrap"
  };

  const cardStyle = {
    background: "white",
    width: "100%",
    maxWidth: "400px",
    borderRadius: "24px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    overflow: "hidden",
    position: "relative"
  };

  const leftCardStyle = {
    ...cardStyle,
    maxWidth: "350px",
    minHeight: "400px",
    padding: "2.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  };

  const topBarStyle = {
    height: "8px",
    background: gender === "male"
      ? "linear-gradient(90deg, #3b82f6, #60a5fa)"
      : gender === "female"
        ? "linear-gradient(90deg, #ec4899, #f472b6)"
        : "linear-gradient(90deg, #94a3b8, #cbd5e1)"
  };

  const iconBgStyle = {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: gender === "male" ? "#eff6ff" : gender === "female" ? "#fdf2f8" : "#f1f5f9",
    color: gender === "male" ? "#2563eb" : gender === "female" ? "#db2777" : "#64748b"
  };

  if (isLoading) {
    return (
      <div style={rootStyle}>
        <div style={leftCardStyle}>
          <h1 style={{
            fontSize: "2rem",
            fontWeight: "800",
            color: "#1e293b",
            marginBottom: "1rem",
            textTransform: "capitalize"
          }}>
            {initialName || "Anonymous"}
          </h1>
          <p style={{
            fontSize: "1.125rem",
            color: "#64748b",
            lineHeight: "1.6"
          }}>
            Name entered for analysis
          </p>
          <div style={{
            marginTop: "2rem",
            fontSize: "0.875rem",
            color: "#94a3b8"
          }}>
            Instant display - no loading
          </div>
        </div>
        <Loading />
      </div>
    );
  }

  return (
    <div style={rootStyle}>
      <div style={leftCardStyle}>
        <h1 style={{
          fontSize: "2rem",
          fontWeight: "800",
          color: "#1e293b",
          marginBottom: "1rem",
          textTransform: "capitalize"
        }}>
          {userData.name || "Anonymous"}
        </h1>
        <p style={{
          fontSize: "1.125rem",
          color: "#64748b",
          lineHeight: "1.6"
        }}>
          Name entered for analysis
        </p>
        <div style={{
          marginTop: "2rem",
          fontSize: "0.875rem",
          color: "#94a3b8"
        }}>
          Instant display - no loading
        </div>
      </div>
      {/* Right analysis */}
      <div style={cardStyle}>
        <div style={topBarStyle} />
        <div style={{ padding: "2.5rem" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "2rem"
          }}>
            <div>
              <h2 style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#64748b",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "0.25rem"
              }}>
                Analysis Result
              </h2>
              <h1 style={{
                fontSize: "2rem",
                fontWeight: "800",
                color: "#1e293b",
                margin: 0,
                textTransform: "capitalize"
              }}>
                {userData.name || "Anonymous"}
              </h1>
            </div>
            <div style={iconBgStyle}>
              {gender === "male" ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="10" cy="14" r="5" />
                  <path d="M15 9l6-6" />
                  <path d="M21 9v-6h-6" />
                </svg>
              ) : gender === "female" ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="9" r="5" />
                  <path d="M12 14v7" />
                  <path d="M9 18h6" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              )}
            </div>
          </div>

          <div style={{
            backgroundColor: "#f8fafc",
            padding: "1.25rem",
            borderRadius: "16px",
            marginBottom: "1.5rem",
            border: "1px solid #f1f5f9"
          }}>
            <div style={{
              fontSize: "0.875rem",
              color: "#64748b",
              marginBottom: "0.5rem"
            }}>
              Identified Gender
            </div>
            <div style={{
              fontSize: "1.25rem",
              fontWeight: "700",
              color: "#1e293b",
              textTransform: "capitalize",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              {gender || "Not Found"}
              {gender && (
                <span style={{
                  fontSize: "0.75rem",
                  padding: "2px 8px",
                  borderRadius: "99px",
                  backgroundColor: gender === "male" ? "#dbeafe" : "#fce7f3",
                  color: gender === "male" ? "#1e40af" : "#9d174d",
                  fontWeight: "600"
                }}>
                  Verified
                </span>
              )}
            </div>
          </div>

          <div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.5rem"
            }}>
              <span style={{ fontSize: "0.875rem", fontWeight: "600", color: "#64748b" }}>Confidence Score</span>
              <span style={{ fontSize: "0.875rem", fontWeight: "700", color: "#1e293b" }}>{confidencePercentage}%</span>
            </div>
            <div style={{
              height: "8px",
              width: "100%",
              backgroundColor: "#f1f5f9",
              borderRadius: "4px",
              overflow: "hidden"
            }}>
              <div style={{
                height: "100%",
                width: `${confidencePercentage}%`,
                backgroundColor: gender === "male" ? "#3b82f6" : gender === "female" ? "#ec4899" : "#94a3b8",
                borderRadius: "4px"
              }} />
            </div>
          </div>

          {(!gender && userData.name) && (
            <div style={{
              marginTop: "1.5rem",
              padding: "0.75rem",
              backgroundColor: "#fef2f2",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#ef4444",
              fontSize: "0.75rem"
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              Local lookup did not find this name.
            </div>
          )}
        </div>

        <div style={{
          padding: "1rem 2.5rem",
          backgroundColor: "#f8fafc",
          borderTop: "1px solid #f1f5f9",
          fontSize: "0.75rem",
          color: "#94a3b8",
          textAlign: "center"
        }}>
          Server-side Analysis Engine v1.0 (Client Enhanced)
        </div>
      </div>
    </div>
  );
};

export default DataFetchServerContent;


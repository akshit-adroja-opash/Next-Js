"use client"

import { useEffect, useState } from 'react';

const DataFetchClient = ({ searchParams }) => {
  const params = searchParams || {};
  const [userData, setUserData] = useState({ name: '', gender: null, probability: 0 });
  const [loading, setLoading] = useState(false);

  const userName = params.name || '';

  useEffect(() => {
    let mounted = true;
    if (userName && mounted) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const res = await fetch(`https://gender-api.com/get?key=demo&name=${encodeURIComponent(userName)}`);
          console.log(`API fetch status for ${userName}:`, res.status, res.statusText);
          
          if (res.ok) {
            const rawData = await res.json();
            console.log("API Response:", rawData);
            
            if (rawData && rawData.gender) {
              setUserData({
                name: userName,
                gender: rawData.gender,
                probability: rawData.probability || rawData.gender_confidence || 0
              });
            } else {
              console.log('Invalid API response:', rawData);
              setUserData({ name: userName, gender: null, probability: 0 });
            }
          } else {
            console.log(`API not ok: ${res.status}`);
            setUserData({ name: userName, gender: null, probability: 0 });
          }
        } catch (error) {
          console.error("Fetch error:", error);
          setUserData({ name: userName, gender: null, probability: 0 });
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
    return () => { mounted = false; };
  }, [userName]);

  const confidencePercentage = Math.round((userData.probability || 0) * 100);
  const genderColor = userData.gender === "male" ? "#2563eb" : userData.gender === "female" ? "#db2777" : "#6b7280";
  const borderColor = userData.gender === "male" ? "#3b82f6" : userData.gender === "female" ? "#ec4899" : "#6b7280";

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      fontFamily: "'Work Sans', sans-serif",
      padding: "20px"
    }}>
      <div style={{
        background: "white",
        width: "100%",
        maxWidth: "400px",
        borderRadius: "24px",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        overflow: "hidden",
        position: "relative",
        transition: "transform 0.3s ease",
        cursor: "default"
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
      >
        {/* Top Decorative bar with gradient */}
        <div style={{
          height: "8px",
          background: userData.gender === "male" 
            ? "linear-gradient(90deg, #3b82f6, #60a5fa)" 
            : userData.gender === "female" 
              ? "linear-gradient(90deg, #ec4899, #f472b6)" 
              : "linear-gradient(90deg, #94a3b8, #cbd5e1)"
        }} />

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
                {userData.name || 'Anonymous'}
              </h1>
            </div>
            
            {/* Gender Icon Container */}
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: userData.gender === "male" ? "#eff6ff" : userData.gender === "female" ? "#fdf2f8" : "#f1f5f9",
              color: userData.gender === "male" ? "#2563eb" : userData.gender === "female" ? "#db2777" : "#64748b"
            }}>
              {userData.gender === "male" ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="14" r="5"/><path d="M15 9l6-6"/><path d="M21 9v-6h-6"/></svg>
              ) : userData.gender === "female" ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="9" r="5"/><path d="M12 14v7"/><path d="M9 18h6"/></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
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
              {loading ? 'Detecting...' : (userData.gender || "Not Found")}
              {!loading && userData.gender && (
                <span style={{ 
                  fontSize: "0.75rem", 
                  padding: "2px 8px", 
                  borderRadius: "99px",
                  backgroundColor: userData.gender === "male" ? "#dbeafe" : "#fce7f3",
                  color: userData.gender === "male" ? "#1e40af" : "#9d174d",
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
                backgroundColor: userData.gender === "male" ? "#3b82f6" : userData.gender === "female" ? "#ec4899" : "#94a3b8",
                borderRadius: "4px",
                transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)"
              }} />
            </div>
          </div>

          {(!userData.gender && userName && !loading) && (
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Unable to determine gender from our dataset.
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
          Powered by Gender Intelligence API
        </div>
      </div>
    </div>
  );
};

export default DataFetchClient;

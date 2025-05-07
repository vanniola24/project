import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [Speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [adress1, setAdress1] = useState("");
  const [adress2, setAdress2] = useState("");
 

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Image Not Selected");
      }

      const formData = new FormData();
      formData.append("image",docImg);

      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", Speciality);
      formData.append("degree", degree);
      formData.append(
        "adress", 
        JSON.stringify({ line1: adress1, line2: adress2 })
      );
   

      //console log fprmdata

      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setAdress1('')
        setAdress2('')
        setDegree('')
        setAbout('')
        setFees('')
        
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <p
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "5px",
          textAlign: "start",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Add Doctor
      </p>

      <div
        style={{
          backgroundColor: "white",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          border: "1px solid #e5e7eb",
          borderRadius: "0.375rem",
          width: "100%",
          maxWidth: "56rem",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            borderBottom: "1px solid #e5e7eb",
            marginBottom: "20px",
          }}
        >
          <label htmlFor="doc-img" style={{ cursor: "pointer" }}>
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "50%",
                border: "2px dashed #ccc",
                padding: "10px",
              }}
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p
            style={{
              marginTop: "10px",
              color: "#666",
              textAlign: "center",
            }}
          >
            Upload doctor picture
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            padding: "0 20px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#444",
                }}
              >
                Your name
              </p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name"
                required
                style={{
                  padding: "10px 12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#444",
                }}
              >
                Doctor Email
              </p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Email"
                required
                style={{
                  padding: "10px 12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#444",
                }}
              >
                Doctor Password
              </p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
                style={{
                  padding: "10px 12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#444",
                }}
              >
                Experience
              </p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                name=""
                id=""
                style={{
                  padding: "10px 12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px",
                  backgroundColor: "white",
                }}
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#444",
                }}
              >
                Fees
              </p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                type="number"
                placeholder="fees"
                required
                style={{
                  padding: "10px 12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              />
            </div>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#444",
                }}
              >
                Speciality
              </p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={Speciality}
                name=""
                id=""
                style={{
                  padding: "10px 12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px",
                  backgroundColor: "white",
                }}
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrians">Pediatrians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#444",
                }}
              >
                Education
              </p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                type="text"
                placeholder="education"
                required
                style={{
                  padding: "10px 12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#444",
                }}
              >
                Address
              </p>
              <input
                onChange={(e) => setAdress1(e.target.value)}
                value={adress1}
                type="text"
                placeholder="address 1"
                required
                style={{
                  padding: "10px 12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px",
                  marginBottom: "8px",
                }}
              />
              <input
                onChange={(e) => setAdress2(e.target.value)}
                value={adress2}
                type="text"
                placeholder="address 2"
                required
                style={{
                  padding: "10px 12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              />
            </div>
          </div>
        </div>

            <div style={{ padding: "0 20px 20px" }}>
              
             
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#444",
                  marginBottom: "8px",
                }}
              >
                About Doctor
              </p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            placeholder="Write about doctor"
            rows={5}
            required
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "14px",
              resize: "vertical",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <button
            type="submit"
            style={{
              padding: "12px 24px",
              backgroundColor: "#4f46e5",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.2s",
              ":hover": {
                backgroundColor: "#4338ca",
              },
            }}
          >
            Add Doctor
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;

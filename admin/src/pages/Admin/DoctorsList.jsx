import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div>
      <h1 style={{ fontSize: "14px", fontWeight: "600" }}>All Doctors</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {Array.isArray(doctors) && doctors.map((item, index) => (
          <div key={index} style={{ padding: 10, border: "1px solid #ccc", borderRadius: 4 }}>
            <img
              style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 4 }}
              src={item.image}
              alt={item.name}
            />
            <div>
              <p><strong>{item.name}</strong></p>
              <p>{item.speciality}</p>
              <label style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <input
                  type="checkbox"
                  checked={item.available}
                  onChange={() => changeAvailability(item._id)}
                />
                <span>Available</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;

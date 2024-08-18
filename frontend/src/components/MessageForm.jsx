import React, { useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";

const MessageForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleMessage = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/messages/send", form, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      toast.success(res.data.msg);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
      console.log(err);
    }
  };

  return (
    <div className="container form-component message-form">
      <h2>Send us a Message</h2>
      <form onSubmit={handleMessage}>
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="number"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        <div>
          <textarea
            name="message"
            cols="10"
            rows="10"
            placeholder="Message"
            value={form.message} // Adding value prop
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          ></textarea>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;

/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

export default function Modal({ isShow, selected, handleToggle, setIntents }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    setForm(selected);
  }, [selected]);

  const handleSubmit = e => {
    e.preventDefault();
    let _form = { ...form };
    if (!Array.isArray(_form.answers)) {
      _form.answers = _form.answers.split(",");
    }
    if (!Array.isArray(_form.utterances)) {
      _form.utterances = _form.utterances.split(",");
    }
    if (selected.id) {
      // update
      axios
        .put(`/corpus/update`, { model: _form, id: selected.id })
        .then(res => {
          setIntents(res.data.payload);
          Swal.fire("Success", "Corpus updated successfully", "success");
          handleToggle();
        })
        .catch(error => {
          console.error("Error updating corpus:", error);
        });
    } else {
      // create
      axios
        .post(`/corpus/create`, { model: _form })
        .then(res => {
          Swal.fire("Success", "Corpus created successfully", "success");
          setIntents(res.data.payload);
          handleToggle();
        })
        .catch(error => {
          console.error("Error creating corpus:", error);
        });
    }
  };
  return (
    isShow && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg ">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Modal</h3>
            <button onClick={handleToggle}>
              <FaTimes className=" text-gray-500 cursor-pointer" />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="intent"
                className="block text-sm font-semibold text-gray-600">
                Intent
              </label>
              <input
                type="text"
                id="intent"
                name="firstName"
                value={form.intent}
                onChange={e => setForm({ ...form, intent: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="answers"
                className="block text-sm font-semibold text-gray-600">
                Answers(split by comma)
              </label>
              <textarea
                name="answers"
                value={form.answers}
                onChange={e => setForm({ ...form, answers: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="utterances"
                className="block text-sm font-semibold text-gray-600">
                Utterances(split by comma)
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md"
                name="utterances"
                id="utterances"
                value={form.utterances}
                onChange={e =>
                  setForm({ ...form, utterances: e.target.value })
                }></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md">
                {selected.id ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

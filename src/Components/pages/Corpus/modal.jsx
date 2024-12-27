/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

export default function Modal({ isShow, selected, handleToggle, setIntents }) {
  const [form, setForm] = useState({
    intent: "",
    answers: "",
    utterances: "",
  });

  useEffect(() => {
    // Update form state when `selected` changes, ensuring default values
    setForm({
      intent: selected.intent || "",
      answers: Array.isArray(selected.answers)
        ? selected.answers.join(", ")
        : selected.answers || "",
      utterances: Array.isArray(selected.utterances)
        ? selected.utterances.join(", ")
        : selected.utterances || "",
    });
  }, [selected]);

  const handleSubmit = e => {
    e.preventDefault();
    let _form = { ...form };
    _form.answers = Array.isArray(_form.answers)
      ? _form.answers
      : _form.answers.split(",").map(a => a.trim());
    _form.utterances = Array.isArray(_form.utterances)
      ? _form.utterances
      : _form.utterances.split(",").map(u => u.trim());

    if (selected.id) {
      // Update existing corpus
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
      // Create new corpus
      axios
        .post(`/corpus/create`, { model: _form })
        .then(res => {
          setIntents(res.data.payload);
          Swal.fire("Success", "Corpus created successfully", "success");
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
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {selected.id ? "Edit Corpus" : "Create Corpus"}
            </h3>
            <button onClick={handleToggle}>
              <FaTimes className="text-gray-500 cursor-pointer" />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="intent"
                className="block text-sm font-semibold text-gray-600"
              >
                Intent
              </label>
              <input
                type="text"
                id="intent"
                value={form.intent}
                onChange={e => setForm({ ...form, intent: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="answers"
                className="block text-sm font-semibold text-gray-600"
              >
                Answers (separate by commas)
              </label>
              <textarea
                id="answers"
                value={form.answers}
                onChange={e => setForm({ ...form, answers: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="utterances"
                className="block text-sm font-semibold text-gray-600"
              >
                Utterances (separate by commas)
              </label>
              <textarea
                id="utterances"
                value={form.utterances}
                onChange={e => setForm({ ...form, utterances: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                {selected.id ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

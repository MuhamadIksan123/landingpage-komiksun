import React from 'react';

export default function TextArea({
  name,
  onChange,
  placeholder,
  value,
  label,
}) {
  return (
    <div class="d-flex flex-column align-items-start">
      <label className="form-label">{label}</label>
      <textarea
        onChange={onChange}
        className="form-control text-area"
        placeholder={placeholder}
        value={value}
        name={name}
      ></textarea>
    </div>
  );
}

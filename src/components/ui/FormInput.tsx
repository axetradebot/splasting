"use client";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  options?: { value: string; label: string }[];
  textarea?: boolean;
  rows?: number;
}

export default function FormInput({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
  options,
  textarea = false,
  rows = 4,
}: FormInputProps) {
  const inputStyles =
    "w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-base text-text-primary placeholder:text-slate-400 focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/20 transition-all duration-300 shadow-sm";

  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-text-secondary"
      >
        {label}
        {required && <span className="text-accent-primary ml-1">*</span>}
      </label>

      {options ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`${inputStyles} appearance-none cursor-pointer`}
          aria-label={label}
        >
          <option value="">Välj...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={`${inputStyles} resize-none`}
          aria-label={label}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={inputStyles}
          aria-label={label}
        />
      )}
    </div>
  );
}

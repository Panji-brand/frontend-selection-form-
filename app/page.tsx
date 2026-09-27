"use client";

import { ChangeEvent, FormEvent, useState } from "react";

type FormValues = {
  name: string;
  nrp: string;
  phone: string;
  email: string;
  division: string;
  reason: string;
  agreement: boolean;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

export default function Home() {
  const [form, setForm] = useState<FormValues>({
    name: "",
    nrp: "",
    phone: "",
    email: "",
    division: "",
    reason: "",
    agreement: false,
  });

const [errors, setErrors] = useState<FormErrors>({});
const [submitted, setSubmitted] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;

      setForm((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Hapus error ketika user mulai memperbaiki input
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    // Full Name
    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (form.name.trim().length < 3) {
      newErrors.name = "Full name must be at least 3 characters.";
    }

    // NRP
    if (!form.nrp.trim()) {
      newErrors.nrp = "NRP is required.";
    } else if (!/^\d{10}$/.test(form.nrp)) {
      newErrors.nrp = "NRP must consist of exactly 10 digits.";
    }

    // Phone
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^08\d{8,11}$/.test(form.phone)) {
      newErrors.phone =
        "Phone number must start with 08 and contain 10–13 digits.";
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Division
    if (!form.division) {
      newErrors.division = "Please select a division.";
    }

    // Reason
    if (!form.reason.trim()) {
      newErrors.reason = "Please tell us why you want to join.";
    } else if (form.reason.trim().length < 20) {
      newErrors.reason =
        "Your motivation must be at least 20 characters.";
    }

    // Agreement
    if (!form.agreement) {
      newErrors.agreement =
        "You must confirm that the information is correct.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const isValid = validateForm();

  if (!isValid) {
    return;
  }

  setIsSubmitting(true);

  setTimeout(() => {
    setIsSubmitting(false);
    setSubmitted(true);
  }, 1000);
};

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-lg">
            +
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Join Our Team
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
            Take the first step and become part of our team.
            Tell us a little bit about yourself and your interests.
          </p>
        </div>

        {/* Form Card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">

          {/* Card Header */}
          <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
            <h2 className="text-lg font-semibold text-slate-900">
              Registration Form
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Please fill in the information below.
            </p>
          </div>

          {/* Success Screen */}
          {submitted ? (
            <div className="px-6 py-16 text-center sm:px-8">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
                ✓
              </div>

              <h2 className="mt-5 text-2xl font-bold text-slate-900">
                Registration Successful!
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
                Thank you for your interest in joining our team.
                We will review your registration.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setIsSubmitting(false);
                  setForm({
                    name: "",
                    nrp: "",
                    phone: "",
                    email: "",
                    division: "",
                    reason: "",
                    agreement: false,
                  });
                  setErrors({});
                }}
                className="mt-6 rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Submit Another Response
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-6 px-6 py-7 sm:px-8"
            >

              {/* Section */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Personal Information
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Tell us about yourself.
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full rounded-lg border px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                    errors.name
                      ? "border-red-400 focus:border-red-500 focus:ring-red-50"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-50"
                  }`}
                />

                {errors.name && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* NRP + Phone */}
              <div className="grid gap-6 sm:grid-cols-2">

                {/* NRP */}
                <div>
                  <label
                    htmlFor="nrp"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    NRP <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="nrp"
                    name="nrp"
                    type="text"
                    inputMode="numeric"
                    value={form.nrp}
                    onChange={handleChange}
                    placeholder="e.g. 5025251247"
                    className={`w-full rounded-lg border px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                      errors.nrp
                        ? "border-red-400 focus:border-red-500 focus:ring-red-50"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-50"
                    }`}
                  />

                  {errors.nrp && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.nrp}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="08xxxxxxxxxx"
                    className={`w-full rounded-lg border px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                      errors.phone
                        ? "border-red-400 focus:border-red-500 focus:ring-red-50"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-50"
                    }`}
                  />

                  {errors.phone && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email <span className="text-red-500">*</span>
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className={`w-full rounded-lg border px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                    errors.email
                      ? "border-red-400 focus:border-red-500 focus:ring-red-50"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-50"
                  }`}
                />

                {errors.email && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Division */}
              <div>
                <label
                  htmlFor="division"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Division <span className="text-red-500">*</span>
                </label>

                <select
                  id="division"
                  name="division"
                  value={form.division}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:ring-4 ${
                    errors.division
                      ? "border-red-400 focus:border-red-500 focus:ring-red-50"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-50"
                  }`}
                >
                  <option value="" disabled>
                    Select a division
                  </option>

                  <option value="frontend">
                    Front End Web Development
                  </option>

                  <option value="backend">
                    Back End Web Development
                  </option>

                  <option value="uiux">
                    UI/UX Design
                  </option>

                  <option value="data">
                    Data & AI
                  </option>
                </select>

                {errors.division && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.division}
                  </p>
                )}
              </div>

              {/* Motivation */}
              <div>
                <label
                  htmlFor="reason"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Why do you want to join?{" "}
                  <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="reason"
                  name="reason"
                  rows={5}
                  value={form.reason}
                  onChange={handleChange}
                  placeholder="Tell us about your motivation, interests, or previous experience..."
                  className={`w-full resize-none rounded-lg border px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                    errors.reason
                      ? "border-red-400 focus:border-red-500 focus:ring-red-50"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-50"
                  }`}
                />

                <div className="mt-2 flex justify-between">
                  {errors.reason ? (
                    <p className="text-xs text-red-500">
                      {errors.reason}
                    </p>
                  ) : (
                    <p className="text-xs text-slate-400">
                      Minimum 20 characters.
                    </p>
                  )}

                  <p className="text-xs text-slate-400">
                    {form.reason.length} characters
                  </p>
                </div>
              </div>

              {/* Agreement */}
              <div
                className={`rounded-lg p-4 ${
                  errors.agreement
                    ? "bg-red-50"
                    : "bg-slate-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    id="agreement"
                    name="agreement"
                    type="checkbox"
                    checked={form.agreement}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />

                  <div>
                    <label
                      htmlFor="agreement"
                      className="text-sm leading-5 text-slate-600"
                    >
                      I confirm that the information I provided is correct.
                      <span className="text-red-500"> *</span>
                    </label>

                    {errors.agreement && (
                      <p className="mt-2 text-xs text-red-500">
                        {errors.agreement}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Submitting..." : "Submit Registration"}
                </button>

              <p className="text-center text-xs text-slate-400">
                By submitting this form, you agree to provide accurate
                information.
              </p>
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-400">
          Front End Web Development Selection
        </p>
      </div>
    </main>
  );
}